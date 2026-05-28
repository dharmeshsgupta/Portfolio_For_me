import React, { useState, useEffect } from 'react';
import { Mail, Send, Github, Linkedin, Terminal } from 'lucide-react';
import { QuantumTransmission } from './ui/QuantumTransmission';

export default function Contact() {
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
    fetch("http://127.0.0.1:8000/api/stats/")
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
      const res = await fetch("http://127.0.0.1:8000/api/contact/", {
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
        <h2 className="text-4xl font-bold font-mono text-white text-glow-amber tracking-widest uppercase">_INITIATE_CONTACT</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Left Side: Content */}
        <div className="flex flex-col gap-8 h-full">
          {/* Contact Info */}
          <div className="glass-card p-10 border-white/5 noise-overlay">
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
          </div>

          {/* Form Container */}
          <div className={`glass-panel p-10 rounded-2xl border-t-4 transition-all duration-500 ${borderAccentClass} shadow-2xl relative overflow-hidden noise-overlay flex-grow`}>
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
          </div>
        </div>

        {/* Right Side: Quantum Transmission 3D Canvas */}
        <div className="hidden lg:flex relative pointer-events-auto w-full items-center justify-center">
          <div className="absolute inset-0 w-full h-full">
            <QuantumTransmission />
          </div>
        </div>

      </div>
    </section>
  );
}
