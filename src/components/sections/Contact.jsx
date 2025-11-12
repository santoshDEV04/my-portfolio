import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveGlobe from "./InteractiveGlobe.jsx";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Globe,
  Smartphone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ID = "service_r4xsdbv";
const TEMPLATE_ID = "template_qdqhala";
const PUBLIC_KEY = "O91k9fxpvU7_AB5js";

const ContactSection = () => {
  const formRef = useRef();
  const sectionRef = useRef();
  const headingRef = useRef();
  const globeRef = useRef();
  const placeholderRef = useRef();

  const [status, setStatus] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const handlesubmitSound = useRef(new Audio("/sounds/messagesent.mp3"));

  // ✅ Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        window.innerWidth <= 1024 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ GSAP Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      }
    );

    // Animate form
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // Animate globe or placeholder
    if (!isMobile && globeRef.current) {
      gsap.fromTo(
        globeRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: globeRef.current,
            start: "top 85%",
          },
        }
      );
    } else if (isMobile && placeholderRef.current) {
      gsap.fromTo(
        placeholderRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: placeholderRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, [isMobile]);

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        formRef.current.reset();

        if (handlesubmitSound?.current) {
          handlesubmitSound.current.currentTime = 0;
          handlesubmitSound.current.volume = 1;
          handlesubmitSound.current.play().catch((err) =>
            console.log("Error Playing Sound:", err)
          );
        }

        // Animate success message
        gsap.fromTo(
          ".success-message",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      })
      .catch(() => {
        setStatus("error");
        gsap.fromTo(
          ".error-message",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen w-full px-6 sm:px-8 py-16 flex flex-col justify-center items-center text-white relative z-1 bg-transparent"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="absolute top-20 text-4xl sm:text-5xl font-extrabold leading-tight text-white"
      >
        CONTACT ME
      </h2>

      <div
        className={`w-full max-w-6xl mt-36 flex ${
          isMobile ? "flex-col" : "flex-col-reverse lg:flex-row"
        } items-center justify-center gap-12 lg:gap-20`}
      >
        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-gradient-to-br from-black via-purple-900 to-black border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col gap-5 opacity-0"
        >
          <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
            <User size={18} className="text-purple-400" />
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              required
              className="w-full bg-transparent text-white placeholder:text-gray-300 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
            <Mail size={18} className="text-cyan-400" />
            <input
              type="email"
              name="reply_to"
              placeholder="Your Email"
              required
              className="w-full bg-transparent text-white placeholder:text-gray-300 focus:outline-none"
            />
          </div>

          <div className="flex items-start gap-3 bg-white/10 rounded-lg px-4 py-3">
            <MessageSquare size={18} className="text-pink-400 mt-1" />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={4}
              className="w-full bg-transparent text-white placeholder:text-gray-300 resize-none focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
          >
            <div className="flex items-center gap-2 justify-center">
              <Send size={18} /> Send Message
            </div>
          </button>

          {status === "success" && (
            <p className="success-message flex items-center gap-2 text-green-400 text-sm mt-3 opacity-0">
              <CheckCircle size={16} /> Your message has been sent!
            </p>
          )}

          {status === "error" && (
            <p className="error-message flex items-center gap-2 text-red-400 text-sm mt-3 opacity-0">
              <AlertCircle size={16} /> Something went wrong. Try again.
            </p>
          )}
        </form>

        {/* Globe or Mobile Placeholder */}
        {!isMobile ? (
          <div
            ref={globeRef}
            className="w-full flex justify-center items-center opacity-0"
          >
            <div className="relative">
              <InteractiveGlobe/>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <div className="absolute bottom-8 right-8 w-1 h-1 bg-pink-400 rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={placeholderRef}
            className="w-full flex justify-center items-center opacity-0"
          >
            <div className="relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Globe size={48} className="text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white">Let's Connect</h3>
              <p className="text-gray-400 text-sm max-w-xs text-center">
                Ready to collaborate on your next project? Drop me a message!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-specific note */}
      {isMobile && (
        <div className="mt-8 flex items-center gap-2 text-gray-500 text-xs opacity-0">
          <Smartphone size={30} />
        </div>
      )}
    </section>
  );
};

export default ContactSection;
