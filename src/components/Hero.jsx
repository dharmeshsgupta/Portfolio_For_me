import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 300;

export default function Hero({ linkedinFollowers, resumeUrl }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [loaded, setLoaded] = useState(0);
  const images = useRef([]);
  const currentFrame = useRef(0);

  useEffect(() => {
    // Preload all frames
    let loadedCount = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoaded(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          initAnimation();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          initAnimation();
        }
      }
      images.current.push(img);
    }

    const initAnimation = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      const setCanvasSize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        draw(currentFrame.current);
      };

      const draw = (index) => {
        const img = images.current[index];
        if (!img || !img.complete) return;
        currentFrame.current = index;
        const cw = canvas.width;
        const ch = canvas.height;
        ctx.clearRect(0, 0, cw, ch);
        
        // Cover-fit
        const sr = img.width / img.height;
        const cr = cw / ch;
        let dw, dh, dx, dy;
        if (sr > cr) {
          dh = ch;
          dw = ch * sr;
          dx = (cw - dw) / 2;
          dy = 0;
        } else {
          dw = cw;
          dh = cw / sr;
          dx = 0;
          dy = (ch - dh) / 2;
        }
        ctx.drawImage(img, dx, dy, dw, dh);
      };

      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);

      const obj = { frame: 0 };
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        animation: gsap.to(obj, {
          frame: TOTAL_FRAMES - 1,
          snap: 'frame',
          ease: 'none',
          onUpdate: () => draw(Math.floor(obj.frame))
        })
      });

      // Text reveal animation with flicker effect
      gsap.fromTo(textRef.current, 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 1.2, delay: 0.5, ease: "power2.out" }
      );
    };

    return () => {
      window.removeEventListener('resize', () => {});
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-dark-900 noise-overlay">
      {/* Z-0: Fixed Canvas Background with CRT vignette */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 vignette">
        {loaded < 100 && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-dark-900 text-amber-500 font-mono text-xl">
            SYSTEM_BOOT... {loaded}%
          </div>
        )}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover scanlines opacity-100" />
        {/* Frost Ice overlay - lighter to see frames clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-dark-900/95 pointer-events-none" />
        
        {/* Z-20: Text Terminal */}
        <div className="absolute inset-0 flex items-center justify-end max-w-[1400px] mx-auto px-6 pt-24 pb-20">
            <div className="z-20 flex flex-col justify-center h-full pointer-events-auto max-w-2xl w-full">
              <div ref={textRef} className="bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-8 md:p-10 rounded-2xl opacity-0 relative noise-overlay">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Terminal className="text-amber-500 animate-pulse" size={28} />
                    <h1 className="text-amber-500 font-mono text-xl font-bold tracking-widest text-glow-amber">
                      DS-GUPTA v3.5
                    </h1>
                  </div>
                  <div className="w-3 h-3 bg-cyber-teal rounded-full animate-pulse shadow-[0_0_10px_#00f0ff]"></div>
                </div>
                
                <div className="font-mono text-white/90 space-y-5 text-sm md:text-base leading-relaxed">
                  <p className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50 tracking-wider">IDENTITY:</span> 
                    <span className="text-white font-bold">Dharmesh Gupta</span>
                  </p>
                  <p className="flex flex-col gap-1 border-b border-white/10 pb-2">
                    <span className="text-white/50 tracking-wider">ROLE:</span> 
                    <span className="text-cyber-teal font-semibold text-glow-teal">Python Backend Engineer | AI Infrastructure Enthusiast | GenAI Developer</span>
                  </p>
                  <p className="flex flex-col gap-1 border-b border-white/10 pb-2">
                    <span className="text-white/50 tracking-wider">STACK:</span> 
                    <span className="text-amber-400">Python, Django, FastAPI, PostgreSQL, Docker, RESTful APIs, LangChain, LangGraph, AWS</span>
                  </p>
                  <p className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50 tracking-wider">NETWORK:</span> 
                    <span>{linkedinFollowers} Connections</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-white/50 tracking-wider">SYSTEM:</span> 
                    <span>~$ Awaiting Command_</span>
                  </p>
                  
                  <div className="pt-6 mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-white/50 mb-2 font-sans tracking-widest uppercase text-xs">Execute Sequence</p>
                      <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-transparent rounded"></div>
                    </div>
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
                      className="px-6 py-2.5 bg-cyber-teal/10 border border-cyber-teal/50 text-cyber-teal font-mono text-sm hover:bg-cyber-teal hover:text-dark-900 transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] rounded flex items-center gap-2 group cursor-pointer"
                    >
                      <svg className="w-4.5 h-4.5 transform group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      Download CV
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
