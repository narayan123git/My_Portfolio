const base = import.meta.env.BASE_URL;

const navLinks = [
  { name: "Projects", link: "work" },
  { name: "Experience", link: "experience" },
  { name: "Education", link: "education"},
  { name: "Skills", link: "skills" },
  { name: "Social Media", link: "socialmedia" },
]


const words = [
  { text: "Ideas", imgPath: `${base}images/ideas.svg` },
  { text: "Concepts", imgPath: `${base}images/concepts.svg` },
  { text: "Designs", imgPath: `${base}images/designs.svg` },
  { text: "Code", imgPath: `${base}images/code.svg` },
  { text: "Ideas", imgPath: `${base}images/ideas.svg` },
  { text: "Concepts", imgPath: `${base}images/concepts.svg` },
  { text: "Designs", imgPath: `${base}images/designs.svg` },
  { text: "Code", imgPath: `${base}images/code.svg` },
];

const counterItems = [
  { value: 3, suffix: "", label: "Years in B.Tech (CSE @ NIT Durgapur)" },
  { value: 5, suffix: "+", label: "Live Projects on GitHub" },
  { value: 200, suffix: "+", label: "DSA & Leetcode Problems Solved" },
  { value: 3, suffix: "+", label: "Hackathons Participated" },
];


const logoIconsList = Array.from({ length: 11 }, (_, i) => ({
  imgPath: `${base}images/logos/company-logo-${i + 1}.png`,
}));

const abilities = [
  {
    imgPath: `${base}images/code.png`,
    title: "Full-Stack Development",
    desc: "Building end-to-end web applications with modern technologies like MERN, TailwindCSS, and GSAP.",
  },
  {
    imgPath: `${base}images/team.png`,
    title: "Team Collaboration",
    desc: "Active participation in hackathons and group projects, thriving in fast-paced, team-based environments.",
  },
  {
    imgPath: `${base}images/learning.png`,
    title: "Fast Learning & Adaptability",
    desc: "Quickly picking up new frameworks, APIs, and problem-solving approaches with a growth mindset.",
  },
];


const techStackImgs = [
  {
    name: "React Developer",
    imgPath: `${base}images/logos/react.png`,
  },
  {
    name: "Python Developer",
    imgPath: `${base}images/logos/python.svg`,
  },
  {
    name: "Backend Developer",
    imgPath: `${base}images/logos/node.png`,
  },
  {
    name: "AI/ML Developer",
    imgPath: `${base}images/logos/three.png`,
  },
  {
    name: "C/C++ Developer",
    imgPath: `${base}images/logos/git.svg`,
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: `${base}models/react_logo-transformed.glb`,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: `${base}models/python-transformed.glb`,
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: `${base}models/node-transformed.glb`,
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "AI/ML Developer",
    modelPath: `${base}models/three.js-transformed.glb`,
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "C/C++ Developer",
    modelPath: `${base}models/c.glb`,
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "I built a full-stack ride-sharing platform (VeloRide) inspired by Uber, integrating real-time features and a smooth user experience.",
    imgPath: `${base}images/exp1.png`,
    logoPath: `${base}images/logo1.png`,
    title: "Full Stack Developer – VeloRide",
    date: "June 2025 – Present",
    responsibilities: [
      "Developed a MERN-based ride-sharing app with location tracking and trip scheduling.",
      "Integrated OpenRouteService API for real-time routing and Leaflet for map visualizations(Not Implemented,will do).",
      "Implemented secure authentication and animated UI using GSAP + TailwindCSS.",
    ],
  },
  {
    review:
      "I’m working on an Anemia Detection project using deep learning with my college professor and a teammate. It’s an academic–industrial collaboration exploring healthcare solutions.",
    imgPath: `${base}images/exp2.png`,
    logoPath: `${base}images/logo2.png`,
    title: "ML Research Project – Anemia Detection",
    date: "December 2024 – Present",
    responsibilities: [
      "Designed and trained deep learning models to predict Hemoglobin levels from palm videos.",
      "Collaborated on data preprocessing, model evaluation, and result visualization using Python and PyTorch.",
      "Maintained GitHub repository for code versioning, results tracking, and documentation.",
    ],
  },
  {
    review:
      "I have been selected for Amazon ML Summer School 2025, a highly competitive program that provides immersive training in core areas of Machine Learning with guidance from Amazon scientists.",
    imgPath: `${base}images/exp3.png`,
    logoPath: `${base}images/amazon_logo.png`,
    title: "Amazon ML Summer School 2025",
    date: "July 2025",
    responsibilities: [
      "Underwent training in key ML concepts: supervised learning, deep neural networks, unsupervised learning, dimensionality reduction, and sequential models.",
      "Participated in live lectures and Q&A sessions with Amazon ML researchers and scientists.",
      "Explored real-world applications of ML in industry and gained exposure to Amazon’s approach to large-scale systems.",
      "Collaborated and networked with peers from top engineering institutes across India.",
    ],
  },

];





const expLogos = [
  {
    name: "logo1",
    imgPath: `${base}images/logo1.png`,
  },
  {
    name: "logo2",
    imgPath: `${base}images/logo2.png`,
  },
  {
    name: "logo3",
    imgPath: `${base}images/logo3.png`,
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: `${base}images/client1.png`,
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: `${base}images/client3.png`,
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: `${base}images/client2.png`,
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: `${base}images/client5.png`,
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: `${base}images/client4.png`,
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: `${base}images/client6.png`,
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: `${base}images/insta.png`,
  },
  {
    name: "fb",
    imgPath: `${base}images/fb.png`,
  },
  {
    name: "x",
    imgPath: `${base}images/x.png`,
  },
  {
    name: "linkedin",
    imgPath: `${base}images/linkedin.png`,
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
