import React from "react";

const Skill = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6 py-20">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Full Skillset
      </h1>

      {/* Grid of skill cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
        {/* Programming Languages */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold mb-3 text-purple-400">
            Programming Languages
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>C, C++</li>
            <li>Python</li>
            <li>JavaScript (ES6+)</li>
            <li>Bash</li>
            <li>Verilog, MIPS Assembly</li>
          </ul>
        </div>

        {/* Frontend */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">
            Frontend
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>React / Next.js(Learning...)</li>
            <li>Tailwind CSS </li>
            <li>GSAP / Framer Motion</li>
            <li>Three.js (Learning...)</li>
          </ul>
        </div>

        {/* Backend */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold mb-3 text-blue-400">
            Backend
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>Node.js / Express</li>
            <li>REST APIs</li>
            <li>Authentication & Security</li>
          </ul>
        </div>

        {/* Databases */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold mb-3 text-green-400">
            Databases
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>MongoDB</li>
            <li>MySQL</li>
          </ul>
        </div>

        {/* Machine Learning & AI */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold mb-3 text-yellow-400">
            Machine Learning & AI
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>TensorFlow / Keras / PyTorch</li>
            <li>OpenCV</li>
            <li>CNNs, Vision Transformers, LSTMs</li>
            <li>Data Preprocessing & Feature Engineering</li>
          </ul>
        </div>

        {/* Tools & Platforms */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold mb-3 text-teal-400">
            Tools & Platforms
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>Git / GitHub</li>
            <li>Netlify / Vercel</li>
            <li>Linux / Bash</li>
            <li>VSCode / Google Colab</li>
          </ul>
        </div>

        {/* CS Fundamentals */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg hover:scale-105 transition-transform md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-3 text-red-400">
            Computer Science Fundamentals
          </h2>
          <ul className="space-y-2 text-gray-300 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            <li>Data Structures & Algorithms</li>
            <li>Operating Systems</li>
            <li>Database Management Systems</li>
            <li>Computer Networks(Learning...)</li>
            <li>Computer Organization & Architecture</li>
            <li>Theory of Computation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skill;
