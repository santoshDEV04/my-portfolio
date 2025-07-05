import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// EyeCursorSection with GSAP animations and improved centering
const EyeCursorSection = () => {
  const eyes = [
    {
      eye: useRef(null),
      pupil: useRef(null),
      eyelid: useRef(null),
      brow: useRef(null),
    },
    {
      eye: useRef(null),
      pupil: useRef(null),
      eyelid: useRef(null),
      brow: useRef(null),
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      eyes.forEach(({ eye, pupil, eyelid, brow }, idx) => {
        const rect = eye.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(14, Math.hypot(dx, dy) / 12);

        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;

        // Animate pupil following cursor
        gsap.to(pupil.current, {
          x,
          y,
          duration: 0.25,
          ease: "power2.out",
        });

        // Animate eyebrow: raise/lower and rotate based on cursor Y and X
        const browRaise = Math.max(-8, Math.min(8, (centerY - clientY) / 10));
        const browTilt = (clientX - centerX) / 40;
        gsap.to(brow.current, {
          y: browRaise,
          rotate: browTilt,
          duration: 0.3,
          ease: "power2.out",
        });

        // Eyelid animation: blink when hovering
        const isHovering =
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom;

        gsap.to(eyelid.current, {
          height: isHovering ? "100%" : "0%",
          duration: 0.25,
          ease: "power1.inOut",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Occasional random blink
  useEffect(() => {
    let blinkTimeout;
    function blink() {
      eyes.forEach(({ eyelid }) => {
        gsap.to(eyelid.current, {
          height: "100%",
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(eyelid.current, { height: "0%", duration: 0.12 });
          },
        });
      });
      blinkTimeout = setTimeout(blink, 2000 + Math.random() * 2000);
    }
    blinkTimeout = setTimeout(blink, 2000 + Math.random() * 2000);
    return () => clearTimeout(blinkTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center w-full max-w-xs mx-auto"
    >
      {/* Eyebrows Container */}
      <div className="relative flex justify-center items-center w-full h-8 mb-2">
        {eyes.map(({ brow }, i) => (
          <div
            key={i}
            ref={brow}
            className={`w-14 h-2 bg-yellow-300 rounded-full absolute shadow-lg
              ${i === 0 ? "-rotate-12" : "rotate-12"}
              transform-gpu`}
            style={{
              left: i === 0 ? '20%' : 'auto',
              right: i === 1 ? '20%' : 'auto',
              boxShadow: "0 4px 12px 0 rgba(0,0,0,0.12)",
              borderTop: "3px solid #fbbf24",
              borderBottom: "1px solid #f59e42",
            }}
          ></div>
        ))}
      </div>

      {/* Eyes Container */}
      <div className="flex justify-center items-center gap-8 w-full">
        {eyes.map(({ eye, pupil, eyelid }, i) => (
          <div
            key={i}
            ref={eye}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-2 border-gray-200 transform-gpu overflow-hidden relative"
            style={{
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
            }}
          >
            {/* Eyelid */}
            <div
              ref={eyelid}
              className="absolute top-0 left-0 w-full h-0 bg-black/80 z-20 rounded-b-full transition-all duration-300 ease-out"
              style={{
                borderBottomLeftRadius: "100% 60%",
                borderBottomRightRadius: "100% 60%",
                pointerEvents: "none",
              }}
            ></div>
            
            {/* Pupil */}
            <motion.div
              ref={pupil}
              className="w-7 h-7 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-full shadow-lg z-30 border-2 border-gray-700"
              style={{
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.25)",
              }}
            ></motion.div>
            
            {/* Eye shine */}
            <div className="absolute left-5 top-5 w-3 h-3 bg-white/80 rounded-full z-40 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EyeCursorSection;