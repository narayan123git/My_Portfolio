// src/sections/Projects.jsx
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: "quine-mccluskey",
        title: "Quine–McCluskey Minimizer",
        description:
            "Python implementation of the Quine–McCluskey algorithm for boolean expression minimization — includes prime-implicant generation and essential prime selection.",
        tech: ["Python", "Algorithms", "Logic"],
        githubLink:
            "https://github.com/narayan123git/Quine-McCluskey-Programme-Python-",
        liveLink: "#", // 🔥 replace with your live link later
        imageUrl: "https://placehold.co/900x560/111827/e5e7eb?text=Quine-McCluskey",
    },
    {
        id: "weather-app",
        title: "Weather App",
        description:
            "Responsive weather app fetching real-time forecasts and displaying conditions with clean UI.",
        tech: ["HTML", "CSS", "JavaScript", "APIs"],
        githubLink: "https://github.com/narayan123git/weather-app",
        liveLink: "https://narayan123git.github.io/weather-app/",
        imageUrl: "https://placehold.co/900x560/0b1220/93c5fd?text=Weather+App",
    },
    {
        id: "ai-tutor",
        title: "AI-Tutor",
        description:
            "AI-powered tutor (TypeScript) providing guided explanations and interactive examples.",
        tech: ["TypeScript", "Generative AI", "Web"],
        githubLink: "https://github.com/narayan123git/AI-Tutor",
        liveLink: "https://ai-tutor-1.netlify.app/",
        imageUrl: "https://placehold.co/900x560/0f1724/fca5a5?text=AI-Tutor",
    },
    {
        id: "etch-a-sketch",
        title: "Etch a Sketch",
        description:
          "A simple HTML/CSS/JavaScript Etch-A-Sketch that lets you draw on an HTML5 canvas with adjustable grid/brush, clear/reset, and fun shake-to-erase behavior.",
        tech: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/narayan123git/etch-a-sketch",
        liveLink: "https://narayan123git.github.io/etch-a-sketch/",
        imageUrl: "https://placehold.co/900x560/1f2937/9ca3af?text=Etch+a+Sketch"
    },
    {
        id: "rock-paper-scissor",
        title: "Rock–Paper–Scissor",
        description:
            "Classic game built in JavaScript demonstrating DOM interactions and simple animations.",
        tech: ["JavaScript", "DOM", "Game"],
        githubLink: "https://github.com/narayan123git/rock-paper-scissor",
        liveLink: "https://narayan123git.github.io/rock-paper-scissor/",
        imageUrl:
            "https://placehold.co/900x560/24222E/c7d2fe?text=Rock+Paper+Scissor",
    },
];

const Projects = () => {
    const containerRef = useRef(null);

    // GSAP fade in
    useGSAP(() => {
        gsap.fromTo(
            ".project-card",
            { y: 40, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.15,
                scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
            }
        );
    }, []);

    // Hover tilt effect
    useEffect(() => {
        const cards = document.querySelectorAll(".project-card");

        const handleMove = (e, card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 6;
            const rotateY = ((x - centerX) / centerX) * -6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        };

        const reset = (card) => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
        };

        cards.forEach((card) => {
            card.addEventListener("mousemove", (e) => handleMove(e, card));
            card.addEventListener("mouseleave", () => reset(card));
        });

        return () => {
            cards.forEach((card) => {
                card.removeEventListener("mousemove", (e) => handleMove(e, card));
                card.removeEventListener("mouseleave", () => reset(card));
            });
        };
    }, []);

    return (
        <section id="projects" className="section-padding bg-black-100">
            <div className="w-full md:px-20 px-5" ref={containerRef}>
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-2 text-center">
                        Selected Projects
                    </h2>
                    <p className="text-white-50 max-w-2xl text-center mt-3">
                        Explore my top projects with live demos and source code.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projectsData.map((project) => (
                        <article
                            key={project.id}
                            className="project-card card card-border rounded-xl p-6 flex flex-col justify-between bg-black-200 hover:shadow-xl transition-transform duration-300 relative overflow-hidden"
                        >
                            {/* Glow background - must NOT block clicks */}
                            <div className="glow pointer-events-none" />

                            <div className="rounded-xl overflow-hidden mb-4 border border-black-50">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-48 object-cover rounded-xl"
                                />
                            </div>

                            <h3 className="text-2xl font-semibold text-white-50">{project.title}</h3>
                            <p className="mt-2 text-white-50 text-sm leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="bg-black-300 text-xs px-3 py-1 rounded-full text-blue-50"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-6 relative z-10">
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 transition text-white text-sm shadow-lg"
                                >
                                    GitHub
                                </a>
                                {project.liveLink && project.liveLink !== "#" && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition text-white text-sm shadow-lg"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </article>

                    ))}
                </div>

                {/* See more button */}
                <div className="mt-12 flex justify-center">
                    <a
                        href="https://github.com/narayan123git?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg animate-pulse hover:opacity-90 transition"
                    >
                        See all projects on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;

