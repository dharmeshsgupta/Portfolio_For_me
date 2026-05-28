import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Terminal } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ resumeUrl }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-black/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <Terminal className="text-amber-500 group-hover:text-amber-400 transition-colors" size={28} />
          <span className="font-mono font-bold text-xl tracking-tight text-white group-hover:text-amber-100 transition-colors">
            DS-GUPTA<span className="text-amber-500">_</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6 text-sm font-medium font-sans">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-white/70 hover:text-amber-400 transition-colors relative group">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 pl-6 border-l border-white/10">
            <a
              href="https://github.com/dharmeshsgupta"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/dharmeshsgupta/"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-[#0a66c2] hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.8)] transition-all"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://leetcode.com/u/dharmeshgupta/"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-[#ffa116] hover:drop-shadow-[0_0_8px_rgba(255,161,22,0.8)] transition-all"
              title="LeetCode"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a3.758 3.758 0 0 0 .002 5.305l6.087 6.09a3.757 3.757 0 0 0 5.305-.002l9.777-9.777a1.378 1.378 0 0 0-.974-2.351H13.724l2.967-2.967a1.375 1.375 0 0 0-.972-2.348h-2.236V0zm-4.326 12.017a.916.916 0 0 1 .648.268.905.905 0 0 1-.001 1.28l-2.583 2.584a.906.906 0 0 1-1.28-.001.917.917 0 0 1 .001-1.28l2.583-2.583a.916.916 0 0 1 .632-.268z" />
              </svg>
            </a>
            <a
              href="https://x.com/dharmeshsgupta"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all"
              title="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.hackerrank.com/profile/dharmeshgupta"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-[#2ec866] hover:drop-shadow-[0_0_8px_rgba(46,200,102,0.8)] transition-all"
              title="HackerRank"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M19.162 0h-4.324c-1.107 0-2.003.896-2.003 2.003v2.859c0 1.107.896 2.003 2.003 2.003h1.465v10.27h-1.465c-1.107 0-2.003.896-2.003 2.003v2.859c0 1.107.896 2.003 2.003 2.003h4.324c1.107 0 2.003-.896 2.003-2.003V19.14c0-1.107-.896-2.003-2.003-2.003h-1.465V6.865h1.465c1.107 0 2.003-.896 2.003-2.003V2.003C21.165.896 20.269 0 19.162 0zM9.162 0H4.838C3.731 0 2.835.896 2.835 2.003v2.859c0 1.107.896 2.003 2.003 2.003H6.3v10.27H4.838c-1.107 0-2.003.896-2.003 2.003v2.859c0 1.107.896 2.003 2.003 2.003h4.324c1.107 0 2.003-.896 2.003-2.003V19.14c0-1.107-.896-2.003-2.003-2.003H6.3V6.865H4.838C3.731 6.865 2.835 5.969 2.835 4.862V2.003C2.835.896 3.731 0 4.838 0zm5.676 8.568H9.162v6.865h5.676V8.568z" />
              </svg>
            </a>
            <a
              href={resumeUrl || '#contact'}
              target={resumeUrl ? "_blank" : "_self"}
              rel="noreferrer"
              onClick={(e) => {
                if (!resumeUrl) {
                  alert("No CV uploaded yet! Please upload one from the Admin Panel (http://localhost:8000/admin/), or get in touch via the Contact section.");
                }
              }}
              download={!!resumeUrl}
              className="px-4 py-2 border border-white/20 text-white/80 font-mono text-sm hover:border-amber-500/50 hover:text-amber-400 transition-all rounded flex items-center gap-1.5 cursor-pointer"
              title="Download CV"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              CV
            </a>
            <a href="#contact" className="ml-2 px-5 py-2 bg-amber-500/10 border border-amber-500/50 text-amber-400 font-mono text-sm hover:bg-amber-500 hover:text-dark-900 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] rounded">
              Hire Me
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-panel border-t-0 flex flex-col py-6 px-6 space-y-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white/80 hover:text-amber-400 font-mono text-lg border-b border-white/5 pb-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a
            href={resumeUrl || '#contact'}
            target={resumeUrl ? "_blank" : "_self"}
            rel="noreferrer"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (!resumeUrl) {
                alert("No CV uploaded yet! Please upload one from the Admin Panel (http://localhost:8000/admin/), or get in touch via the Contact section.");
              }
            }}
            download={!!resumeUrl}
            className="w-full text-center px-4 py-2.5 bg-amber-500/10 border border-amber-500/50 text-amber-400 font-mono text-sm hover:bg-amber-500 hover:text-dark-900 transition-all rounded flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Download CV
          </a>
        </div>
      )}
    </nav>
  );
}
