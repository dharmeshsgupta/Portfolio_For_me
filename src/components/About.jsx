import React from 'react';
import { Terminal, Code2 } from 'lucide-react';
import { SplineScene } from './ui/SplineScene';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-[1400px] mx-auto relative z-20">
      <div className="flex items-center gap-4 mb-16">
        <Terminal className="text-amber-500" size={36} />
        <h2 className="text-4xl font-bold font-mono text-white text-glow-amber tracking-widest uppercase">_ABOUT_ME</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Left Side: Content */}
        <div className="flex flex-col gap-8 justify-center">
          <div className="glass-card p-10 border-white/5 hover:border-amber-500/30 transition-all duration-500 noise-overlay">
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
          </div>
          
          <div className="glass-card p-10 border-white/5 hover:border-cyber-teal/30 transition-all duration-500 noise-overlay">
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
          </div>
        </div>

        {/* Right Side: Spline 3D Scene */}
        <div className="hidden lg:flex relative pointer-events-auto w-full items-center justify-center">
          {/* Use transform to center the off-center camera and scale slightly to fit hands */}
          <div className="absolute inset-0 w-full h-full" style={{ transform: 'scale(0.95) translateX(8%)' }}>
            <SplineScene 
              scene="https://prod.spline.design/EsAtmsAe6pcvQwoj/scene.splinecode" 
              className="w-full h-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
