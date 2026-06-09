import React, { useState, useEffect } from 'react';
import { Mail, Send, Github, Linkedin, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { QuantumTransmission } from './ui/QuantumTransmission';

export default function Contact() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [linkedinFollowers, setLinkedinFollowers] = useState("12,300+");
  
  // Form states
  const [inquiryType, setInquiryType] = useState('HIRE'); // 'HIRE' or 'FREELANCE'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Hire-specific states
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  
  // Freelance-specific states
  const [projectDomain, setProjectDomain] = useState('');
  const [budgetScope, setBudgetScope] = useState('$2k-$5k');

  const [submitStatus, setSubmitStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const [responseMsg, setResponseMsg] = useState('');

  useEffect(() => {
    fetch("https://guptadharmesh.pythonanywhere.com/api/stats/")
      .then((res) => res.json())
      .then((data) => {
        if (data.linkedin_followers) {
          setLinkedinFollowers(data.linkedin_followers);
        }
      })
      .catch((err) => console.log("Using fallback follower stats:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitStatus('error');
      setResponseMsg('Identity, Transmission Path, and Payload fields are required.');
      return;
    }

    if (inquiryType === 'HIRE' && (!company.trim() || !jobTitle.trim())) {
      setSubmitStatus('error');
      setResponseMsg('Company and Target Position are required for HIRE protocol.');
      return;
    }

    if (inquiryType === 'FREELANCE' && (!projectDomain.trim() || !budgetScope)) {
      setSubmitStatus('error');
      setResponseMsg('Project Domain and Budget Scope are required for FREELANCE protocol.');
      return;
    }

    setSubmitStatus('submitting');
    setResponseMsg('');

    try {
      const res = await fetch("https://guptadharmesh.pythonanywhere.com/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          inquiry_type: inquiryType,
          message: message.trim(),
          company: inquiryType === 'HIRE' ? company.trim() : '',
          job_title: inquiryType === 'HIRE' ? jobTitle.trim() : '',
          project_domain: inquiryType === 'FREELANCE' ? projectDomain.trim() : '',
          budget_scope: inquiryType === 'FREELANCE' ? budgetScope : ''
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Transmission packet lost.');
      }

      setSubmitStatus('success');
      setResponseMsg(data.message || 'Transmission executed successfully.');
      
      // Clear inputs
      setName('');
      setEmail('');
      setMessage('');
      setCompany('');
      setJobTitle('');
      setProjectDomain('');
      setBudgetScope('$2k-$5k');
    } catch (err) {
      setSubmitStatus('error');
      setResponseMsg(err.message || 'System fault: Connection link failed.');
    }
  };

  const isHire = inquiryType === 'HIRE';
  const accentColor = isHire ? 'amber-500' : 'cyber-teal';
  const textAccentClass = isHire ? 'text-amber-500' : 'text-cyber-teal';
  const bgAccentClass = isHire ? 'bg-amber-500' : 'bg-cyber-teal';
  const borderAccentClass = isHire ? 'border-amber-500' : 'border-cyber-teal';
  const focusBorderClass = isHire ? 'focus:border-amber-500 focus:ring-amber-500' : 'focus:border-cyber-teal focus:ring-cyber-teal';
  const glowShadowClass = isHire ? 'shadow-[0_0_20px_rgba(255,176,0,0.3)]' : 'shadow-[0_0_20px_rgba(0,240,255,0.3)]';

  return (
    <section id="contact" className="py-24 px-6 max-w-[1400px] mx-auto relative z-20">
      <div className="flex items-center gap-4 mb-16">
        <Terminal className="text-amber-500" size={36} />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-white text-glow-amber tracking-widest uppercase truncate w-full sm:overflow-visible">_INITIATE_CONTACT</h2>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Left Side: Content */}
        <div className="flex flex-col gap-8 h-full">
          {/* Contact Info */}
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : false}
            whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="glass-card p-10 border-white/5 noise-overlay"
          >
            <h3 className="text-2xl font-bold text-white mb-8">System Communications</h3>
            <div className="space-y-8">
              <a href="mailto:dharmeshgupta.r@gmail.com" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all">
                  <Mail className="text-white/70 group-hover:text-amber-400 transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-1">Direct Protocol</p>
                  <p className="text-white font-sans font-medium text-lg group-hover:text-amber-400 transition-colors">dharmeshgupta.r@gmail.com</p>
                </div>
              </a>
              
              <a href="https://github.com/dharmeshgupta" target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyber-teal/50 group-hover:bg-cyber-teal/10 transition-all">
                  <Github className="text-white/70 group-hover:text-cyber-teal transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-1">Source Repositories</p>
                  <p className="text-white font-sans font-medium text-lg group-hover:text-cyber-teal transition-colors">github.com/dharmeshgupta</p>
                </div>
              </a>
              
              <a href="#" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#0a66c2]/50 group-hover:bg-[#0a66c2]/10 transition-all">
                  <Linkedin className="text-white/70 group-hover:text-[#0a66c2] transition-colors" size={24} />
                </div>
                <div>
                  <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-1">Professional Network</p>
                  <p className="text-white font-sans font-medium text-lg group-hover:text-[#0a66c2] transition-colors">{linkedinFollowers} Engineering Community</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : false}
            whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: isMobile ? 0.2 : 0 }}
            className={`glass-panel p-10 rounded-2xl border-t-4 transition-all duration-500 ${borderAccentClass} shadow-2xl relative overflow-hidden noise-overlay flex-grow`}
          >
            {/* Decorative corner accents */}
            <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 transition-all duration-500 ${isHire ? 'border-amber-500/50' : 'border-cyber-teal/50'}`}></div>
            <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 transition-all duration-500 ${isHire ? 'border-amber-500/50' : 'border-cyber-teal/50'}`}></div>
            
            <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col justify-between">
              <div className="space-y-6">
                
                {/* Dual Contact Mode Toggle */}
                <div className="space-y-2">
                  <label className={`font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-500 ${textAccentClass}`}>
                    <span className={`w-2 h-2 rounded-full transition-all duration-500 ${bgAccentClass} ${isHire ? 'box-glow-amber' : 'shadow-[0_0_10px_#00f0ff]'}`}></span> Contact Protocol
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setInquiryType('HIRE')}
                      className={`py-3 px-4 rounded-lg font-mono text-xs uppercase border transition-all duration-300 ${isHire ? 'bg-amber-500 text-dark-900 border-amber-500 font-bold shadow-[0_0_15px_rgba(255,176,0,0.25)]' : 'bg-dark-900/50 text-white/60 border-white/10 hover:border-white/30 hover:text-white'}`}
                    >
                      [HIRE_PROTOCOL]
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('FREELANCE')}
                      className={`py-3 px-4 rounded-lg font-mono text-xs uppercase border transition-all duration-300 ${!isHire ? 'bg-cyber-teal text-dark-900 border-cyber-teal font-bold shadow-[0_0_15px_rgba(0,240,255,0.25)]' : 'bg-dark-900/50 text-white/60 border-white/10 hover:border-white/30 hover:text-white'}`}
                    >
                      [FREELANCE_PROJECT]
                    </button>
                  </div>
                </div>

                {/* Identity Name Input */}
                <div className="space-y-2">
                  <label className={`font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-500 ${textAccentClass}`}>
                    <span className={`w-2 h-2 rounded-full transition-all duration-500 ${bgAccentClass}`}></span> Identity
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={submitStatus === 'submitting'}
                    className={`w-full bg-dark-900/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none transition-all font-mono text-sm placeholder:text-white/20 ${focusBorderClass}`} 
                    placeholder="[enter_name]" 
                  />
                </div>

                {/* Dynamic Fields: Company & Job Title for HIRE Protocol */}
                {isHire && (
                  <>
                    <div className="space-y-2">
                      <label className="text-amber-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full box-glow-amber"></span> Company / Organization
                      </label>
                      <input 
                        type="text" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        disabled={submitStatus === 'submitting'}
                        className={`w-full bg-dark-900/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none transition-all font-mono text-sm placeholder:text-white/20 ${focusBorderClass}`} 
                        placeholder="[enter_company_name]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-amber-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full box-glow-amber"></span> Target Position / Role
                      </label>
                      <input 
                        type="text" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        disabled={submitStatus === 'submitting'}
                        className={`w-full bg-dark-900/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none transition-all font-mono text-sm placeholder:text-white/20 ${focusBorderClass}`} 
                        placeholder="[enter_target_role]" 
                      />
                    </div>
                  </>
                )}

                {/* Dynamic Fields: Project Domain & Budget Select for FREELANCE Protocol */}
                {!isHire && (
                  <>
                    <div className="space-y-2">
                      <label className="text-cyber-teal font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyber-teal rounded-full shadow-[0_0_10px_#00f0ff]"></span> Project Domain / Type
                      </label>
                      <input 
                        type="text" 
                        value={projectDomain}
                        onChange={(e) => setProjectDomain(e.target.value)}
                        disabled={submitStatus === 'submitting'}
                        className={`w-full bg-dark-900/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none transition-all font-mono text-sm placeholder:text-white/20 ${focusBorderClass}`} 
                        placeholder="[e.g._GenAI_Agent,_Django_API_Core]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-cyber-teal font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyber-teal rounded-full shadow-[0_0_10px_#00f0ff]"></span> Budget Scope
                      </label>
                      <select 
                        value={budgetScope}
                        onChange={(e) => setBudgetScope(e.target.value)}
                        disabled={submitStatus === 'submitting'}
                        className={`w-full bg-dark-900/80 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none transition-all font-mono text-sm cursor-pointer ${focusBorderClass}`}
                      >
                        <option value="<$2k" className="bg-dark-900 text-white">[TRIAL_VAL] &lt; $2,000</option>
                        <option value="$2k-$5k" className="bg-dark-900 text-white">[CORE_VAL] $2,000 - $5,000</option>
                        <option value="$5k-$10k" className="bg-dark-900 text-white">[PREMIUM_VAL] $5,000 - $10,000</option>
                        <option value="$10k+" className="bg-dark-900 text-white">[ENTERPRISE_VAL] $10,000+</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Email Input */}
                <div className="space-y-2">
                  <label className={`font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-500 ${textAccentClass}`}>
                    <span className={`w-2 h-2 rounded-full transition-all duration-500 ${bgAccentClass}`}></span> Transmission Path
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitStatus === 'submitting'}
                    className={`w-full bg-dark-900/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none transition-all font-mono text-sm placeholder:text-white/20 ${focusBorderClass}`} 
                    placeholder="[enter_email]" 
                  />
                </div>

                {/* Data Payload TextArea */}
                <div className="space-y-2">
                  <label className={`font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-colors duration-500 ${textAccentClass}`}>
                    <span className={`w-2 h-2 rounded-full transition-all duration-500 ${bgAccentClass}`}></span> Data Payload
                  </label>
                  <textarea 
                    rows="4" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={submitStatus === 'submitting'}
                    className={`w-full bg-dark-900/50 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none transition-all font-mono text-sm placeholder:text-white/20 ${focusBorderClass}`} 
                    placeholder={isHire ? "[enter_job_requirements_and_description...]" : "[enter_freelance_project_specifications...]"}
                  />
                </div>
              </div>

              {/* Status Message and Submit button */}
              <div className="space-y-4">
                {submitStatus === 'success' && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs rounded-lg animate-pulse">
                    {"[SUCCESS] >>> "}{responseMsg}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs rounded-lg animate-pulse">
                    {"[FAULT] >>> "}{responseMsg}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={submitStatus === 'submitting'}
                  className={`w-full transition-all duration-500 ${bgAccentClass} text-dark-900 hover:brightness-110 font-bold font-mono tracking-widest uppercase py-5 rounded-lg flex items-center justify-center gap-3 ${glowShadowClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Send size={20} />
                  {submitStatus === 'submitting' ? 'TRANSMITTING_PAYLOAD...' : 'EXECUTE_TRANSMISSION'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Right Side: Quantum Transmission 3D Canvas (PC Only) */}
        <div className="hidden lg:flex relative pointer-events-auto w-full lg:h-auto items-center justify-center mt-4 lg:mt-0 rounded-2xl lg:rounded-none border border-white/10 lg:border-none bg-black/20 lg:bg-transparent overflow-hidden lg:overflow-visible shadow-lg lg:shadow-none">
          <div className="absolute inset-0 w-full h-full">
            <QuantumTransmission />
          </div>
        </div>

        {/* Mobile Lightweight Animation Fallback */}
        <div className="flex lg:hidden w-full justify-center items-center py-8">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, -5, 5, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="p-8 rounded-full bg-cyber-teal/5 border border-cyber-teal/20 shadow-[0_0_30px_rgba(0,240,255,0.1)]"
          >
            <Send size={64} className="text-cyber-teal" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
