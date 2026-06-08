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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-white/5 ${isScrolled ? 'bg-dark-900/60 py-3 md:py-4 shadow-lg shadow-black/20' : 'bg-dark-900/20 py-4 md:py-6'}`}>
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
              href="https://leetcode.com/u/dharmeshsgupta/"
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
              href="https://huggingface.co/dharmeshsgupta"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-[#FFD21E] hover:drop-shadow-[0_0_8px_rgba(255,210,30,0.8)] transition-all"
              title="Hugging Face"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624"/>
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
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded text-white hover:bg-white/10 transition-colors"
          >
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-amber-500">
              {mobileMenuOpen ? 'CLOSE' : 'MENU'}
            </span>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-900/95 backdrop-blur-xl border-b border-white/10 flex flex-col py-6 px-6 space-y-4 shadow-xl">
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
