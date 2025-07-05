import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const circleRef = useRef(null);
  const dotRef = useRef(null);
  const rippleRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const dot = dotRef.current;
    const ripple = rippleRef.current;

    const circleX = gsap.quickTo(circle, "x", { duration: 0.6, ease: "power3.out" });
    const circleY = gsap.quickTo(circle, "y", { duration: 0.6, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power1.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power1.out" });

    let initialized = false;
    let isHoveringInteractive = false;

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      if (!initialized) {
        initialized = true;
        gsap.set([circle, dot], { x: x - 40, y: y - 40 });
        gsap.set(dot, { x: x - 4, y: y - 4 });
        gsap.to([circle, dot], { opacity: 1, duration: 0.3 });
      }

      circleX(x - 40);
      circleY(y - 40);
      dotX(x - 4);
      dotY(y - 4);
    };

    const handleClick = (e) => {
      ripple.style.display = "block";
      gsap.fromTo(
        ripple,
        { scale: 0, x: e.clientX - 40, y: e.clientY - 40, opacity: 0.3 },
        {
          scale: 3,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => (ripple.style.display = "none"),
        }
      );

      gsap.to(circle, { scale: 0.8, duration: 0.15 });
      gsap.to(dot, { scale: 1.4, duration: 0.1 });
    };

    const handleRelease = () => {
      gsap.to(circle, { scale: 1, duration: 0.15 });
      gsap.to(dot, { scale: 1, duration: 0.1 });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check if hovering over interactive elements
      if (
        target.closest("a") || 
        target.closest("button") || 
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.classList.contains("cursor-pointer") ||
        target.classList.contains("cursor-safe") ||
        getComputedStyle(target).cursor === "pointer"
      ) {
        if (!isHoveringInteractive) {
          isHoveringInteractive = true;
          // Scale up and make it a clean circle with no blur or background
          gsap.to(circle, { 
            scale: 1.5, 
            mixBlendMode: "normal",
            backgroundColor: "transparent",
            backdropFilter: "none",
            borderColor: "rgba(255,255,255,0.4)",
            borderWidth: "1px",
            duration: 0.2 
          });
          gsap.to(dot, { 
            scale: 0.8,
            backgroundColor: "rgba(255,255,255,0.9)",
            duration: 0.2 
          });
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      const relatedTarget = e.relatedTarget;
      
      // Check if we're leaving an interactive element and not entering another one
      if (
        (target.closest("a") || 
         target.closest("button") || 
         target.closest("input") ||
         target.closest("textarea") ||
         target.closest("select") ||
         target.classList.contains("cursor-pointer") ||
         target.classList.contains("cursor-safe") ||
         getComputedStyle(target).cursor === "pointer") &&
        (!relatedTarget || 
         (!relatedTarget.closest("a") && 
          !relatedTarget.closest("button") && 
          !relatedTarget.closest("input") &&
          !relatedTarget.closest("textarea") &&
          !relatedTarget.closest("select") &&
          !relatedTarget.classList.contains("cursor-pointer") &&
          !relatedTarget.classList.contains("cursor-safe") &&
          getComputedStyle(relatedTarget).cursor !== "pointer"))
      ) {
        if (isHoveringInteractive) {
          isHoveringInteractive = false;
          // Return to normal state
          gsap.to(circle, { 
            scale: 1,
            mixBlendMode: "difference", 
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(4px)",
            borderColor: "transparent",
            borderWidth: "0px",
            duration: 0.2 
          });
          gsap.to(dot, { 
            scale: 1,
            backgroundColor: "white",
            duration: 0.2 
          });
        }
      }
    };

    // Use passive event listeners to avoid blocking scrolling and improve performance
    document.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mousedown", handleClick, { passive: true });
    document.addEventListener("mouseup", handleRelease, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("mouseup", handleRelease);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Outer circle */}
      <div
        ref={circleRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-20 h-20 rounded-full bg-white/5 mix-blend-difference opacity-0 border-0 border-transparent"
        style={{
          backdropFilter: "blur(4px)",
          transition: "background-color 0.3s, box-shadow 0.3s, border 0.3s, backdrop-filter 0.3s",
          transform: "translate(-9999px, -9999px)",
          willChange: "transform",
        }}
      ></div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] w-2 h-2 bg-white rounded-full opacity-0"
        style={{
          transform: "translate(-9999px, -9999px)",
          willChange: "transform",
        }}
      ></div>

      {/* Click ripple */}
      <div
        ref={rippleRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-20 h-20 rounded-full border-2 border-white/40 opacity-0"
        style={{
          transform: "translate(-9999px, -9999px)",
          willChange: "transform",
          display: "none",
        }}
      ></div>
    </>
  );
};

export default CustomCursor;