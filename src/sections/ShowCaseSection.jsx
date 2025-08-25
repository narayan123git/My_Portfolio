import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];
    cards.forEach((card, index) => {
      gsap.fromTo(card, { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3 * (index + 1),
        scrollTrigger: { trigger: card, start: "top bottom-=100" },
      });
    });
  }, []);

  return (
    <>
      {/* Showcase Section */}
      <div id="work" ref={sectionRef} className="app-showcase">
        <div className="w-full">
          <div className="showcaselayout">

            {/* VeloRide */}
            <a
              href="https://github.com/narayan123git/VeloRide"
              target="_blank"
              rel="noopener noreferrer"
              ref={rydeRef}
              className="first-project-wrapper block cursor-pointer"
            >
              <div className="image-wrapper">
                <img src="/images/project1.png" alt="VeloRide App Interface" />
              </div>
              <div className="text-content">
                <h2>VeloRide – AI-Based Ride Sharing Platform</h2>
                <p className="text-white-50 md:text-xl">
                  A real-time ride-hailing MERN app inspired by Uber: live geolocation, socket-based ride-queue, OTP-based start; built with React, Node.js/Express, MongoDB, Tailwind.
                </p>
              </div>
            </a>

            <div className="project-list-wrapper overflow-hidden">

              {/* Weather App */}
              <a
                href="https://github.com/narayan123git/weather-app"
                target="_blank"
                rel="noopener noreferrer"
                ref={libraryRef}
                className="project block cursor-pointer"
              >
                <div className="image-wrapper bg-[#FFEFDB]">
                  <img src="/images/project2.png" alt="Weather App Interface" />
                </div>
                <h2>The Weather App</h2>
                <p className="text-white-50 md:text-base">
                  A weather app built using APIs (e.g. OpenWeather) to fetch live local forecasts, temperature, humidity, wind speed, sunrise/sunset. UI built with React and Tailwind.
                </p>
              </a>

              {/* Cat vs Dog */}
              <a
                href="https://github.com/narayan123git/cat-vs-dog"
                target="_blank"
                rel="noopener noreferrer"
                ref={ycDirectoryRef}
                className="project block cursor-pointer"
              >
                <div className="image-wrapper bg-[#FFE7EB]">
                  <img src="/images/project3.png" alt="Cat vs Dog Classification" />
                </div>
                <h2>Cat vs Dog Image Classifier</h2>
                <p className="text-white-50 md:text-base">
                  A CNN-based classifier implemented in Python/Keras that distinguishes between cats and dogs with ~95% accuracy, trained on a standard Dogs vs Cats dataset.
                </p>
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* More Projects Button (outside #work for styling) */}
      <div className="flex justify-center mt-8 mb-16">
        <Link
          to="/project"
          className="px-6 py-3 bg-white text-black rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          More Projects →
        </Link>
      </div>
    </>
  );
};

export default AppShowcase;
