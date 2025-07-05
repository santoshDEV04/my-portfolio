import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FULL_TEXT = "Hello World";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [dotCount, setDotCount] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let index = 0;
    let typingInterval;
    let dotsInterval;

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
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Developer-Styled Terminal Look */}
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

      {/* Minimal Progress Bar */}
      <div className="w-64 max-w-[80vw] h-1 mt-6 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
        />
      </div>

      {/* Subtle Tagline */}
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
