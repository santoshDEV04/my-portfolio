// Project.jsx
import React, { useEffect, useRef } from "react";

// ------------------- Projects Data -------------------
const projects = [
  {
    title: "Streamify",
    description: "A real-time video + chat application with WebSockets.",
    image: "src/assets/images/streamify.png",
    tech: ["React", "Node.js", "WebSockets", "MongoDB"],
    demo: "https://streamify-ezut.onrender.com",
    github: "https://github.com/santoshDEV04/streamify",
  },
  {
    title: "Portfolio Website",
    description: "My personal portfolio built with GSAP & Framer Motion.",
    image: "src/assets/images/portfolio.png",
    tech: ["React", "GSAP", "Framer Motion"],
    demo: "https://santoshdash.vercel.app",
    github: "https://github.com/santoshDEV04/my-portfolio",
  },
];

// ------------------- Custom Tilt -------------------
const CustomTilt = ({ children }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -15;
      const rotateY = ((x - rect.width / 2) / rect.width) * 15;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleLeave = () => {
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={tiltRef}
      className="transition-transform duration-200 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

// ------------------- Project Section -------------------
const Project = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");
    const title = document.querySelector(".section-title");

    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(60px)";
      setTimeout(() => {
        card.style.transition = "all 0.8s ease-out";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 200 + 400);
    });

    if (title) {
      title.style.opacity = "0";
      title.style.transform = "scale(0.9)";
      setTimeout(() => {
        title.style.transition = "all 0.6s ease-out";
        title.style.opacity = "1";
        title.style.transform = "scale(1)";
      }, 200);
    }
  }, []);

  return (
    <>
      <style>{`
        /* Floating gradient blobs background */
        .bg-blobs::before,
        .bg-blobs::after {
          content: "";
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.4;
          z-index: 0;
          animation: float 12s ease-in-out infinite;
        }
        .bg-blobs::before {
          top: -100px;
          left: -100px;
          background: radial-gradient(circle, rgba(6,182,212,0.6), transparent);
        }
        .bg-blobs::after {
          bottom: -120px;
          right: -100px;
          background: radial-gradient(circle, rgba(244,114,182,0.6), transparent);
          animation-delay: -6s;
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(40px); }
        }

        /* Glass card */
        .glass-card {
          background: rgba(17, 25, 40, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(6,182,212,0.2);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          box-shadow: 0 12px 40px rgba(6,182,212,0.4), 0 0 30px rgba(244,114,182,0.25);
        }

        /* Neon tech tag */
        .tech-tag {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(6,182,212,0.4);
          color: rgb(103,232,249);
          box-shadow: 0 0 10px rgba(6,182,212,0.3);
        }

        /* Gradient buttons */
        .btn-demo {
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          color: white;
          transition: all 0.3s ease;
        }
        .btn-demo:hover {
          box-shadow: 0 0 15px rgba(6,182,212,0.6);
          transform: scale(1.05);
        }
        .btn-code {
          background: linear-gradient(135deg, #ec4899, #f43f5e);
          color: white;
          transition: all 0.3s ease;
        }
        .btn-code:hover {
          box-shadow: 0 0 15px rgba(244,114,182,0.6);
          transform: scale(1.05);
        }
      `}</style>

      <section
        id="projects"
        className="relative min-h-screen flex flex-col items-center justify-center gap-4 px-4 py-24 sm:px-6 lg:px-8 overflow-hidden z-[1]"
      >
        {/* Title */}
        <div className="text-center z-10">
          <h2 className="section-title text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Projects
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            A selection of my favorite builds – crafted with passion & precision ✨
          </p>
        </div>

        {/* Cards */}
        <div className="flex justify-center items-center flex-wrap gap-8 max-w-6xl w-full z-10">
          {projects.map((proj, i) => (
            <CustomTilt key={i}>
              <div className="project-card rounded-2xl p-6 w-90 h-[450px] flex flex-col glass-card">
                {/* Image */}
                <div className="w-80 h-60 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold text-white mb-2">{proj.title}</h3>
                <p className="text-gray-300 text-sm mb-4 flex-grow leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tech.map((t, idx) => (
                    <span key={idx} className="tech-tag px-3 py-1 text-xs rounded-full font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                  <a href={proj.demo} target="_blank" rel="noreferrer"
                    className="btn-demo flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium">
                    Live Demo
                  </a>
                  <a href={proj.github} target="_blank" rel="noreferrer"
                    className="btn-code flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium">
                    View Code
                  </a>
                </div>
              </div>
            </CustomTilt>
          ))}
              </div>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 rounded-full bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-lg opacity-80" />

      </section>
    </>
  );
};

export default Project;
