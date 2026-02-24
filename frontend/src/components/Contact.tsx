import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail, Loader2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Assuming backend is running on localhost:5000
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-slate-100 dark:bg-slate-900/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase"
          >
            Let's Build Together
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            Get In Touch
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-panel p-8 rounded-3xl h-full flex flex-col justify-center">
              <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Connect With Me
              </h4>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-base">
                Whether you have a question, a project proposal, or just want to say hi,
                I'll try my best to get back to you!
              </p>
              
              <div className="space-y-6">
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-colors text-indigo-600 dark:text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm tracking-wide">{portfolioData.contact.email}</span>
                </a>
                
                <a
                  href={portfolioData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-colors text-indigo-600 dark:text-indigo-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm tracking-wide">LinkedIn Profile</span>
                </a>
                
                <a
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-colors text-indigo-600 dark:text-indigo-400">
                    <Github className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm tracking-wide">GitHub Repository</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8 pb-10 rounded-3xl">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed group shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                    {status === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    )}
                  </button>
                </div>
                
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-500 font-semibold text-sm tracking-wide text-center bg-emerald-50 dark:bg-emerald-900/20 py-3 rounded-xl border border-emerald-200 dark:border-emerald-800/50"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
                
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 font-semibold text-sm tracking-wide text-center bg-red-50 dark:bg-red-900/20 py-3 rounded-xl border border-red-200 dark:border-red-800/50"
                  >
                    Failed to send message.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
