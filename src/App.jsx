import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import Skills  from "./components/sections/Skills";
import Contact  from "./components/sections/Contact";
import FooterSection from "./components/sections/FooterSection";
import { ParticlesBackground } from "./components/ParticlesBackground";
import Background  from "./components/Background.jsx";
import SplashCursor from './components/SplashCursor';
import ScrollProgressBar from "./components/ScrollProgressBar.jsx";
import SocialSidebar from './components/SocialSidebar';
import SmoothScrollWrapper from "./components/SmoothScrollWrapper.jsx";
import CircularText from "./components/CircularText.jsx";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to true for safety

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      // Check multiple conditions for mobile detection
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // More comprehensive mobile detection
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet|kindle|silk|playbook|bb10|windows phone/i.test(userAgent.toLowerCase());

      // Check for touch capability
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Check screen size
      const isSmallScreen = window.innerWidth <= 768;

      // Check if it's a mobile device OR has touch AND small screen
      const isMobileDevice = isMobileUserAgent || (hasTouchScreen && isSmallScreen);

      console.log('Mobile Detection:', {
        userAgent: userAgent,
        isMobileUserAgent,
        hasTouchScreen,
        isSmallScreen,
        windowWidth: window.innerWidth,
        finalResult: isMobileDevice
      });

      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Background - Only render on desktop */}
      {!isMobile && (
        <div className="hidden md:block">
          <Background
            particleCount={400}
            particleColors={["#00ffff", "#ff00ff", "#ffffff"]}
            particleBaseSize={120}
            moveParticlesOnHover={true}
            particleHoverFactor={8}
            alphaParticles={true}
          />
        </div>
      )}

      {/* Fixed UI Elements - Always visible */}
      {/* Custom Cursor - Only render on desktop */}
      {!isMobile && (
        <div className="hidden md:block">
          <CustomCursor />
        </div>
      )}
      {/* <SplashCursor /> */}

      {/* Scroll Progress - Only show after loading */}
      {isLoaded && <ScrollProgressBar />}

      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoaded(true)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-0"
          >
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <SocialSidebar/>

            {/* Main Content */}
            <main>
              <Home />
              <About />
              <Skills/>
              <Contact/>
              <FooterSection/>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;