import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Github, Film, X } from 'lucide-react';
import { QuantumAttractor } from './ui/QuantumAttractor';

export default function AllProjectsView() {
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
    <div className="bg-dark-900 min-h-screen text-white font-sans selection:bg-amber-500/30 selection:text-amber-200 relative pb-24">
      {/* Background visual overlay */}
      <div className="absolute inset-0 z-0 bg-dark-900/95 noise-overlay pointer-events-none" />

      {/* Header */}
      <header className="max-w-[1400px] mx-auto px-6 pt-12 flex justify-between items-center relative z-20">
        <button 
          onClick={() => window.portfolioNavigate('/')}
          className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 text-white/70 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 font-mono text-sm uppercase rounded shadow-[0_0_15px_rgba(0,0,0,0.4)]"
        >
          <ArrowLeft size={16} />
          [back_to_core]
        </button>
        <span className="text-white/20 font-mono text-xs tracking-widest uppercase hidden md:inline">
          SYSTEM_ARCHIVE_FILE // PROJECTS
        </span>
      </header>

      <section className="py-16 px-6 max-w-[1400px] mx-auto relative z-20">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-16 border-b border-white/5 pb-8">
          <h2 className="text-4xl font-bold font-mono text-white text-glow-amber tracking-widest uppercase">_PROJECTS_ARCHIVE</h2>
          <span className="text-cyber-teal font-mono text-xs px-3 py-1 bg-cyber-teal/10 border border-cyber-teal/20 rounded uppercase tracking-wider md:self-center">
            {projects.length} ACTIVE_VECTORS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Grid List */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div key={proj.id} className="glass-card group p-1 flex flex-col border-white/5 hover:border-amber-500/40 transition-all duration-500 noise-overlay">
                <div className="bg-dark-900/40 p-8 rounded-[14px] h-full flex flex-col justify-between backdrop-blur-md min-h-[350px]">
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
                            <Film size={20} />
                          </button>
                        )}
                        <a href={proj.github} className="text-white/40 hover:text-white transition-colors" target="_blank" rel="noreferrer"><Github size={20} /></a>
                        <a href={proj.link} className="text-white/40 hover:text-amber-400 transition-colors" target="_blank" rel="noreferrer"><ExternalLink size={20} /></a>
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
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/50">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Attractor Card */}
          <div className="lg:sticky lg:top-8 hidden lg:flex w-full items-center justify-center">
            <QuantumAttractor />
          </div>
        </div>
      </section>

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
    </div>
  );
}
