import React, { useEffect, useRef, useState } from "react";

// Import SVG assets
import cssIcon from "../../assets/css.svg";
import jsIcon from "../../assets/js.svg";
import reactIcon from "../../assets/reactjs.svg";
import figmaIcon from "../../assets/figma.svg";
import tailwindIcon from "../../assets/tailwindcss.svg";
import vscodeIcon from "../../assets/VsCode.svg";
import leetcodeIcon from "../../assets/leetcode.svg";
import gitIcon from "../../assets/gitv.svg";
import nodeIcon from "../../assets/nodejs.svg";
import postmanIcon from "../../assets/postman.svg";
import tsIcon from "../../assets/typescript.svg";
import pyIcon from "../../assets/python.svg";
import jIcon from "../../assets/java.svg";
import nextIcon from "../../assets/nextjs.svg";
import mongoIcon from "../../assets/mongo.svg";

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [revealedSkills, setRevealedSkills] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const hoveraudioRef = useRef(new Audio("public/sounds/hover.mp3"));


  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // On mobile, reveal all skills immediately; on desktop, stagger them
          if (isMobile) {
            const allSkills = [...skillsData, ...toolsData];
            setRevealedSkills(new Set(allSkills.map((skill) => skill.name)));
          } else {
            // Desktop: Start revealing skills one by one
            const allSkills = [...skillsData, ...toolsData];
            allSkills.forEach((skill, index) => {
              setTimeout(() => {
                setRevealedSkills((prev) => new Set([...prev, skill.name]));
              }, index * 100);
            });
          }
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  const skillsData = [
    {
      name: "CSS",
      icon: cssIcon,
      color: "#1572B6",
      level: 90,
      description: "Styling & Design",
    },
    {
      name: "JavaScript",
      icon: jsIcon,
      color: "#F7DF1E",
      level: 85,
      description: "Dynamic Programming",
    },
    {
      name: "TypeScript",
      icon: tsIcon,
      color: "#3178C6",
      level: 75,
      description: "Typed JavaScript",
    },
    {
      name: "React",
      icon: reactIcon,
      color: "#61DAFB",
      level: 92,
      description: "Component Architecture",
    },
    {
      name: "Next.js",
      icon: nextIcon,
      color: "#f2f2f2",
      level: 80,
      description: "SSR & SSG Framework",
    },
    {
      name: "Tailwind",
      icon: tailwindIcon,
      color: "#06B6D4",
      level: 88,
      description: "Utility-First CSS",
    },
    {
      name: "Node.js",
      icon: nodeIcon,
      color: "#339933",
      level: 80,
      description: "Server-Side Runtime",
    },
    {
      name: "MongoDB",
      icon: mongoIcon,
      color: "#47A248",
      level: 78,
      description: "NoSQL Database",
    },
    {
      name: "Python",
      icon: pyIcon,
      color: "#3776AB",
      level: 65,
      description: "AI/ML & Backend",
    },
    {
      name: "Java",
      icon: jIcon,
      color: "#E34F26",
      level: 60,
      description: "OOP & Backend Basics",
    },
  ];

  const toolsData = [
    {
      name: "VS Code",
      icon: vscodeIcon,
      color: "#007ACC",
      level: 95,
      description: "Code Editor",
    },
    {
      name: "Git",
      icon: gitIcon,
      color: "#F05032",
      level: 87,
      description: "Version Control",
    },
    {
      name: "LeetCode",
      icon: leetcodeIcon,
      color: "#FFA116",
      level: 75,
      description: "Problem Solving",
    },
    {
      name: "Figma",
      icon: figmaIcon,
      color: "#F24E1E",
      level: 82,
      description: "UI/UX Design",
    },
    {
      name: "Postman",
      icon: postmanIcon,
      color: "#FF6C37",
      level: 78,
      description: "API Testing",
    },
  ];

  const SkillCard = ({ skill, index, isRevealed, isToolCard = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    const handleMouseEnter = () => {
      !isMobile && setIsHovered(true);

      if (hoveraudioRef.current) {
      hoveraudioRef.current.volume = 1;
      hoveraudioRef.current.currentTime = 0;
      hoveraudioRef.current.play().catch((err) => console.log("Hover audio error: ", err));
    }

    };
    const handleMouseLeave = () => !isMobile && setIsHovered(false);

    // Mobile-specific classes
    const mobileClasses = isMobile
      ? "transform-none opacity-100 scale-100"
      : `transition-all duration-500 ease-out ${
          isRevealed
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-6 opacity-0 scale-95"
        }`;

    const hoverEffectsClasses = isMobile
      ? ""
      : `transition-all duration-300 hover:shadow-2xl hover:border-white/20`;

    return (
      <div
        ref={cardRef}
        className={`relative group cursor-pointer ${mobileClasses}`}
        style={{
          transitionDelay: isMobile ? "0ms" : `${index * 100}ms`,
          willChange: isMobile ? "auto" : "transform, opacity",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}

      >
        {/* Glow Effect - Disabled on mobile */}
        {!isMobile && (
          <div
            className={`absolute inset-0 rounded-xl transition-all duration-300 blur-lg pointer-events-none ${
              isHovered ? "opacity-40 scale-105" : "opacity-0 scale-100"
            }`}
            style={{
              background: `radial-gradient(circle at center, ${skill.color}66, transparent 70%)`,
            }}
          />
        )}

        {/* Main Card - Fixed Height */}
        {/* Main Card - Dynamic Height instead of fixed h-32 */}
        <div
          className={`relative min-h-[9rem] md:min-h-[10rem] overflow-visible rounded-xl
  bg-gradient-to-b from-white/10 via-white/5 to-transparent
  backdrop-blur-xl shadow-xl ${hoverEffectsClasses}`}
        >
          {/* Animated Background - Disabled on mobile */}
          {!isMobile && (
            <div
              className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                isHovered ? "opacity-20" : "opacity-5"
              }`}
              style={{
                background: `conic-gradient(from 0deg, ${skill.color}22, transparent, ${skill.color}11, transparent)`,
                animation: "spin-slow 20s linear infinite",
              }}
            />
          )}

          {/* Static background for mobile */}
          {isMobile && (
            <div
              className="absolute inset-0 rounded-xl opacity-10"
              style={{
                background: `linear-gradient(135deg, ${skill.color}33, ${skill.color}11)`,
              }}
            />
          )}

          {/* Content Container - Dynamic layout based on card type */}
          <div className="relative z-10 p-4 h-full flex flex-col justify-between">
            {/* Icon */}
            <div className="flex justify-center mb-2">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isMobile
                    ? ""
                    : `transition-all duration-300 ${
                        isHovered ? "scale-110" : "scale-100"
                      }`
                }`}
                style={{
                  background: `linear-gradient(135deg, ${skill.color}33, ${skill.color}11)`,
                  boxShadow: `0 4px 16px ${skill.color}44`,
                }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className={`w-5 h-5 object-contain ${
                    isMobile ? "" : "transition-all duration-300"
                  }`}
                  style={{
                    filter:
                      !isMobile && isHovered
                        ? `drop-shadow(0 0 6px ${skill.color}66)`
                        : "none",
                  }}
                />
              </div>
            </div>

            {/* Skill Name */}
            <h4
              className={`text-sm font-bold text-center ${
                isMobile
                  ? "text-white"
                  : `transition-all duration-300 ${
                      isHovered
                        ? "text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text"
                        : "text-white"
                    }`
              } ${isToolCard ? "mb-auto" : "mb-2"}`}
            >
              {skill.name}
            </h4>
          </div>

          {/* Hover Description - Only show on desktop */}
          {!isMobile && (
            <div
              className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium text-white whitespace-nowrap pointer-events-none transition-all duration-300 z-20 ${
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
              style={{
                background: `linear-gradient(135deg, ${skill.color}ee, ${skill.color}cc)`,
                boxShadow: `0 4px 12px ${skill.color}44`,
              }}
            >
              {skill.description}
              {/* Arrow */}
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: `4px solid ${skill.color}ee`,
                }}
              />
            </div>
          )}

          {/* Mobile description - Show as static text below icon
          {isMobile && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 text-center">
              {skill.description}
            </div>
          )} */}
        </div>
      </div>
    );
  };

  // Mobile-specific section classes
  const sectionAnimationClasses = isMobile
    ? "opacity-100 transform-none"
    : `transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 px-4 sm:px-6 lg:px-8 w-full overflow-hidden min-h-screen"
    >
      {/* Background Pattern - Simplified for mobile */}
      <div
        className={`absolute inset-0 ${isMobile ? "opacity-3" : "opacity-5"}`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
            backgroundSize: isMobile ? "30px 30px" : "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className={sectionAnimationClasses}>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Skills
              </span>
              <span className="text-white"> & </span>
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Tools
              </span>
            </h2>
          </div>
          <div
            className={`${
              isMobile
                ? "opacity-100 transform-none"
                : `transform transition-all duration-700 delay-200 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`
            }`}
          >
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Crafting digital experiences with modern technologies
            </p>
          </div>
        </div>

        {/* Core Skills */}
        <div className="space-y-6">
          <div
            className={`${
              isMobile
                ? "opacity-100 transform-none"
                : `transform transition-all duration-700 delay-300 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`
            }`}
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1" />
              <h3 className="text-lg font-bold text-white px-4">Core Skills</h3>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {skillsData.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                isRevealed={revealedSkills.has(skill.name)}
                isToolCard={false}
              />
            ))}
          </div>
        </div>

        {/* Development Tools */}
        <div className="space-y-6">
          <div
            className={`${
              isMobile
                ? "opacity-100 transform-none"
                : `transform transition-all duration-700 delay-500 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`
            }`}
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1" />
              <h3 className="text-lg font-bold text-white px-4">
                Development Tools
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent flex-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {toolsData.map((tool, index) => (
              <SkillCard
                key={tool.name}
                skill={tool}
                index={index + skillsData.length}
                isRevealed={revealedSkills.has(tool.name)}
                isToolCard={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Bar */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 rounded-full bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-lg opacity-80" />

      {/* Optimized Animations - Only load on desktop */}
      {!isMobile && (
        <style>{`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      )}
    </section>
  );
};

export default SkillsSection;
