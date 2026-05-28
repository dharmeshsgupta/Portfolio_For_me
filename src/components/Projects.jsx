import React, { useState, useEffect } from 'react';
import { Code, ExternalLink, Github, Film, X } from 'lucide-react';
import { QuantumAttractor } from './ui/QuantumAttractor';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    try {
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        return `https://www.youtube.com/embed/${urlParams.get('v')}`;
      } else if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${id}`;
      } else if (url.includes('youtube.com/embed/')) {
        return url;
      }
    } catch (e) {
      console.error(e);
    }
    return url;
  };

  return (
    <section id="projects" className="py-24 px-6 max-w-[1400px] mx-auto relative z-20">
      <div className="flex items-center gap-4 mb-16">
        <Code className="text-amber-500" size={36} />
        <h2 className="text-4xl font-bold font-mono text-white text-glow-amber tracking-widest uppercase">_PUBLISHED_PROJECTS</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Left Side: Quantum Attractor 3D Canvas */}
        <div className="hidden lg:flex relative pointer-events-auto w-full items-center justify-center">
          <div className="absolute inset-0 w-full h-full" style={{ transform: 'scale(0.95) translateX(8%)' }}>
            <QuantumAttractor />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-10 justify-between">
          <div className="flex flex-col gap-10">
            {projects.slice(0, 2).map((proj) => (
              <div key={proj.id} className="glass-card group p-1 flex flex-col h-full border-white/5 hover:border-amber-500/40 transition-all duration-500 noise-overlay">
                <div className="bg-dark-900/40 p-8 rounded-[14px] h-full flex flex-col backdrop-blur-md justify-between min-h-[300px]">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-cyber-teal font-mono text-xs mb-3 tracking-widest uppercase text-glow-teal">{proj.type}</p>
                        <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">{proj.title}</h3>
                      </div>
                      <div className="flex gap-4 items-center">
                        {proj.video_link && (
                          <button
                            onClick={() => setActiveVideo(proj.video_link)}
                            className="text-white/40 hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all cursor-pointer"
                            title="Watch Demo Video"
                          >
                            <Film size={22} />
                          </button>
                        )}
                        <a href={proj.github} className="text-white/40 hover:text-white transition-colors" target="_blank" rel="noreferrer"><Github size={22} /></a>
                        <a href={proj.link} className="text-white/40 hover:text-amber-400 transition-colors" target="_blank" rel="noreferrer"><ExternalLink size={22} /></a>
                      </div>
                    </div>
                    <p className="text-white/70 mb-8 font-sans leading-relaxed text-sm">{proj.desc}</p>
                  </div>
                  
                  <div className="mt-auto">
                    {/* Action buttons (Video Demo trigger if link exists) */}
                    {proj.video_link && (
                      <button
                        onClick={() => setActiveVideo(proj.video_link)}
                        className="mb-6 flex items-center gap-2 text-xs font-mono px-4 py-2 bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-dark-900 transition-all duration-300 rounded"
                      >
                        <Film size={14} />
                        [WATCH_DEMO_VIDEO]
                      </button>
                    )}

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                      {proj.tech.map(t => (
                        <span key={t} className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded text-white/50">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {projects.length > 2 && (
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => window.portfolioNavigate('/projects')}
                className="flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-dark-900 transition-all duration-300 font-mono text-sm uppercase rounded shadow-[0_0_15px_rgba(255,176,0,0.15)]"
              >
                [ACCESS_ARCHIVE_PROTOCOL] &rarr;
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6">
          <div className="relative w-full max-w-4xl bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,176,0,0.2)]">
            <button 
              onClick={() => setActiveVideo(null)} 
              className="absolute top-4 right-4 z-50 text-white/70 hover:text-white bg-black/40 p-2.5 rounded-full hover:bg-black/60 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="aspect-video w-full bg-black">
              {activeVideo.includes('youtube.com') || activeVideo.includes('youtu.be') ? (
                <iframe 
                  src={getYouTubeEmbedUrl(activeVideo)} 
                  className="w-full h-full border-0" 
                  allowFullScreen 
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <video src={activeVideo} className="w-full h-full" controls autoPlay />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
