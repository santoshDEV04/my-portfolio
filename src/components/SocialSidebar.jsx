import React from 'react';
import { motion } from 'framer-motion';

import linkedinIcon from '../assets/linkedIn.svg';
import leetcodeIcon from '../assets/leetcode.svg';
import githubIcon from '../assets/Git.svg';


const socials = [
  {
    href: 'https://www.linkedin.com/in/santosh-kumar-dash-417a30274/',
    src: linkedinIcon,
    alt: 'LinkedIn',
    color: '#0A66C2',
  },
  {
    href: 'https://leetcode.com/u/4S56N4XzgO/',
    src: leetcodeIcon,
    alt: 'LeetCode',
    color: '#FFA116',
  },
  {
    href: 'https://github.com/santoshDEV04',
    src: githubIcon,
    alt: 'GitHub',
    color: '#fff',
  },
];

const SocialSidebar = () => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 p-3 bg-transparent backdrop-blur-md rounded-2xl shadow-2xl">
      {socials.map(({ href, src, alt, color }, index) => (
        <motion.a
          key={alt}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration:0.1, ease: 'anticipate' }}
          whileHover={{
            scale: 1.2,
            rotate: 5,
            boxShadow: `0px 0px 12px ${color}`,
          }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 p-1.5 bg-gradient-to-bl from-purple-600 to-blue-600 hover:bg-black/60 rounded-full flex items-center justify-center transition-all duration-300"
        >
          <img src={src} alt={alt} className="w-full h-full object-contain" />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialSidebar;
