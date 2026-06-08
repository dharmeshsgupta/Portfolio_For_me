import React from 'react';
import { Terminal, Code2, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplineScene } from './ui/SplineScene';

export default function About() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section id="about" className="py-24 px-6 max-w-[1400px] mx-auto relative z-20">
      
      {/* Mobile Social Links */}
      <div className="sticky top-24 z-50 flex md:hidden items-center justify-center gap-6 mb-12 border border-white/10 p-4 rounded-xl glass-card bg-dark-900/80 backdrop-blur-xl shadow-lg noise-overlay">
        <a href="https://github.com/dharmeshsgupta" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-all">
          <Github size={24} />
        </a>
        <a href="https://www.linkedin.com/in/dharmeshsgupta/" target="_blank" rel="noreferrer" className="text-white/70 hover:text-[#0a66c2] transition-all">
          <Linkedin size={24} />
        </a>
        <a href="https://x.com/dharmeshsgupta" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-all">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
        <a href="https://leetcode.com/u/dharmeshsgupta/" target="_blank" rel="noreferrer" className="text-white/70 hover:text-[#ffa116] transition-all">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a3.758 3.758 0 0 0 .002 5.305l6.087 6.09a3.757 3.757 0 0 0 5.305-.002l9.777-9.777a1.378 1.378 0 0 0-.974-2.351H13.724l2.967-2.967a1.375 1.375 0 0 0-.972-2.348h-2.236V0zm-4.326 12.017a.916.916 0 0 1 .648.268.905.905 0 0 1-.001 1.28l-2.583 2.584a.906.906 0 0 1-1.28-.001.917.917 0 0 1 .001-1.28l2.583-2.583a.916.916 0 0 1 .632-.268z" /></svg>
        </a>
        <a href="https://www.hackerrank.com/profile/dharmeshgupta" target="_blank" rel="noreferrer" className="text-white/70 hover:text-[#2ec866] transition-all">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.162 0h-4.324c-1.107 0-2.003.896-2.003 2.003v2.859c0 1.107.896 2.003 2.003 2.003h1.465v10.27h-1.465c-1.107 0-2.003.896-2.003 2.003v2.859c0 1.107.896 2.003 2.003 2.003h4.324c1.107 0 2.003-.896 2.003-2.003V19.14c0-1.107-.896-2.003-2.003-2.003h-1.465V6.865h1.465c1.107 0 2.003-.896 2.003-2.003V2.003C21.165.896 20.269 0 19.162 0zM9.162 0H4.838C3.731 0 2.835.896 2.835 2.003v2.859c0 1.107.896 2.003 2.003 2.003H6.3v10.27H4.838c-1.107 0-2.003.896-2.003 2.003v2.859c0 1.107.896 2.003 2.003 2.003h4.324c1.107 0 2.003-.896 2.003-2.003V19.14c0-1.107-.896-2.003-2.003-2.003H6.3V6.865H4.838C3.731 6.865 2.835 5.969 2.835 4.862V2.003C2.835.896 3.731 0 4.838 0zm5.676 8.568H9.162v6.865h5.676V8.568z" /></svg>
        </a>
        <a href="https://huggingface.co/dharmeshsgupta" target="_blank" rel="noreferrer" className="text-white/70 hover:text-[#FFD21E] transition-all">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624"/></svg>
        </a>
      </div>

      <div className="flex items-center gap-4 mb-16">
        <Terminal className="text-amber-500" size={36} />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-white text-glow-amber tracking-widest uppercase truncate w-full sm:overflow-visible">_ABOUT_ME</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Left Side: Content */}
        <div className="flex flex-col gap-8 justify-center">
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : false}
            whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="glass-card p-10 border-white/5 hover:border-amber-500/30 transition-all duration-500 noise-overlay"
          >
            <h3 className="text-2xl font-bold text-cyber-teal mb-6 font-mono text-glow-teal">&gt; system.profile.init()</h3>
            <p className="text-white/80 leading-relaxed mb-6 font-sans text-lg">
              I am a <strong className="text-white">Python Backend Engineer</strong> and <strong className="text-white">AI Infrastructure Enthusiast</strong> currently pursuing my B.E. in Computer Engineering. I specialize in architecting highly scalable backend systems and integrating complex Large Language Models (LLMs) to build intelligent Generative AI workflows.
            </p>
            <p className="text-white/70 leading-relaxed mb-10 font-sans">
              My engineering philosophy centers around robust RESTful architecture, containerized microservices, and practical AI implementations that solve real-world logic problems efficiently.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 box-glow-amber animate-pulse"></div>
                <p className="text-white/80">Available for Freelance</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-teal shadow-[0_0_8px_#00f0ff]"></div>
                <p className="text-white/80">Global / Remote</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : false}
            whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: isMobile ? 0.2 : 0 }}
            className="glass-card p-10 border-white/5 hover:border-cyber-teal/30 transition-all duration-500 noise-overlay"
          >
            <div className="flex items-center gap-3 mb-8">
              <Code2 className="text-cyber-teal" size={24} />
              <h3 className="text-xl font-bold text-white font-mono">&gt; root.tech_stack[]</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                'Python', 'Django', 'FastAPI', 'PostgreSQL', 
                'Docker', 'RESTful APIs', 'LangChain', 'LangGraph', 'AWS'
              ].map(tech => (
                <span key={tech} className="px-4 py-2 bg-dark-800/80 border border-white/10 rounded font-mono text-sm text-white/80 hover:text-dark-900 hover:bg-amber-500 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(255,176,0,0.5)] transition-all cursor-crosshair">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Spline 3D Scene (PC Only) */}
        <div className="hidden lg:flex relative pointer-events-auto w-full lg:h-auto items-center justify-center mt-4 lg:mt-0 rounded-2xl lg:rounded-none border border-white/10 lg:border-none bg-black/20 lg:bg-transparent overflow-hidden lg:overflow-visible shadow-lg lg:shadow-none">
          {/* Use transform to center the off-center camera and scale slightly to fit hands */}
          <div className="absolute inset-0 w-full h-full" style={{ transform: 'scale(0.95) translateX(8%)' }}>
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Mobile Lightweight Animation Fallback */}
        <div className="flex lg:hidden w-full justify-center items-center py-8">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="p-8 rounded-full bg-cyber-teal/5 border border-cyber-teal/20 shadow-[0_0_30px_rgba(0,240,255,0.1)]"
          >
            <Code2 size={64} className="text-cyber-teal" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
