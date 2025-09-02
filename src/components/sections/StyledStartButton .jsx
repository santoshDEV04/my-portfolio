import React, { useState } from 'react';

const StyledStartButton = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Futuristic Start Button */}
      <div className="relative group">
        {/* Outer rotating ring */}
        <div className="absolute -inset-4 rounded-full border border-cyan-400/30 animate-spin opacity-60" style={{ animationDuration: '10s' }}></div>

        {/* Middle rotating ring */}
        <div className="absolute -inset-2 rounded-full border border-purple-400/40 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>

        <button
          onClick={() => setStarted(true)}
          className="relative px-12 py-4 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-400 hover:via-purple-500 hover:to-pink-400 text-black font-mono text-xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/50 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 group-hover:animate-pulse border-2 border-transparent hover:border-cyan-300"
          style={{
            boxShadow: '0 0 30px rgba(6, 182, 212, 0.3), inset 0 0 30px rgba(147, 51, 234, 0.2)',
            background: 'linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease infinite'
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
        </button>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default StyledStartButton;