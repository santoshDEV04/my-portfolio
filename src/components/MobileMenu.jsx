import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const menuRef = useRef(null);
  const linkRefs = useRef([]);

  useEffect(() => {
    // Set body overflow
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    // Cleanup function to reset body overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    // Only animate when menu opens (not when it closes)
    if (menuOpen && linkRefs.current.length) {
      gsap.fromTo(
        linkRefs.current,
        {
          opacity: 0,
          x: (i) => (i % 2 === 0 ? -100 : 100),
          y: (i) => (i % 2 === 0 ? -50 : 50),
          rotate: (i) => (i % 2 === 0 ? -20 : 20),
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.15
        }
      );
    }
  }, [menuOpen]);

  const navItems = ["Home", "About", "Projects", "Contact"];

  const handleLinkClick = (e) => {
    setMenuOpen(false);
    // Smooth scroll to section
    const target = e.currentTarget.getAttribute('href');
    if (target.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {menuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 bg-gradient-to-br from-black via-slate-900 to-gray-900 backdrop-blur-xl z-50 flex flex-col items-center justify-center px-6 overflow-hidden"
          onClick={(e) => {
            // Close menu when clicking on background
            if (e.target === e.currentTarget) {
              setMenuOpen(false);
            }
          }}
        >


          <nav className="flex flex-col space-y-12 text-4xl md:text-5xl text-white text-center relative z-10">
            {navItems.map((label, i) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={handleLinkClick}
                ref={(el) => {
                  if (el) {
                    linkRefs.current[i] = el;
                  }
                }}
                className="block tracking-[0.2em] relative group cursor-pointer py-4 font-light"
              >
                <span className="relative inline-block text-transparent bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text transition-all duration-500 ease-out group-hover:from-cyan-300 group-hover:via-blue-400 group-hover:to-purple-400 group-hover:drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] transform group-hover:scale-110">
                  {label}
                </span>
                <span className="absolute left-1/2 -bottom-2 w-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-500 ease-out rounded-full shadow-lg shadow-cyan-400/50"></span>
                
                {/* Animated background glow on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-0 group-hover:scale-100 blur-sm"></span>
              </a>
            ))}
          </nav>

          {/* Enhanced decorative elements with animations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Animated gradient orbs */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
              className="absolute top-2/3 left-1/2 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-300/10 rounded-full blur-2xl animate-pulse"
            ></motion.div>
            
            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [100, -100],
                  x: [0, Math.random() * 200 - 100]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              ></motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;