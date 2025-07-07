import { useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import up from "../../assets/up.svg";

const socials = [
  {
    icon: <FaGithub />,
    href: "https://github.com/santoshDEV04",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/santosh-kumar-dash-417a30274/",
    label: "LinkedIn",
  },
  { icon: <FaEnvelope />, href: "mailto:dashsantosh1333@gmail.com", label: "Email" },
];

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={ref}
      className="w-full bg-gradient-to-t from-purple-800/50 via-transparent to-transparent text-white px-4 sm:px-6 pt-16 pb-12 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-6"
      >
        {/* <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Let’s build something amazing together
        </h3> */}

        <div className="flex gap-6">
          {socials.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-2xl p-3 rounded-full bg-white/5 
                         transition-all duration-300 hover:scale-110 
                         hover:ring-2 hover:ring-purple-500 hover:bg-purple-600/30"
            >
              {icon}
            </a>
          ))}
        </div>

        <p className="text-sm text-gray-400 mt-2">
          Made with <span className="text-red-400 ">❤️</span> by Santosh Kumar Dash
        </p>

        <div className="w-full h-px mt-6 bg-gradient-to-r from-trasnparent via-purple-100 to-transparent opacity-100" />

        <p className="text-sm text-gray-500 mt-2">
          &copy; {new Date().getFullYear()} Santosh Kumar Dash. All rights reserved.
        </p>
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full 
                   bg-gradient-to-r from-pink-600 via-purple-700 to-blue-700 
                   backdrop-blur-md shadow-xl 
                   hover:shadow-purple-500/50 transition-all duration-300"
      >
        <img src={up} alt="Scroll to top" className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default FooterSection;
