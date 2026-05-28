import React, { useState, useEffect } from 'react';
import { Briefcase, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplineScene } from './ui/SplineScene';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/experiences/")
      .then(res => res.json())
      .then(data => setExperiences(data))
      .catch(err => console.error("Error fetching experiences:", err));
  }, []);

  return (
    <section id="experience" className="py-24 px-6 max-w-[1400px] mx-auto relative z-20">
      <div className="flex items-center gap-4 mb-16">
        <Briefcase className="text-amber-500" size={36} />
        <h2 className="text-4xl font-bold font-mono text-white text-glow-amber tracking-widest uppercase">_EXPERIENCE</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Left Side: Content */}
        <div className="flex flex-col">
          <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-10 py-4 h-full flex flex-col gap-10">
            {experiences.slice(0, 2).map((exp, idx) => {
              const isFirst = idx === 0;
              return (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative group h-full"
                >
                  <div className={`absolute -left-[45px] top-4 w-3 h-3 rounded-full box-glow-amber group-hover:scale-150 transition-transform duration-300 ${isFirst ? 'bg-cyber-teal shadow-[0_0_10px_#00f0ff]' : 'bg-amber-500'}`}></div>
                  <div className={`glass-card p-8 border-white/5 transition-all duration-300 noise-overlay h-full flex flex-col ${isFirst ? 'group-hover:border-cyber-teal/40 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]' : 'group-hover:border-amber-500/30 group-hover:shadow-[0_0_25px_rgba(255,176,0,0.2)]'}`}>
                    
                    {isFirst && (
                      <div className="absolute top-0 right-0 bg-cyber-teal/10 border-b border-l border-cyber-teal/30 px-4 py-1 rounded-bl-lg flex items-center gap-2">
                        <Award size={14} className="text-cyber-teal" />
                        <span className="text-cyber-teal font-mono text-xs uppercase tracking-widest">Premium Node</span>
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:animate-pulse">{exp.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                      <p className={`font-mono text-sm tracking-widest uppercase ${isFirst ? 'text-cyber-teal text-glow-teal' : 'text-amber-500 text-glow-amber'}`}>{exp.company}</p>
                      <span className="hidden sm:inline text-white/30">•</span>
                      <p className="text-white/50 font-mono text-xs uppercase tracking-wider">{exp.type}</p>
                    </div>
                    
                    <div className="inline-block self-start px-3 py-1 bg-dark-800/80 border border-white/10 rounded font-mono text-xs text-white/60 mb-6">
                      {exp.duration}
                    </div>
                    
                    <p className="text-white/70 font-sans flex-grow mb-4">
                      {exp.desc}
                    </p>

                    {exp.tech && exp.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                        {exp.tech.map(tag => (
                          <span key={tag} className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-white/50">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {experiences.length > 2 && (
              <div className="flex justify-start mt-4">
                <button 
                  onClick={() => window.portfolioNavigate('/experience')}
                  className="flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-dark-900 transition-all duration-300 font-mono text-sm uppercase rounded shadow-[0_0_15px_rgba(255,176,0,0.15)]"
                >
                  [ACCESS_HISTORY_LOGS] &rarr;
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Spline 3D Scene */}
        <div className="hidden lg:flex relative pointer-events-auto w-full items-center justify-center">
          <div className="absolute inset-0 w-full h-full mix-blend-screen" style={{ transform: 'scale(0.95) translateX(8%)' }}>
            <SplineScene 
              scene="https://prod.spline.design/6PqZ39NqAFy9b0Lj/scene.splinecode" 
              className="w-full h-full"
              onLoad={(spline) => {
                const objects = spline.getAllObjects();
                objects.forEach(obj => {
                  // Hide any objects that look like text based on name or type
                  if (
                    (obj.type && obj.type.toLowerCase() === 'text') ||
                    (obj.name && (
                      obj.name.toLowerCase().includes('text') ||
                      obj.name.includes('Building') ||
                      obj.name.includes('xperiences') ||
                      obj.name.includes('Crafting') ||
                      obj.name.includes('Resources') ||
                      obj.name.includes('Contact') ||
                      obj.name.includes('MOTION')
                    ))
                  ) {
                    obj.visible = false;
                    // Fallback to scaling to 0 just in case visible=false isn't enough
                    if (obj.scale) {
                      obj.scale.x = 0;
                      obj.scale.y = 0;
                      obj.scale.z = 0;
                    }
                  }
                });
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
