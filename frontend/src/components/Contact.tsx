import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin, Mail, Twitter, CheckCircle2, AlertCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Input focus states for floating label animation
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-24">
        
        {/* Entrance Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-sm tracking-widest text-indigo-600 dark:text-cyan-400 uppercase mb-4 block">
            08 / Contact
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white">
            Let's Build Together.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Message + Socials */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col"
          >
            <div className="mb-12">
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-8">
                {portfolioData.contact.message}
              </p>
              <div className="w-20 h-1 bg-indigo-500 dark:bg-cyan-500 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href={`mailto:${portfolioData.contact.email}`} className="group p-6 glass-panel rounded-2xl hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-cyan-900/30 text-indigo-500 dark:text-cyan-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <Mail size={24} />
                </div>
                <h5 className="font-bold text-slate-900 dark:text-white mb-1">Email</h5>
                <p className="text-sm text-slate-500 truncate">{portfolioData.contact.email}</p>
              </a>

              <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="group p-6 glass-panel rounded-2xl hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-500/10">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900">
                  <Github size={24} />
                </div>
                <h5 className="font-bold text-slate-900 dark:text-white mb-1">GitHub</h5>
                <p className="text-sm text-slate-500 truncate">Source Code</p>
              </a>

              <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="group p-6 glass-panel rounded-2xl hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                  <Linkedin size={24} />
                </div>
                <h5 className="font-bold text-slate-900 dark:text-white mb-1">LinkedIn</h5>
                <p className="text-sm text-slate-500 truncate">Professional Network</p>
              </a>

              {portfolioData.contact.twitter && (
                <a href={portfolioData.contact.twitter} target="_blank" rel="noopener noreferrer" className="group p-6 glass-panel rounded-2xl hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-900/30 text-sky-500 dark:text-sky-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white">
                    <Twitter size={24} />
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">Twitter</h5>
                  <p className="text-sm text-slate-500 truncate">Thoughts & Updates</p>
                </a>
              )}
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-[2rem] border border-slate-200 dark:border-slate-800/60 shadow-xl bg-slate-50 dark:bg-slate-900/40 relative">
              
              <div className="space-y-8 relative">
                
                {/* Floating Label Input: Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-cyan-400 outline-none transition-colors text-slate-900 dark:text-white text-lg rounded-none peer"
                    placeholder=" " // peer placeholder required for CSS floating label
                  />
                  <label 
                    htmlFor="name" 
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      focusedField === 'name' || formData.name ? '-top-3 text-xs text-indigo-500 dark:text-cyan-400 font-bold tracking-widest uppercase' : 'top-4 text-slate-500 dark:text-slate-400 text-lg peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-500 dark:peer-focus:text-cyan-400 peer-focus:font-bold peer-focus:tracking-widest peer-focus:uppercase'
                    }`}
                  >
                    Your Name
                  </label>
                </div>

                {/* Floating Label Input: Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-cyan-400 outline-none transition-colors text-slate-900 dark:text-white text-lg rounded-none peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      focusedField === 'email' || formData.email ? '-top-3 text-xs text-indigo-500 dark:text-cyan-400 font-bold tracking-widest uppercase' : 'top-4 text-slate-500 dark:text-slate-400 text-lg peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-500 dark:peer-focus:text-cyan-400 peer-focus:font-bold peer-focus:tracking-widest peer-focus:uppercase'
                    }`}
                  >
                    Email Address
                  </label>
                </div>

                {/* Floating Label Input: Message */}
                <div className="relative pt-2">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-cyan-400 outline-none transition-colors text-slate-900 dark:text-white text-lg rounded-none peer resize-none"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="message" 
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formData.message ? '-top-3 text-xs text-indigo-500 dark:text-cyan-400 font-bold tracking-widest uppercase' : 'top-6 text-slate-500 dark:text-slate-400 text-lg peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-500 dark:peer-focus:text-cyan-400 peer-focus:font-bold peer-focus:tracking-widest peer-focus:uppercase'
                    }`}
                  >
                    Message
                  </label>
                </div>

                <div className="pt-6 relative">
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 dark:bg-cyan-500 hover:bg-indigo-700 dark:hover:bg-cyan-400 text-white tracking-wider font-semibold uppercase text-sm rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative group"
                  >
                    {/* Button hover effect */}
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out pointer-events-none" />
                    
                    <span className="relative z-10">
                      {status === 'loading' ? 'Transmitting...' : 'Send Message'}
                    </span>
                    <Send className={`w-4 h-4 relative z-10 transition-transform ${status === 'loading' ? 'animate-bounce delay-150 relative -top-1' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                  </button>
                </div>

              </div>

              {/* Status Indicator Overlays */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-[2rem] border border-emerald-500/30"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </motion.div>
                    <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Message Sent</h4>
                    <p className="text-slate-600 dark:text-slate-400 ">I'll be in touch shortly.</p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-6 left-6 right-6 z-20 flex items-center gap-3 bg-red-50 dark:bg-red-900/90 text-red-600 dark:text-red-100 p-4 rounded-xl shadow-lg border border-red-200 dark:border-red-800"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">Transmission failed. Please try again or use direct email.</p>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </motion.div>

        </div>
      </div>

      {/* Footer Tagline injected directly below Contact grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 border-t border-slate-200 dark:border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between items-center relative z-10 w-full">
        <p className="text-slate-500 dark:text-slate-500 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} {portfolioData.hero.name} All rights reserved.
        </p>
        <p className="text-slate-400 dark:text-slate-600 italic flex items-center gap-2">
          Crafted with intent.
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-500 block animate-pulse" />
        </p>
      </div>

    </section>
  );
}
