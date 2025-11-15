import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STAGES = [
  { text: 'Initializing System', duration: 1000, progress: 25 },
  { text: 'Loading Assets', duration: 1200, progress: 50 },
  { text: 'Configuring Environment', duration: 1000, progress: 75 },
  { text: 'Almost Ready', duration: 800, progress: 100 },
];

const LOADING_MESSAGES = [
  'Preparing experience...',
  'Loading components...',
  'Optimizing performance...',
  'Setting up environment...',
  'Finalizing details...',
];

// Particle component for background effect
const Particle = ({ index }) => {
  const randomX = useMemo(() => Math.random() * 100, []);
  const randomY = useMemo(() => Math.random() * 100, []);
  const randomDelay = useMemo(() => Math.random() * 2, []);
  const randomDuration = useMemo(() => 3 + Math.random() * 4, []);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-white/40 rounded-full"
      initial={{
        x: `${randomX}vw`,
        y: `${randomY}vh`,
        opacity: 0,
        scale: 0,
      }}
      animate={{
        y: [`${randomY}vh`, `${randomY - 20}vh`, `${randomY}vh`],
        opacity: [0, 0.4, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: 'easeInOut',
      }}
    />
  );
};

// Start Button Component - Professional
const StartButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-12 py-4 bg-white/10 backdrop-blur-md
                 text-white font-sans text-base font-medium rounded-lg
                 border border-white/20 shadow-lg
                 transition-all duration-300 focus:outline-none focus:ring-2
                 focus:ring-white/30 overflow-hidden
                 hover:bg-white/15 hover:border-white/30"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {/* Subtle shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        Enter Portfolio
      </span>
    </motion.button>
  );
};

// Progress Bar Component - Professional
const ProgressBar = ({ progress, stage }) => {
  return (
    <div className="w-full max-w-md px-4">
      {/* Stage text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          className="text-sm text-white/80 font-sans mb-3 text-center font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {stage}
        </motion.p>
      </AnimatePresence>

      {/* Progress container */}
      <div className="relative w-full h-1.5 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden">
        {/* Progress fill */}
        <motion.div
          className="relative h-full bg-white/90 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 20,
            mass: 0.5,
          }}
        />
      </div>

      {/* Progress percentage */}
      <div className="flex justify-center mt-3">
        <motion.p
          className="text-xs text-white/60 font-sans font-medium"
          animate={{ opacity: [0.6, 1, 0.6] }}
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
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);

  const currentStage = LOADING_STAGES[currentStageIndex];

  // Handle loading progression
  useEffect(() => {
    if (!started) return;

    // Play sound
    const audio = new Audio('/sounds/loadingsound.mp3');
    audio.currentTime = 0.5;
    audio.volume = 0.5;
    audio.play().catch((err) => console.log('Autoplay blocked:', err));

    let progressInterval;
    let stageTimeout;

    const progressStage = () => {
      const stage = LOADING_STAGES[currentStageIndex];
      const startProgress =
        currentStageIndex > 0
          ? LOADING_STAGES[currentStageIndex - 1].progress
          : 0;
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
              setCurrentStageIndex((prev) => prev + 1);
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
      setLoadingMessage(
        LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]
      );
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stageTimeout);
      clearInterval(messageInterval);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [started, currentStageIndex, onComplete]);

  // Start screen - Professional
  if (!started) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center
                   bg-transparent text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}

        {/* Welcome text */}
        <motion.div
          className="text-center mb-12 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-4 text-white tracking-tight">
            Welcome
          </h1>
          <p className="text-white/60 text-base sm:text-lg font-light">
            Ready to explore?
          </p>
        </motion.div>

        {/* Start button */}
        <StartButton onClick={() => setStarted(true)} />

        {/* Bottom text */}
        <motion.p
          className="absolute bottom-8 text-white/40 text-xs font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Click to begin
        </motion.p>
      </motion.div>
    );
  }

  // Loading screen - Professional
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center
                 bg-transparent text-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center justify-center h-full gap-12">
        {/* Top section - Logo */}
        <div className="text-center">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="relative">
              <motion.div
                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </motion.div>

              {/* Orbiting dot */}
              <motion.div
                className="absolute top-0 left-1/2 w-2 h-2 bg-white/60 rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  transformOrigin: '0 32px',
                }}
              />
            </div>
          </motion.div>

          {/* Loading message */}
          <motion.p
            key={loadingMessage}
            className="text-center text-white/60 font-sans text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {loadingMessage}
          </motion.p>
        </div>

        {/* Progress bar */}
        <ProgressBar progress={progress} stage={currentStage.text} />
      </div>
    </motion.div>
  );
};
