import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import EyeCursorSection from "./EyeCursor";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Simplified floating blob with conditional animations
const FloatingBlob = ({
  radius = 60,
  duration = 20,
  size = "w-16 h-16",
  color = "from-cyan-400 to-blue-500",
  className = "",
}) => {
  const blobRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob || isMobile) return;

    // Use will-change and transform3d for better performance
    gsap.set(blob, { 
      force3D: true,
      willChange: "transform"
    });

    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(blob, {
      y: -20,
      duration: duration / 4,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })
    .to(blob, {
      rotation: 360,
      duration: duration,
      ease: "none",
    }, 0);

    return () => {
      gsap.killTweensOf(blob);
    };
  }, [duration, isMobile]);

  return (
    <div
      ref={blobRef}
      className={`absolute ${size} bg-gradient-to-br ${color} rounded-full blur-xl opacity-20 ${className}`}
    />
  );
};

// Use intersection observer instead of framer motion's useInView
const useCustomInView = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px -50px 0px",
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, options]);

  return isInView;
};

// Conditional text animation with better performance
const AnimatedText = ({ children, className = "", delay = 0 }) => {
  const textRef = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useCustomInView(textRef);

  useEffect(() => {
    const element = textRef.current;
    if (!element || isMobile) return;

    gsap.set(element, {
      opacity: 0,
      y: 20,
      force3D: true,
    });

    if (isInView) {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: delay,
        ease: "power1.out",
      });
    }
  }, [isInView, isMobile, delay]);

  if (isMobile) {
    return (
      <div ref={textRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

// Simplified glitch effect
const GlitchText = ({ children, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <span
      className={`${className} ${!isMobile && isGlitching ? "animate-pulse" : ""}`}
      style={{
        textShadow: !isMobile && isGlitching
          ? "2px 2px 0 #ff00ff, -2px -2px 0 #00ffff"
          : "none",
      }}
    >
      {children}
    </span>
  );
};

// Use GSAP for card animations instead of Framer Motion
const MagneticCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useCustomInView(cardRef);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || isMobile) return;

    gsap.set(element, {
      opacity: 0,
      y: 30,
      force3D: true,
    });

    if (isInView) {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power1.out",
      });
    }

    // Hover effect
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(element);
    };
  }, [isInView, isMobile]);

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  );
};

// Simplified morphing blob
const LiquidMorphBlob = ({ className = "" }) => {
  const blobRef = useRef();
  const isMobile = useIsMobile();

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob || isMobile) return;

    gsap.set(blob, { force3D: true });

    gsap.to(blob, {
      borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      gsap.killTweensOf(blob);
    };
  }, [isMobile]);

  return (
    <div
      ref={blobRef}
      className={`absolute bg-gradient-to-br from-purple-500/10 to-cyan-500/10 
                  rounded-full blur-2xl ${className}`}
    />
  );
};

export const About = () => {
  const aboutRef = useRef();
  const titleRef = useRef();
  const isMobile = useIsMobile();
  const isInView = useCustomInView(aboutRef);

  // Simplified scroll animations that work with ScrollSmoother
  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // Disable parallax that conflicts with ScrollSmoother
      // ScrollSmoother handles smooth scrolling effects
      
      // Simple fade-in animation for the section
      gsap.fromTo(aboutRef.current, 
        { opacity: 0 },
        { 
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: false,
            once: true,
          }
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Title animation
  useEffect(() => {
    const titleElement = titleRef.current;
    if (!titleElement || isMobile) return;

    gsap.set(titleElement, {
      opacity: 0,
      scale: 0.8,
      force3D: true,
    });

    if (isInView) {
      gsap.to(titleElement, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [isInView, isMobile]);

  const educationJourney = [
    {
      level: "Higher Secondary",
      institution: "Jawahar Navodaya Vidyalaya",
      year: "2015 - 2022",
      stream: "Science Stream",
      icon: "🏫",
      color: "from-orange-400 to-red-400",
    },
    {
      level: "Bachelor's Degree",
      institution: "Nalanda Institute of Technology",
      year: "2023 - Present",
      stream: "Computer Science & Engineering",
      icon: "🎓",
      color: "from-blue-400 to-cyan-400",
    },
  ];

  const motivations = [
    {
      text: "Creating intuitive solutions for real problems",
      icon: "🎯",
    },
    {
      text: "Writing clean, maintainable code",
      icon: "⚡",
    },
    {
      text: "Embracing new technologies and challenges",
      icon: "🚀",
    },
  ];

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen flex flex-col items-center justify-center 
                 gap-6 sm:gap-8 px-4 py-12 sm:py-16 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Elements - Simplified and responsive */}
      {!isMobile && (
        <div className="absolute inset-0">
          <LiquidMorphBlob className="w-32 h-32 sm:w-48 sm:h-48 bottom-20 right-20" />
          <LiquidMorphBlob className="w-40 h-40 sm:w-64 sm:h-64 top-1/3 left-1/6" />

          <FloatingBlob
            radius={40}
            duration={25}
            size="w-16 h-16 sm:w-24 sm:h-24"
            color="from-blue-400 to-cyan-400"
            className="bottom-32 right-20"
          />
          <FloatingBlob
            radius={30}
            duration={30}
            size="w-12 h-12 sm:w-20 sm:h-20"
            color="from-purple-400 to-pink-400"
            className="top-1/4 left-1/5"
          />
        </div>
      )}

      {/* Title Section */}
      <div className="text-center z-10">
        <div ref={titleRef} className="inline-block">
          <h2
            className="text-4xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
               bg-clip-text tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.1)]"
          >
            <GlitchText>About Me</GlitchText>
          </h2>

          <div className="h-0.5 w-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                         rounded-full mx-auto mt-2" />
        </div>
      </div>

      {/* Eye Cursor Section - Only render on desktop */}
      {!isMobile && (
        <div className="flex justify-center items-center w-full z-10">
          <EyeCursorSection />
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full gap-6 z-10">
        {/* Introduction Card */}
        <MagneticCard
          className="group backdrop-blur-md bg-gradient-to-b from-purple-600/50
             rounded-2xl p-6 shadow-lg hover:shadow-white/5 transition-all duration-300 
             hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
        >
          <div className="space-y-4">
            <AnimatedText
              className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-3 relative"
              delay={0.1}
            >
              Hey there!
              <span className="text-3xl sm:text-4xl">👋</span>
            </AnimatedText>

            <AnimatedText
              className="text-gray-200 text-base leading-relaxed"
              delay={0.2}
            >
              I'm{" "}
              <span
                className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 
                              bg-clip-text font-semibold"
              >
                Santosh Kumar Dash
              </span>
              , a passionate Full Stack Developer with expertise in React, Node.js, and cutting-edge web technologies.
            </AnimatedText>

            <AnimatedText
              className="text-gray-200 text-base leading-relaxed"
              delay={0.3}
            >
              I thrive on building clean, performant applications that transform complex ideas into seamless digital experiences. With a strong focus on efficiency, problem-solving, and user-centric design, I craft solutions that make an impact.
            </AnimatedText>
          </div>
        </MagneticCard>

        {/* Education Card */}
        <MagneticCard
          className="backdrop-blur-sm bg-gradient-to-b from-indigo-900/50 
                     rounded-2xl p-6 shadow-lg 
                     transition-all duration-300"
        >
          <AnimatedText
            className="text-xl font-semibold text-white mb-6 text-center"
            delay={0.1}
          >
            Educational Journey
          </AnimatedText>

          <div className="space-y-4">
            {educationJourney.map((edu, index) => (
              <AnimatedText
                key={index}
                delay={0.2 + index * 0.1}
                className="timeline-item"
              >
                <div
                  className={`flex items-start gap-4 p-4 rounded-xl bg-gradient-to-b from-cyan-700/30 
                               transition-all duration-300 ${!isMobile ? 'hover:scale-105' : ''}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${edu.color} 
                                  flex items-center justify-center text-2xl flex-shrink-0`}
                  >
                    {edu.icon}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium text-base mb-1">
                      {edu.institution}
                    </h5>
                    <p className="text-cyan-300 text-sm font-medium mb-1">
                      {edu.level}
                    </p>
                    <p className="text-gray-300 text-sm mb-1">{edu.stream}</p>
                    <p className="text-gray-400 text-sm">{edu.year}</p>
                  </div>
                </div>
              </AnimatedText>
            ))}
          </div>
        </MagneticCard>
      </div>

      {/* Motivations Card */}
      <MagneticCard
        className="max-w-5xl w-full backdrop-blur-md bg-gradient-to-b from-blue-900/80
             rounded-2xl p-6 transition-all duration-300"
      >
        <AnimatedText
          className="text-xl font-semibold text-white mb-6 text-center"
          delay={0.1}
        >
          What Drives Me
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {motivations.map((item, index) => (
            <AnimatedText
              key={index}
              delay={0.1 + index * 0.1}
              className={`p-4 rounded-xl bg-gradient-to-b from-violet-800 
                          transition-all duration-300 ${!isMobile ? 'hover:scale-105' : ''}`}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-gray-200 text-sm leading-relaxed">
                {item.text}
              </p>
            </AnimatedText>
          ))}
        </div>
      </MagneticCard>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-lg opacity-80" />
    </section>
  );
};