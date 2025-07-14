import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

const SmoothScrollWrapper = ({ children }) => {
  const smootherRef = useRef(null);

  useLayoutEffect(() => {
    if (!smootherRef.current) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2, 
        effects: true,
        smoothTouch: 0.1, 
      });
    }

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="relative overflow-hidden">
      <div id="smooth-content">{children}</div>
    </div>
  );
};

export default SmoothScrollWrapper;
