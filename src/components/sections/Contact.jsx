import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';

// ──────────────────────────────────────────────────────
// Web3Forms access key is loaded from .env file
// Create a .env file with: VITE_WEB3FORMS_KEY=your_key
// Get your FREE key at https://web3forms.com
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
// ──────────────────────────────────────────────────────

export default function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Project Inquiry from ${formData.name}`,
          from_name: 'Blitz Studio Website',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-40 px-8 max-w-screen-2xl mx-auto">
      <AnimatedSection variant="scaleIn">
        <div className="grainy-gradient rounded-[3rem] p-16 md:p-32 border border-outline-variant/30 overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            <div className="relative z-10 max-w-2xl">
              <motion.h2
                className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-primary"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Start a<br />project.
              </motion.h2>
              <motion.p
                className="text-xl font-medium mb-12 opacity-80 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Ready to build something that lasts? Let's discuss your architectural needs today.
              </motion.p>
              <motion.button
                onClick={() => {
                  const opening = !isFormOpen;
                  setIsFormOpen(opening);
                  if (opening) {
                    setTimeout(() => {
                      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }, 100);
                  }
                }}
                className="bg-primary text-white text-xl px-12 py-6 rounded-full font-black tracking-tighter flex items-center gap-4 group overflow-hidden relative"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="relative z-10">{isFormOpen ? 'CLOSE FORM' : 'GET IN TOUCH'}</span>
                <motion.span
                  className="material-symbols-outlined relative z-10"
                  animate={{
                    rotate: isFormOpen ? 180 : 0,
                    x: isFormOpen ? 0 : [0, 4, 0]
                  }}
                  transition={{ duration: isFormOpen ? 0.3 : 1.5, repeat: isFormOpen ? 0 : Infinity, ease: "easeInOut" }}
                >
                  {isFormOpen ? 'expand_less' : 'arrow_forward'}
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>

          {/* Dropdown Contact Form */}
          <AnimatePresence>
            {isFormOpen && (
              <motion.div
                ref={formRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden relative z-10"
              >
                <form onSubmit={handleSubmit} className="mt-12 pt-12 border-t border-black/10">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    <h3 className="text-2xl font-black tracking-tight uppercase mb-8 text-primary">
                      Tell us about your project
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="contact-name" className="text-[0.6875rem] font-bold uppercase tracking-widest text-black/60">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm border border-black/10 rounded-xl text-black font-medium placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>
                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="contact-email" className="text-[0.6875rem] font-bold uppercase tracking-widest text-black/60">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@company.com"
                          className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm border border-black/10 rounded-xl text-black font-medium placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="flex flex-col gap-2 mb-6">
                      <label htmlFor="contact-phone" className="text-[0.6875rem] font-bold uppercase tracking-widest text-black/60">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm border border-black/10 rounded-xl text-black font-medium placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      />
                    </div>
                    {/* Message */}
                    <div className="flex flex-col gap-2 mb-8">
                      <label htmlFor="contact-message" className="text-[0.6875rem] font-bold uppercase tracking-widest text-black/60">
                        Project Details *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Tell us about your project, timeline, and budget..."
                        className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm border border-black/10 rounded-xl text-black font-medium placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button + Status */}
                    <div className="flex items-center gap-6">
                      <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        className={`text-white text-base px-10 py-5 rounded-full font-black tracking-tighter flex items-center gap-3 overflow-hidden relative group ${status === 'sending' ? 'bg-zinc-400 cursor-wait' : 'bg-black'
                          }`}
                        whileHover={status !== 'sending' ? { scale: 1.05, y: -2 } : {}}
                        whileTap={status !== 'sending' ? { scale: 0.95 } : {}}
                      >
                        <span className="relative z-10">
                          {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                        </span>
                        <span className="material-symbols-outlined relative z-10 text-xl group-hover:translate-x-1 transition-transform">
                          {status === 'sending' ? 'hourglass_top' : 'send'}
                        </span>
                        {status !== 'sending' && (
                          <motion.div
                            className="absolute inset-0 bg-primary"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </motion.button>

                      {/* Status Messages */}
                      <AnimatePresence>
                        {status === 'success' && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2 text-green-700 font-bold text-sm"
                          >
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                            Message sent! We'll get back to you soon.
                          </motion.div>
                        )}
                        {status === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2 text-red-600 font-bold text-sm"
                          >
                            <span className="material-symbols-outlined text-lg">error</span>
                            Something went wrong. Please try again.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="absolute -right-20 -bottom-20 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            <span className="material-symbols-outlined text-[400px]">language</span>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}
