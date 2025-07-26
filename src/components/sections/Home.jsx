import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
// import  RevealOnScroll from "./RevealOnScroll";

export const Home = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const buttonsRef = useRef(null);
  const cursorRef = useRef(null);
  const skillsCursorRef = useRef(null);

  const [displayedSkills, setDisplayedSkills] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [nameVisible, setNameVisible] = useState(false);
  const [showWave, setShowWave] = useState(false);

  const skills = [
    " <WebDeveloper />",
    " <ReactDeveloper />",
    " <ProblemSolver />",
    " <TechEnthusiast />",
    " <TechInovator />",
  ];

  useEffect(() => {
    // Show name and wave immediately
    setNameVisible(true);
    setShowWave(true);

    // Enhanced mouse tracking for cursor glow
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Typing animation setup
    const blinkSkillsCursor = () => {
      if (skillsCursorRef.current) {
        skillsCursorRef.current.style.animation = "blink 1s infinite";
      }
    };

    setTimeout(() => {
      blinkSkillsCursor();
      startSkillsTyping();
    }, 1500);

    // Skills typing animation
    let currentSkillIndex = 0;
    let skillCharIndex = 0;
    let isDeleting = false;
    const skillTypingSpeed = 100;
    const skillDeleteSpeed = 50;
    const skillPauseTime = 2000;

    const startSkillsTyping = () => {
      blinkSkillsCursor();
      typeSkills();
    };

    const typeSkills = () => {
      const currentSkill = skills[currentSkillIndex];

      if (isDeleting) {
        setDisplayedSkills(currentSkill.substring(0, skillCharIndex - 1));
        skillCharIndex--;

        if (skillCharIndex === 0) {
          isDeleting = false;
          currentSkillIndex = (currentSkillIndex + 1) % skills.length;
          setTimeout(typeSkills, 300);
        } else {
          setTimeout(typeSkills, skillDeleteSpeed);
        }
      } else {
        setDisplayedSkills(currentSkill.substring(0, skillCharIndex + 1));
        skillCharIndex++;

        if (skillCharIndex === currentSkill.length) {
          setTimeout(() => {
            isDeleting = true;
            typeSkills();
          }, skillPauseTime);
        } else {
          setTimeout(typeSkills, skillTypingSpeed);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Nothing+You+Could+Do&family=Oooh+Baby&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");

        .Skills {
          font-family: Inter;
          font-weight: 200;
        }

        .IM {
          font-family: Inter;
          font-weight: 200;
          font-size: 2.5rem;
        }

        .Hey {
          font-family: Inter;
          font-weight: 200;
        }

        .Name {
          font-family: Oooh Baby;
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(14deg);
          }
          20% {
            transform: rotate(-8deg);
          }
          30% {
            transform: rotate(14deg);
          }
          40% {
            transform: rotate(-4deg);
          }
          50% {
            transform: rotate(10deg);
          }
          60% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .wave-hand {
          scale: 1.5;
          transform-origin: 70% 70%;
          display: inline-block;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4);
          background-size: 300% 300%;
          animation: gradient-shift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .glow-effect {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          transition: box-shadow 0.3s ease;
        }

        .glow-effect:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }

        .skills-text {
          color: #60a5fa;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
        }
      `}</style>

      <motion.section
        id="home"
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="min-h-screen justify-center flex flex-col md:flex-row items-center md:justify-around relative text-white px-4 z-10 overflow-y-auto bg-transparent"
      >
        {/* <RevealOnScroll> */}
        <div className="flex flex-col justify-around h-1/2 text-center z-30 max-w-4xl floating-element relative">
          {/* Enhanced heading with waving hand */}
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: nameVisible ? 1 : 0, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="mb-4"
          >
            <div className="text-center">
              {/* "Hey 👋, I'm" Line */}
              <h1 className="Hey flex items-center justify-center text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent mb-1 gap-2">
                Hey{" "}
                {showWave && (
                  <img
                    src="/wave.gif"
                    alt="Waving hand"
                    className="w-8 h-8 md:w-12 md:h-12 wave-hand"
                  />
                )}
                , I'm
              </h1>

              {/* "Santosh" Line */}
              <h1 className="Name text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                Santosh
              </h1>
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: nameVisible ? "100%" : 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto max-w-xs rounded-full"
            />
          </motion.div>

          {/* Skills typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mb-8 min-h-[60px] flex items-center justify-center relative"
          >
            <span className="IM text-2xl md:text-3xl font-bold text-white absolute left-2 whitespace-nowrap hidden md:block">
              I'm a
            </span>
            <div className="text-2xl md:text-4xl font-bold flex items-center gap-2 absolute md:left-24">
              <div className="relative text-left min-w-[180px]">
                <span className="skills-text text-cyan-400 whitespace-nowrap Skills">
                  {displayedSkills}
                  <span
                    ref={skillsCursorRef}
                    className="text-blue-400 font-bold text-3xl ml-1 animate-pulse "
                  >
                    |
                  </span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced buttons */}
          <motion.div
            ref={buttonsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 2.5,
              type: "spring",
              stiffness: 100,
            }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8"
          >
            {/* View Skills Button */}
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: [-1, 1],
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.a
                href="#skills"
                className="block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-6 py-4 text-sm font-semibold rounded-full shadow-lg transition-all cursor-pointer glow-effect relative overflow-hidden group items-center gap-2"
              >
                <motion.div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-4">
                  Skills
                  <svg
                    className="w-5 h-5 text-white transition-transform duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </motion.a>
            </motion.div>

            {/* Contact Me Button */}
            <motion.div
              whileHover={{
                scale: 1.06,
                rotate: [-0.5, 0.5],
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.a
                href="#contact"
                className="block relative overflow-hidden rounded-full px-6 py-4 font-semibold text-sm text-white backdrop-blur-md group cursor-pointer bg-gradient-to-r from-fuchsia-600 via-pink-600 to-orange-500 shadow-lg shadow-indigo-900/40 glow-effect"
              >
                {/* SHINE EFFECT - FIXED */}
                <motion.div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 z-0" />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                  Contact Me
                  <svg
                    className="w-5 h-5 text-white transition-transform duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-20 mb-6 flex justify-center"
        >
          <motion.div
            className="relative w-24 h-24 md:w-72 md:h-72 hidden md:block cursor-pointer"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              const mouseX = e.clientX - centerX;
              const mouseY = e.clientY - centerY;

              const rotateX = (mouseY / rect.height) * -30; // Inverted for natural feel
              const rotateY = (mouseX / rect.width) * 30;

              e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-purple-500 blur-3xl opacity-80 animate-pulse"></div>
            <img
              src="/profilepic3.png"
              alt="Santosh Profile"
              className="rounded-full object-cover relative z-10 w-full h-full"
            />
          </motion.div>
        </motion.div>
        {/* </RevealOnScroll> */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-lg opacity-80" />
      </motion.section>
    </>
  );
};
