/**
 * Fetch all repositories for user `narayan123git` (paginated),
 * attach topics (via topics endpoint) where available, and write
 * the full JSON array to ./src/data/repos.json
 *
 * Usage:
 *   GITHUB_TOKEN=ghp_xxx node ./scripts/fetchRepos.cjs
 * or (Windows PowerShell):
 *   $env:GITHUB_TOKEN="ghp_xxx"; node .\scripts\fetchRepos.cjs
 */
const fs = require("fs/promises");
const path = require("path");

const GITHUB_USER = "narayan123git";
const TOKEN = process.env.GITHUB_TOKEN || process.env.REPO_GITHUB_TOKEN || "";

const outPath = path.resolve(__dirname, "../src/data/repos.json");

const headers = {
  Accept: "application/vnd.github.mercy-preview+json, application/vnd.github+json",
};
if (TOKEN) headers.Authorization = `token ${TOKEN}`;

async function fetchPage(page = 1, per_page = 100) {
  const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=${per_page}&page=${page}&sort=updated`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`GitHub API error ${res.status}: ${txt}`);
  }
  return res.json();
}

async function fetchTopics(repoName) {
  try {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${encodeURIComponent(
      repoName
    )}/topics`;
    const res = await fetch(url, { headers });
    if (!res.ok) return []; // ignore topic fetch errors
    const j = await res.json();
    return Array.isArray(j.names) ? j.names : [];
  } catch {
    return [];
  }
}

(async () => {
  try {
    console.log("Fetching repositories for", GITHUB_USER);
    const perPage = 100;
    let page = 1;
    let all = [];

    while (true) {
      console.log(`Fetching page ${page} ...`);
      const data = await fetchPage(page, perPage);
      if (!data || data.length === 0) break;
      all = all.concat(data);
      if (data.length < perPage) break;
      page++;
    }

    console.log(`Fetched ${all.length} repositories. Attaching topics (best-effort)...`);

    // Attach topics (best-effort). This keeps original repo object and adds/overrides `topics`.
    const withTopics = await Promise.all(
      all.map(async (r) => {
        const topics = await fetchTopics(r.name).catch(() => []);
        return { ...r, topics: topics || r.topics || [] };
      })
    );

    // Write file
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, JSON.stringify(withTopics, null, 2), "utf8");
    console.log(`Wrote ${withTopics.length} repos to ${outPath}`);
    console.log("Done. You can now run: npm run generate:pdf");
    process.exit(0);
  } catch (err) {
    console.error("Failed to fetch repos:", err.message || err);
    process.exit(2);
  }
})();
