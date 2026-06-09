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
    const isMobile = window.innerWidth < 768;
    // Load 75 frames on mobile (step 4), 150 frames on desktop (step 2)
    const frameStep = isMobile ? 4 : 2;
    const framesToLoad = Math.floor(TOTAL_FRAMES / frameStep);
    let loadedCount = 0;
    let handleResize = null;

    // Preload frames based on device
    for (let i = 1; i <= TOTAL_FRAMES; i += frameStep) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoaded(Math.floor((loadedCount / framesToLoad) * 100));
        if (loadedCount === framesToLoad) {
          initAnimation();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === framesToLoad) {
          initAnimation();
        }
      }
      images.current[i] = img;
    }

    const initAnimation = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      const draw = (index) => {
        let frameToDraw = index + 1;
        if (frameToDraw > TOTAL_FRAMES) {
          frameToDraw = TOTAL_FRAMES;
        }

        // On mobile, we skip frames, so snap to the nearest loaded frame
        const nearestLoaded = Math.floor((frameToDraw - 1) / frameStep) * frameStep + 1;
        const img = images.current[nearestLoaded] || images.current[frameToDraw];
        if (!img || !img.complete) return;
        
        // Skip drawing if we are already on this frame (prevents redundant work)
        if (currentFrame.current === index && index !== 0) return;
        currentFrame.current = index;
        
        const cw = canvas.width;
        const ch = canvas.height;
        
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
        
        // No need to clearRect because the image always covers the entire canvas
        // This improves rendering performance significantly
        ctx.drawImage(img, dx, dy, dw, dh);
      };

      handleResize = () => {
        const isMobile = window.innerWidth < 768;
        const dpr = isMobile ? 1 : (window.devicePixelRatio || 1);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = isMobile ? 'low' : 'high';
        // Force redraw on resize
        currentFrame.current = -1;
        draw(Math.max(0, Math.floor(obj.frame || 0)));
      };

      const obj = { frame: 0 };

      handleResize();
      window.addEventListener('resize', handleResize);
      
      let ticking = false;
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8, // Increased scrub interpolates between mouse wheel jumps for a fluid, smooth transition
        animation: gsap.to(obj, {
          frame: TOTAL_FRAMES - 1,
          ease: 'none',
          onUpdate: () => {
            if (!ticking) {
              window.requestAnimationFrame(() => {
                draw(Math.floor(obj.frame));
                ticking = false;
              });
              ticking = true;
            }
          }
        })
      });

      // Text reveal animation with flicker effect
      const isMobileSize = window.innerWidth < 768;
      
      gsap.fromTo(textRef.current, 
        { 
          opacity: 0, 
          x: isMobileSize ? 0 : -30, 
          y: isMobileSize ? 40 : 0,
          scale: isMobileSize ? 0.95 : 1
        }, 
        { 
          opacity: 1, 
          x: 0, 
          y: 0, 
          scale: 1,
          duration: 1.2, 
          delay: 0.5, 
          ease: "power3.out" 
        }
      );
    };

    return () => {
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
      images.current = [];
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[500vh] md:h-[600vh] w-full bg-dark-900 noise-overlay">
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
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end max-w-[1400px] mx-auto px-4 sm:px-6 pt-20 pb-16 lg:pt-24 lg:pb-20">
            <div className="z-20 flex flex-col justify-center h-full pointer-events-auto max-w-2xl w-full">
              <div ref={textRef} className="bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-5 md:p-10 rounded-2xl opacity-0 relative noise-overlay">
                <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Terminal className="text-amber-500 animate-pulse w-6 h-6 md:w-7 md:h-7" />
                    <h1 className="text-amber-500 font-mono text-lg md:text-xl font-bold tracking-widest text-glow-amber">
                      DS-GUPTA v3.5
                    </h1>
                  </div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-cyber-teal rounded-full animate-pulse shadow-[0_0_10px_#00f0ff]"></div>
                </div>
                
                <div className="font-mono text-white/90 space-y-4 md:space-y-5 text-xs sm:text-sm md:text-base leading-relaxed">
                  <p className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-white/10 pb-2">
                    <span className="text-white/50 tracking-wider">IDENTITY:</span> 
                    <span className="text-white font-bold sm:text-right">Dharmesh Gupta</span>
                  </p>
                  <p className="flex flex-col gap-1 border-b border-white/10 pb-2">
                    <span className="text-white/50 tracking-wider">ROLE:</span> 
                    <span className="text-cyber-teal font-semibold text-glow-teal">Python Backend Engineer | AI Infrastructure Enthusiast | GenAI Developer</span>
                  </p>
                  <p className="flex flex-col gap-1 border-b border-white/10 pb-2">
                    <span className="text-white/50 tracking-wider">STACK:</span> 
                    <span className="text-amber-400 leading-snug">Python, Django, FastAPI, PostgreSQL, Docker, RESTful APIs, LangChain, LangGraph, AWS</span>
                  </p>
                  <p className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-white/10 pb-2">
                    <span className="text-white/50 tracking-wider">NETWORK:</span> 
                    <span className="sm:text-right">{linkedinFollowers} Connections</span>
                  </p>
                  <p className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-white/50 tracking-wider">SYSTEM:</span> 
                    <span className="sm:text-right">~$ Awaiting Command_</span>
                  </p>
                  
                  <div className="pt-4 md:pt-6 mt-2 md:mt-4 flex items-center justify-between gap-4">
                    <div className="hidden sm:block">
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
                      className="px-4 py-2 md:px-6 md:py-2.5 w-full sm:w-auto justify-center bg-cyber-teal/10 border border-cyber-teal/50 text-cyber-teal font-mono text-sm hover:bg-cyber-teal hover:text-dark-900 transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] rounded flex items-center gap-2 group cursor-pointer"
                    >
                      <svg className="w-4 h-4 md:w-4.5 md:h-4.5 transform group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
