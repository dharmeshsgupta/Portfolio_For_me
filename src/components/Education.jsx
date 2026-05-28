import React from 'react';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplineScene } from './ui/SplineScene';

const educationData = [
  {
    degree: "Bachelor of Engineering, Computer Engineering",
    institution: "Gujarat Technological University (GTU) / Pacific School of Engineering - India",
    timeline: "Jul 2024 – Jul 2028",
    tags: ["FastAPI", "RESTful architecture", "C (Programming Language)"],
    highlight: true
  },
  {
    degree: "Certification Course (Social impact amongst global family)",
    institution: "Aspire Institute",
    timeline: "Aug 2024 – Nov 2024",
    tags: ["Leadership"],
    highlight: false
  },
  {
    degree: "Higher Secondary (+2, PCM)",
    institution: "T. & T. V. Sarvajanik High School",
    timeline: "2022 – 2024",
    tags: [],
    highlight: false
  },
  {
    degree: "High School Diploma",
    institution: "Matrubhumi Vidhyalay",
    timeline: "2016 – 2022",
    metrics: "Grade: 83",
    tags: [],
    highlight: false
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 max-w-[1400px] mx-auto relative z-20">
      <div className="flex items-center gap-4 mb-16">
        <BookOpen className="text-amber-500" size={36} />
        <h2 className="text-4xl font-bold font-mono text-white text-glow-amber tracking-widest uppercase">_EDUCATION</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Left Side: Spline 3D Scene */}
        <div className="hidden lg:flex relative pointer-events-auto w-full items-center justify-center">
          <div className="absolute inset-0 w-full h-full" style={{ transform: 'scale(0.95) translateX(8%)' }}>
            <SplineScene 
              scene="https://prod.spline.design/chKpx13TprStMwtB/scene.splinecode" 
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col">
          <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-10 py-4 h-full flex flex-col gap-10">
            {educationData.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative group h-full"
              >
                <div className={`absolute -left-[45px] top-4 w-3 h-3 rounded-full box-glow-amber group-hover:scale-150 transition-transform duration-300 ${edu.highlight ? 'bg-amber-500 shadow-[0_0_10px_#ffb000]' : 'bg-dark-900 border-2 border-amber-500'}`}></div>
                <div className={`glass-card p-8 border-white/5 transition-all duration-300 noise-overlay h-full flex flex-col group-hover:border-amber-500/30 group-hover:shadow-[0_0_25px_rgba(255,176,0,0.2)]`}>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:animate-pulse">{edu.degree}</h3>
                  <p className={`font-mono text-sm tracking-widest uppercase mb-4 ${edu.highlight ? 'text-amber-500 text-glow-amber' : 'text-cyber-teal'}`}>
                    {edu.institution}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="inline-block px-3 py-1 bg-dark-800/80 border border-white/10 rounded font-mono text-xs text-white/60">
                      {edu.timeline}
                    </div>
                    {edu.metrics && (
                      <div className="inline-block px-3 py-1 bg-cyber-teal/10 border border-cyber-teal/30 rounded font-mono text-xs text-cyber-teal font-bold">
                        {edu.metrics}
                      </div>
                    )}
                  </div>
                  
                  {edu.tags && edu.tags.length > 0 && (
                    <div className="mt-auto pt-4 border-t border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {edu.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/60 font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
