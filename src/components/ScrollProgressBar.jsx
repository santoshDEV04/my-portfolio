import { useEffect, useState, useRef } from "react";

export const ScrollProgressBar = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef(null);
  const percentageRef = useRef(null);
  const gsapRef = useRef(null);

  useEffect(() => {
    const initGSAP = async () => {
      try {
        if (!window.gsap) {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
          script.onload = () => {
            gsapRef.current = window.gsap;
          };
          document.head.appendChild(script);
        } else {
          gsapRef.current = window.gsap;
        }
      } catch (error) {
        console.warn("GSAP failed to load, falling back to CSS.");
      }
    };

    initGSAP();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

      setScrollPercent(percent);
      setIsVisible(scrollTop > 100);

      if (gsapRef.current) {
        if (progressRef.current) {
          gsapRef.current.to(progressRef.current, {
            height: `${percent}%`,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (percentageRef.current) {
          gsapRef.current.to(percentageRef.current, {
            textContent: Math.round(percent),
            duration: 0.3,
            ease: "power2.out",
            snap: { textContent: 1 },
          });
        }
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  const displayPercent = !isNaN(scrollPercent) ? Math.round(scrollPercent) : 0;

  return (
    <>
      {/* Vertical Scroll Bar */}
      <div
        className={`fixed left-7 top-1/2 -translate-y-1/2 h-64 w-1 z-50 transition-all duration-500 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="relative h-full w-full bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
          <div
            ref={progressRef}
            className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500 via-purple-500 to-pink-500 rounded-full shadow-lg transition-all duration-300 ease-out"
            style={{ height: gsapRef.current ? "0%" : `${scrollPercent}%` }}
          />
          <div
            className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-sm opacity-70"
            style={{ height: `${scrollPercent}%` }}
          />
        </div>
      </div>

      {/* Circular Ring Progress */}
      <div
        className={`fixed top-[13rem] left-2 w-12 h-12 z-50 transition-all duration-500 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          {/* Background Circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            strokeDasharray="100, 100"
          />
          {/* Progress Circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeDasharray={`${displayPercent}, 100`}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 8px rgba(147, 51, 234, 0.6))" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-[0.7rem] font-semibold">
            {displayPercent}
          </span>
        </div>
      </div>
    </>
  );
};

export default ScrollProgressBar;
