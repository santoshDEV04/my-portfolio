import React from 'react';
import Tilt from 'react-parallax-tilt';

const projects = [
  {
    title: 'Streamify',
    description: 'A real-time video + chat application with WebSockets.',
    image: '/images/streamify.png',
    tech: ['React', 'Node.js', 'WebSockets', 'MongoDB'],
    demo: 'https://streamify-ezut.onrender.com',
    github: 'https://github.com/santoshDEV04/streamify',
  },
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio built with GSAP & Framer Motion.',
    image: '/images/portfolio.png',
    tech: ['React', 'GSAP', 'Framer Motion'],
    demo: 'https://santoshdash.vercel.app',
    github: 'https://github.com/santoshDEV04/my-portfolio',
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col items-center justify-center gap-12 px-4 py-18 sm:px-6 lg:px-8 overflow-hidden z-[1] bg-transparent"
    >
      <div className="text-center z-10">
        <h2 className="section-title text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          Projects
        </h2>
        <p className="text-gray-300 mt-1 max-w-2xl mx-auto text-base sm:text-lg">
          A selection of my favorite builds – crafted with passion & precision ✨
        </p>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-9 max-w-6xl w-full z-10">
        {projects.map((proj, i) => (
          <Tilt
            key={i}
            glareEnable={true}
            tiltReverse={false}
            glareMaxOpacity={0.4}
            glareColor="#ffffff"
            glarePosition="all"
            glareBorderRadius="20px"
            transitionSpeed={2500}
          >
            <div className="rounded-2xl p-6 w-[340px] h-[440px] flex flex-col
              bg-white/10 border border-white/20 backdrop-blur-md shadow-lg
              hover:shadow-xl hover:shadow-pink-500/30
              transition-all duration-500 ease-out group">

              {/* Image */}
              <div className="w-full h-56 bg-gradient-to-br from-cyan-500/20 to-purple-500/20
                rounded-xl mb-4 overflow-hidden group-hover:scale-[1.05] transition-transform duration-500">
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
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs rounded-full font-medium
                      bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-400/20"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-auto">
                <a
                  href={proj.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium
                    bg-gradient-to-r from-orange-500 to-pink-600 text-white
                    hover:opacity-90 transition duration-300"
                >
                  Live Demo
                </a>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium
                    bg-gray-800/60 text-white border border-gray-600 hover:bg-gray-700/80 transition duration-300"
                >
                  View Code
                </a>
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
};

export default Projects;
