// src/components/Social.jsx
import React from "react";

const socials = [
  {
    name: "GitHub",
    icon: "/icons/github.svg",
    link: "https://github.com/narayan123git",
  },
  {
    name: "LinkedIn",
    icon: "/icons/linkedin-box-fill.svg",
    link: "https://linkedin.com/in/narayan-paul-ba2339253",
  },
  {
    name: "Twitter",
    icon: "/icons/twitter.svg",
    link: "https://twitter.com/Narayanphysics",
  },
  {
    name: "Instagram",
    icon: "/icons/instagram.svg",
    link: "https://instagram.com/narayanpaul45",
  },
];

const Social = () => {
  return (
    <section
      id="socialmedia"
      className="section-padding p-5 bg-gradient-to-r from-black-200 via-black-100 to-black-200 rounded-2xl shadow-lg"
    >
      <div className="flex flex-col items-center gap-8 animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold text-white-50 tracking-wide">
          Follow Me
        </h2>

        <div className="flex gap-6 flex-wrap justify-center">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="icon transform transition duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/50"
              title={social.name}
            >
              <img
                src={social.icon}
                alt={`${social.name} icon`}
                className="size-6 md:size-8"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;
