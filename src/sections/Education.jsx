import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const eduData = [
  {
    title: "B.Tech — Computer Science & Engineering",
    institute: "NIT Durgapur",
    date: "2023 – 2027",
    summary:
      "Currently pursuing B.Tech in CSE at NIT Durgapur with a CGPA of 9.4. Completed key courses in DSA, OS, DBMS, COA, and TOC. Active in projects, research, and open-source contributions.",
    logo: "/images/nitdgp.png",
    score: "CGPA: 9.4",
    courses: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Organization & Architecture", "Theory of Computation"]
  },
  {
    title: "Class XII (WBCHSE) — Science",
    institute: "WB State Board",
    date: "2020-2022",
    summary:
      "Secured 93.8% in Class XII with a focus on Mathematics, Physics, Chemistry, and Biology. Achieved 1st rank in school and actively participated in quizzes and competitions.",
    logo: "/images/school_img.png",
    score: "Percentage: 93.8%",
    courses: ["Physics", "Chemistry", "Mathematics", "Biology"]
  },
  {
    title: "Class X (WBBSE)",
    institute: "WB State Board",
    date: "2014-2020",
    summary:
      "Scored 96.5% and ranked among the top 20 in West Bengal and 1st position in my school; achieved 1st position at the block level. Strong foundation in Science and Mathematics.",
    logo: "/images/school_img.png",
    score: "Percentage: 96.5%",
    courses: ["Science", "Mathematics", "English", "Bengali", "History", "Geography"]
  },
];


const Education = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // GSAP reveal (kept as-is)
  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      }
    );

    gsap.utils.toArray(cardRefs.current).forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        }
      );
    });
  }, []);

  // Per-card tilt handlers (no global listeners)
  const handlePointerMove = (e) => {
    const card = e.currentTarget; // this specific card
    const inner = card.querySelector(".tilt-inner");
    if (!inner) return;

    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height;  // 0..1

    // limit tilt a bit for comfort
    const maxTilt = 10;
    const rx = (py - 0.5) * maxTilt;     // rotateX
    const ry = (px - 0.5) * -maxTilt;    // rotateY

    inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
  };

  const handlePointerLeave = (e) => {
    const inner = e.currentTarget.querySelector(".tilt-inner");
    if (inner) inner.style.transform = "";
  };

  return (
    <section id="education" ref={sectionRef} className="section-padding">
      <div className="w-full md:px-20 px-5">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
            <p className="text-white-50 mt-2">Academic background & selected programs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eduData.map((e, i) => (
            <article
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="card card-border relative overflow-hidden p-6 rounded-xl bg-black-100 group"
              style={{ perspective: "1000px" }} // isolate 3D per card
            >
              {/* subtle glow */}
              <div className="glow pointer-events-none" aria-hidden />

              {/* We tilt only this inner wrapper to avoid GSAP transform conflicts */}
              <div className="tilt-inner will-change-transform transition-transform duration-150">
                <div className="flex items-start gap-4">
                  {/* Logo — nudged down a bit for visibility */}
                  <div className="flex-none translate-y-2">
                    <div className="timeline-logo size-20">
                      <img
                        src={e.logo}
                        alt={e.institute}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold">{e.title}</h3>
                    <p className="text-white-50 mt-1">
                      <strong>{e.institute}</strong>{" "}
                      <span className="italic text-blue-50">({e.date})</span>
                    </p>

                    <p className="text-white-50 mt-4">{e.summary}</p>

                    <div className="mt-6 flex gap-3 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-black-200 text-sm">
                        {e.score}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-black-200 text-sm">
                        {e.courses.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
