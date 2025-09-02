import { useEffect, useRef, useState } from "react";
import CircularText from "./CircularText";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const linkRefs = useRef([]);
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState("home");
  const audioRef = useRef(new Audio("public/sounds/click.mp3"));

  const handleClick = (e, section) => {
    e.preventDefault();

    // 📜 Smooth scroll
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  const handleHover = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1;
      audioRef.current.play().catch((err) => console.log("Audio play error:", err));
    }
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Smooth initial animation
    const navbar = navbarRef.current;
    const logo = logoRef.current;
    const links = linkRefs.current;

    if (navbar && logo && links.length) {
      navbar.style.transform = "translateY(-100%)";
      navbar.style.opacity = "0";

      setTimeout(() => {
        navbar.style.transition =
          "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        navbar.style.transform = "translateY(0)";
        navbar.style.opacity = "1";
      }, 100);

      setTimeout(() => {
        logo.style.opacity = "0";
        logo.style.transform = "translateY(-10px)";
        logo.style.transition = "all 0.6s ease-out";

        setTimeout(() => {
          logo.style.opacity = "1";
          logo.style.transform = "translateY(0)";
        }, 50);
      }, 400);

      links.forEach((link, index) => {
        if (link) {
          link.style.opacity = "0";
          link.style.transform = "translateY(-20px)";

          setTimeout(() => {
            link.style.transition = "all 0.5s ease-out";
            link.style.opacity = "1";
            link.style.transform = "translateY(0)";
          }, 600 + index * 100);
        }
      });
    }
  }, []);

  useEffect(() => {
    // Use a timeout to ensure sections are loaded
    const setupObserver = () => {
      const sections = document.querySelectorAll("section[id]");
      console.log(
        "Found sections:",
        Array.from(sections).map((s) => s.id)
      ); // Debug log

      if (sections.length === 0) {
        // Retry after a short delay if no sections found
        setTimeout(setupObserver, 1000);
        return;
      }

      sectionRefs.current = Array.from(sections);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.getAttribute("id");
              console.log("Active section:", sectionId); // Debug log
              setActiveSection(sectionId);
            }
          });
        },
        {
          root: null,
          rootMargin: "-50px 0px -50px 0px",
          threshold: 0.3,
        }
      );

      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.observe(section);
        }
      });

      return () => {
        observer.disconnect();
      };
    };

    const cleanup = setupObserver();
    return cleanup;
  }, []);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    console.log("Clicking on section:", section); // Debug log

    // First try to find the section
    let target = document.getElementById(section);

    if (!target) {
      // If not found, try with different selectors
      target =
        document.querySelector(`section[id="${section}"]`) ||
        document.querySelector(`[data-section="${section}"]`) ||
        document.querySelector(`.${section}-section`);
    }

    console.log("Target element:", target); // Debug log

    if (target) {
      const navHeight = navbarRef.current?.offsetHeight || 80;
      const targetPosition = target.offsetTop - navHeight;

      console.log("Scrolling to position:", targetPosition); // Debug log

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (menuOpen) {
        setMenuOpen(false);
      }
    } else {
      console.error(
        `Section "${section}" not found. Available sections:`,
        Array.from(document.querySelectorAll("section[id], [id]"))
          .map((el) => el.id)
          .filter(Boolean)
      );
    }
  };

  // Alternative navigation method using hash
  const handleHashNavigation = (section) => {
    window.location.hash = section;
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <style>{`

        .glass-nav-block {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          border-left: 1px solid rgba(255, 255, 255, 0.06);
          // box-shadow: 0 7px 10px rgba(255, 255, 255, 0.20);
            // inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .nav-link {
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #0f0c29, #f472b6, #0f0c29);
          // background: linear-gradient(90deg, #0f0c29, #00ffffff, #0f0c29);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
          border-radius: 50%;
        }

        .nav-link.active::before,
        .nav-link:hover::before {
          width: 80%;
        }

        .nav-link.active {
          color: #ffffff;
          text-shadow: 0 0 10px white;
          // background: linear-gradient(135deg, rgba(99, 102, 241, 0.16), rgba(255, 255, 255, 0.04));
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(103, 232, 249, 0.06));
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .logo-ring {
          position: relative;
        }

        .logo-ring::before {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #0891b2, #0e7490);
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: rotate 8s linear infinite;
        }

        .logo-ring:hover::before {
          opacity: 1;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          background:linear-gradient(135deg, #3b0764, #1e1b4b);
          // border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 24px rgba(6, 182, 212, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .cta-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.6s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #4f46e5, #0f172a);
          box-shadow: 0 12px 32px rgba(6, 182, 212, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .mobile-menu-enter {
          animation: slideDownFade 0.3s ease-out forwards;
        }

        @keyframes slideDownFade {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hamburger-line {
          transform-origin: center;
        }

        .text-glow {
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
        }

        .glass-mobile-menu {
          background: rgba(13, 13, 13, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .mobile-nav-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(6, 182, 212, 0.3);
        }

        .mobile-nav-item.active {
          background: rgba(6, 182, 212, 0.15);
          border-color: rgba(6, 182, 212, 0.3);
          color: #06b6d4;
        }
      `}</style>

      <nav
        ref={navbarRef}
        className={`Navbar fixed top-0 left-0 right-0 pt-1 w-full max-w-screen z-50 transition-all duration-300 mx-auto ${
          scrolled ? "navbar-backdrop" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center md:justify-center sm:justify-end h-20">
            {/* Logo */}
            {/* <a
              href="#home"
              className="flex items-center space-x-3 group"
              ref={logoRef}
              onClick={(e) => handleNavClick(e, "home")}
            >
              <div className="logo-ring relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/30 shadow-lg group-hover:border-cyan-400/60 transition-all duration-300">
                  <img
                    src="/profilepic2.png"
                    alt="Santosh Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </a> */}

            {/* <CircularText/> */}

            {/* Desktop Navigation - Glassmorphism Block */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="glass-nav-block rounded-full px-2 py-6 flex items-center space-x-6 h-10">
      {["home", "about", "skills", "contact"].map((section, index) => (
        <a
          key={section}
          href={`#${section}`}
          ref={(el) => (linkRefs.current[index] = el)}
          className={`nav-link px-6 py-1.5 text-sm font-medium capitalize transition-all duration-300 rounded-full ${
            activeSection === section
              ? "active text-cyan-400"
              : "text-white/90 hover:text-white"
          }`}
          onClick={(e) => handleClick(e, section)}
          onMouseEnter={handleHover}
        >
          <span className="sectionName relative z-10 font-extralight">
            {section}
          </span>
        </a>
      ))}

      {/* 🔈 Hidden audio element */}
      <audio ref={audioRef} src="/sounds/click.mp3" preload="auto" />
    </div>

              {/* Enhanced CTA Button */}
              <button
                className="cta-button px-6 py-3 text-sm font-semibold text-white rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-transparent"
                onClick={(e) => {
                        e.preventDefault();
                        const target = document.getElementById("contact");
                        if (target) {
                          target.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get In Touch</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center w-12 h-12 rounded-full text-white hover:text-cyan-400 glass-nav-block transition-all duration-200 hover:scale-105"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`hamburger-line absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                    menuOpen ? "rotate-45 top-2.5" : "top-1"
                  }`}
                />
                <span
                  className={`hamburger-line absolute block w-6 h-0.5 bg-current top-2.5 transition-all duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`hamburger-line absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                    menuOpen ? "-rotate-45 top-2.5" : "top-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mobile-menu-enter">
            <div className="glass-mobile-menu">
              <div className="px-6 py-6 space-y-3">
                {["home", "about", "skills", "contact"].map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    className={`mobile-nav-item block px-6 py-4 text-base font-medium capitalize rounded-2xl transition-all duration-200 ${
                      activeSection === section
                        ? "active"
                        : "text-white/90 hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(section);
                      if (target) {
                        target.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                  >
                    {section}
                  </a>
                ))}
                <div className="pt-4">
                  <button
                    className="cta-button w-full px-6 py-4 text-base font-semibold text-white rounded-2xl transition-all duration-200"
                    onClick={(e) => handleNavClick(e, "contact")}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Get In Touch</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
