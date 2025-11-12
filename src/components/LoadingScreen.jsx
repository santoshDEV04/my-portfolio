import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_STAGES = [
  { text: "Initializing System", duration: 1000, progress: 25 },
  { text: "Loading Assets", duration: 1200, progress: 50 },
  { text: "Configuring Environment", duration: 1000, progress: 75 },
  { text: "Almost Ready", duration: 800, progress: 100 },
];

const LOADING_MESSAGES = [
  "Brewing fresh code...",
  "Compiling magic...",
  "Optimizing pixels...",
  "Warming up the engines...",
  "Loading awesomeness...",
];

// Particle component for background effect
const Particle = ({ index }) => {
  const randomX = useMemo(() => Math.random() * 100, []);
  const randomY = useMemo(() => Math.random() * 100, []);
  const randomDelay = useMemo(() => Math.random() * 2, []);
  const randomDuration = useMemo(() => 3 + Math.random() * 4, []);
  const colors = ["bg-cyan-400", "bg-purple-500", "bg-pink-500", "bg-blue-400"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      className={`absolute w-1.5 h-1.5 ${randomColor} rounded-full blur-sm`}
      initial={{
        x: `${randomX}vw`,
        y: `${randomY}vh`,
        opacity: 0,
        scale: 0
      }}
      animate={{
        y: [`${randomY}vh`, `${randomY - 20}vh`, `${randomY}vh`],
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "easeInOut",
      }}
    />
  );
};

// Start Button Component - BOLD COLORS
const StartButton = ({ onClick }) => {
  return (
    <div className="relative group">
      {/* Outer rotating ring - BRIGHT CYAN */}
      <div
        className="absolute -inset-6 rounded-full border-2 border-cyan-400 animate-spin"
        style={{ animationDuration: '12s' }}
      />

      {/* Middle rotating ring - BRIGHT PURPLE */}
      <div
        className="absolute -inset-4 rounded-full border-2 border-purple-500 animate-spin"
        style={{ animationDuration: '8s', animationDirection: 'reverse' }}
      />

      {/* Inner pulse ring - BRIGHT PINK */}
      <motion.div
        className="absolute -inset-2 rounded-full border-2 border-pink-500"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.button
        onClick={onClick}
        className="relative px-14 py-5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
                   text-black font-mono text-xl font-bold rounded-full shadow-2xl
                   transition-all duration-300 focus:outline-none focus:ring-4
                   focus:ring-cyan-400 overflow-hidden
                   hover:shadow-[0_0_50px_rgba(34,211,238,0.8)]
                   hover:shadow-cyan-400/70"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
        style={{
          boxShadow: '0 0 40px rgba(34, 211, 238, 0.6), inset 0 0 20px rgba(168, 85, 247, 0.3)',
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-300/40 via-white/30 to-cyan-300/40"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Button content */}
        <span className="relative z-10 flex items-center gap-3">
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            animate={{
              x: [0, 3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path d="M8 5v14l11-7z"/>
          </motion.svg>
          ENTER PORTFOLIO
        </span>

        {/* Corner accents - VIBRANT */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white rounded-br-lg" />
      </motion.button>
    </div>
  );
};

// Progress Bar Component - BOLD COLORS
const ProgressBar = ({ progress, stage }) => {
  return (
    <div className="w-full max-w-2xl px-4">
      {/* Stage text - BRIGHT CYAN */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          className="text-sm sm:text-base text-cyan-400 font-mono mb-4 text-center font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {stage}
        </motion.p>
      </AnimatePresence>

      {/* Progress container - DARKER BACKGROUND FOR CONTRAST */}
      <div className="relative w-full h-3 bg-black/40 backdrop-blur-sm rounded-full overflow-hidden border-2 border-cyan-400">
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Progress fill - VIBRANT GRADIENT */}
        <motion.div
          className="relative h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            mass: 0.5
          }}
          style={{
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(168, 85, 247, 0.6)',
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/70 via-purple-400/70 to-pink-400/70 blur-md" />
        </motion.div>

        {/* Animated dots on progress bar */}
        {progress > 0 && (
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-cyan-400"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              right: `${100 - progress}%`,
              boxShadow: '0 0 15px rgba(34, 211, 238, 1)',
            }}
          />
        )}
      </div>

      {/* Progress percentage - BRIGHT WHITE */}
      <div className="flex justify-center mt-3">
        <motion.p
          className="text-sm text-white font-mono font-bold md:text-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {Math.round(progress)}%
        </motion.p>
      </div>
    </div>
  );
};

export const LoadingScreen = ({ onComplete }) => {
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES);

  const currentStage = LOADING_STAGES[currentStageIndex];

  // Handle loading progression
  useEffect(() => {
    if (!started) return;

    // Play sound
    const audio = new Audio("/sounds/loadingsound.mp3");
    audio.currentTime = 0.5;
    audio.volume = 0.5;
    audio.play().catch((err) => console.log("Autoplay blocked:", err));

    let progressInterval;
    let stageTimeout;

    const progressStage = () => {
      const stage = LOADING_STAGES[currentStageIndex];
      const startProgress = currentStageIndex > 0 ? LOADING_STAGES[currentStageIndex - 1].progress : 0;
      const targetProgress = stage.progress;
      const steps = 30;
      const increment = (targetProgress - startProgress) / steps;
      let currentProgress = startProgress;

      progressInterval = setInterval(() => {
        currentProgress += increment;
        setProgress(Math.min(currentProgress, targetProgress));

        if (currentProgress >= targetProgress) {
          clearInterval(progressInterval);

          if (currentStageIndex < LOADING_STAGES.length - 1) {
            stageTimeout = setTimeout(() => {
              setCurrentStageIndex(prev => prev + 1);
            }, 200);
          } else {
            setTimeout(() => {
              onComplete?.();
            }, 500);
          }
        }
      }, stage.duration / steps);
    };

    progressStage();

    // Random loading messages
    const messageInterval = setInterval(() => {
      setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stageTimeout);
      clearInterval(messageInterval);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [started, currentStageIndex, onComplete]);

  // Start screen - TRANSPARENT BACKGROUND
  if (!started) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center
                   bg-transparent text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Subtle grid pattern - LIGHT */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Particles - COLORFUL */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}

        {/* Welcome text - BOLD COLORS */}
        <motion.div
          className="text-center mb-12 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
            Welcome
          </h1>
          <p className="text-cyan-400 text-lg sm:text-xl font-mono font-bold">
            Ready to explore?
          </p>
        </motion.div>

        {/* Start button */}
        <StartButton onClick={() => setStarted(true)} />

        {/* Bottom text - BOLD CYAN */}
        <motion.p
          className="absolute bottom-8 text-cyan-400 text-sm font-mono font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Click to begin your journey
        </motion.p>
      </motion.div>
    );
  }

  // Loading screen - TRANSPARENT BACKGROUND & BOLD COLORS
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center
                 bg-transparent text-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Particles - COLORFUL */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}

      {/* Main content - CENTERED LAYOUT */}
      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center justify-center h-full gap-8">

        {/* Top section - Logo and title */}
        <div className="text-center">
          {/* Rotating logo - VIBRANT */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="relative">
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  boxShadow: '0 0 40px rgba(34, 211, 238, 0.8), 0 0 60px rgba(168, 85, 247, 0.6)',
                }}
              >
                <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-3xl">🚀</span>
                </div>
              </motion.div>

              {/* Orbiting dot - CYAN */}
              <motion.div
                className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  transformOrigin: '0 40px',
                  boxShadow: '0 0 10px rgba(34, 211, 238, 1)',
                }}
              />
            </div>
          </motion.div>

          {/* Title - BOLD CYAN */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentStageIndex}
              className="text-3xl sm:text-4xl font-black text-cyan-400 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {currentStage.text}
            </motion.h2>
          </AnimatePresence>

          {/* Loading message - PURPLE */}
          <motion.p
            key={loadingMessage}
            className="text-center text-purple-400 font-mono text-sm mt-3 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {loadingMessage}
          </motion.p>
        </div>

        {/* PROGRESS BAR IN THE MIDDLE */}
        <ProgressBar progress={progress} stage={currentStage.text} />

        {/* Bottom section - Terminal output - BRIGHT COLORS */}
        <motion.div
          className="font-mono text-xs text-center space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-cyan-400 font-bold"
          >
            <span className="text-pink-500">$</span> npm run dev
          </motion.p>
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            className="text-purple-500 font-bold"
          >
            <span className="text-cyan-400">›</span> Server running on localhost:3000
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};
