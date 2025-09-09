import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import FooterSection from "./components/sections/FooterSection";
import Background from "./components/Background.jsx";
import ScrollProgressBar from "./components/ScrollProgressBar.jsx";
import SocialSidebar from "./components/SocialSidebar";
import SmoothScrollWrapper from "./components/SmoothScrollWrapper.jsx";
import CircularText from "./components/CircularText.jsx";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet|kindle|silk|playbook|bb10|windows phone/i.test(
        userAgent.toLowerCase()
      );

      const hasTouchScreen =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      const isSmallScreen = window.innerWidth <= 768;

      const isMobileDevice =
        isMobileUserAgent || (hasTouchScreen && isSmallScreen);

      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* 🌌 Background - Only on desktop */}
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

      {/* 🖱 Custom Cursor - Only on desktop */}
      {!isMobile && (
        <div className="hidden md:block">
          <CustomCursor />
        </div>
      )}

      {/* 📊 Scroll Progress - Only after loading */}
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
            {/* 🚀 Fixed Elements (outside SmoothScrollWrapper) */}
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <SocialSidebar />

            {/* 🌀 CircularText - Desktop bottom-left */}
            <div className="hidden md:block fixed bottom-4 left-4 z-[99999]">
              <CircularText />
            </div>

            {/* 🌀 CircularText - Mobile top-center */}
            <div className="md:hidden absolute top-[8vh] left-1/2 -translate-x-1/2 z-[99999]">
              <CircularText />
            </div>

            {/* 📜 Scrollable Content */}
              <main>
            <SmoothScrollWrapper>
                <Home />
                <About />
                <Skills />
                <Contact />
                <FooterSection />
            </SmoothScrollWrapper>
              </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
