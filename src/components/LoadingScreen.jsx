import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FULL_TEXT = "🚀Booting Up";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [dotCount, setDotCount] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return; // Don't run until user clicks Start

    let index = 0;
    let typingInterval;
    let dotsInterval;

    // Play sound once user clicks Start
    const audio = new Audio("/sounds/loadingsound.mp3");
    audio.currentTime = 0.5;
    audio.play().catch((err) =>
      console.log("Autoplay blocked:", err)
    );

    const typeNextChar = () => {
      if (index <= FULL_TEXT.length) {
        setText(FULL_TEXT.substring(0, index));
        setProgress((index / FULL_TEXT.length) * 100);
        index++;
      } else {
        clearInterval(typingInterval);
        setShowDots(true);
        dotsInterval = setInterval(() => {
          setDotCount((prev) => (prev + 1) % 4);
        }, 400);

        setTimeout(() => {
          clearInterval(dotsInterval);
          onComplete?.();
        }, 2000);
      }
    };

    typingInterval = setInterval(typeNextChar, 120);

    return () => {
      clearInterval(typingInterval);
      clearInterval(dotsInterval);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [started, onComplete]);

  // If not started, show futuristic Start button
  if (!started) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />

        <div className="relative group">
          <div className="absolute -inset-4 rounded-full border border-cyan-400/30 animate-spin opacity-60" style={{ animationDuration: '10s' }}></div>

          {/* Middle rotating ring */}
          <div className="absolute -inset-2 rounded-full border border-purple-400/40 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>

          <motion.button
            onClick={() => setStarted(true)}
            className="relative px-12 py-4 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:via-purple-500 hover:to-pink-400 text-black font-mono text-xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/50 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 group-hover:animate-pulse border-2 border-transparent hover:border-cyan-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.3), inset 0 0 30px rgba(147, 51, 234, 0.2)',
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="group-hover:animate-bounce"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
              START
            </span>

            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Normal loading screen after Start is clicked
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="font-mono text-4xl sm:text-5xl tracking-tight text-green-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="text-blue-400">➜</span>{" "}
        <span className="text-white">~</span> {text}
        <AnimatePresence>
          {showDots && (
            <motion.span
              key="dots"
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={{
                    opacity: i < dotCount ? 1 : 0.3,
                    scale: i < dotCount ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  .
                </motion.span>
              ))}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.h1>

      <div className="w-64 max-w-[80vw] h-1 mt-6 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
        />
      </div>

      <motion.p
        className="mt-8 text-sm text-gray-500 font-mono tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Loading developer environment...
      </motion.p>
    </motion.div>
  );
};