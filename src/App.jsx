import React, { useState } from "react";
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
import SplashCursor from './components/SplashCursor'
import ScrollProgressBar from "./components/ScrollProgressBar.jsx";
import SocialSidebar from './components/SocialSidebar';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* <ParticlesBackground/> */}
      <Background
        particleCount={400}
        particleColors={["#00ffff", "#ff00ff", "#ffffff"]}
        particleBaseSize={120}
        moveParticlesOnHover={true}
        particleHoverFactor={8}
        alphaParticles={true}
        // Removed className="pointer-events-none" - this was blocking mouse events
      />

      {/* Fixed UI Elements - Always visible */}
      <CustomCursor />
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
            
            {/* Main Content */}
            <main>
              <SocialSidebar/>
              <Home />
              <About />
              <Skills/>
              <Contact/>
              <FooterSection/>
              {/* Add more sections as needed */}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;