import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection';

const MotionButton = motion.button;
const MotionDiv = motion.div;
const MotionHeading = motion.h2;
const MotionParagraph = motion.p;
const MotionSpan = motion.span;

const WHATSAPP_NUMBER = '918667573511';
const STATUS_RESET_MS = 5000;

const serviceOptions = [
  {
    id: 'generalEnquiry',
    label: 'General Enquiry',
    description: 'For early-stage conversations when you need guidance before choosing a service.',
    options: [],
  },
  {
    id: 'mobileApp',
    label: 'Mobile App',
    description: 'Apps built for customers, field teams, delivery flows, and everyday operations.',
    options: [
      'Supermarket app',
      'Delivery app',
      'Booking app',
      'Fintech app',
      'Healthcare app',
      'Other mobile app',
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce',
    description: 'Commerce products for brands, marketplaces, subscription models, and selling workflows.',
    options: [
      'D2C storefront',
      'Marketplace platform',
      'Subscription commerce',
      'B2B ordering portal',
      'Shopify custom build',
      'Other e-commerce need',
    ],
  },
  {
    id: 'customSoftware',
    label: 'Custom Software',
    description: 'Internal systems, SaaS products, dashboards, and tailored business software.',
    options: [
      'Admin dashboard',
      'ERP or operations tool',
      'CRM or workflow system',
      'SaaS platform',
      'AI automation tool',
      'Other custom software',
    ],
  },
];

function createInitialServiceState() {
  return serviceOptions.reduce((acc, service) => {
    acc[service.id] = { enabled: false, expanded: false, selections: [], custom: '' };
    return acc;
  }, {});
}

export default function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [serviceState, setServiceState] = useState(createInitialServiceState);
  const formRef = useRef(null);
  const resetTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const selectedServiceCount = useMemo(
    () => Object.values(serviceState).filter((service) => service.enabled).length,
    [serviceState],
  );

  const queueStatusReset = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setStatus('idle');
      resetTimerRef.current = null;
    }, STATUS_RESET_MS);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleServiceEnabled = (serviceId) => {
    setServiceState((prev) => {
      const current = prev[serviceId];
      const nextEnabled = !current.enabled;
      const resetOtherServices = Object.fromEntries(
        serviceOptions
          .filter((service) => service.id !== serviceId)
          .map((service) => [
            service.id,
            { ...prev[service.id], enabled: false, expanded: false, selections: [], custom: '' },
          ]),
      );

      return {
        ...prev,
        ...resetOtherServices,
        [serviceId]: {
          ...current,
          enabled: nextEnabled,
          expanded: nextEnabled,
          selections: nextEnabled ? current.selections : [],
          custom: nextEnabled ? current.custom : '',
        },
      };
    });
  };

  const toggleServiceExpanded = (serviceId) => {
    setServiceState((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        expanded: !prev[serviceId].expanded,
      },
    }));
  };

  const toggleSubSelection = (serviceId, option) => {
    setServiceState((prev) => {
      const current = prev[serviceId];
      const hasOption = current.selections.includes(option);
      const resetOtherServices = Object.fromEntries(
        serviceOptions
          .filter((service) => service.id !== serviceId)
          .map((service) => [
            service.id,
            { ...prev[service.id], enabled: false, expanded: false, selections: [], custom: '' },
          ]),
      );

      return {
        ...prev,
        ...resetOtherServices,
        [serviceId]: {
          ...current,
          enabled: true,
          expanded: true,
          selections: hasOption
            ? current.selections.filter((item) => item !== option)
            : [...current.selections, option],
        },
      };
    });
  };

  const handleCustomServiceInput = (serviceId, value) => {
    setServiceState((prev) => {
      const resetOtherServices = Object.fromEntries(
        serviceOptions
          .filter((service) => service.id !== serviceId)
          .map((service) => [
            service.id,
            { ...prev[service.id], enabled: false, expanded: false, selections: [], custom: '' },
          ]),
      );

      return {
        ...prev,
        ...resetOtherServices,
        [serviceId]: {
          ...prev[serviceId],
          enabled: true,
          expanded: true,
          custom: value,
        },
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const projectDetails = formData.message.trim() || "Let's discuss the project details here.";

    if (selectedServiceCount === 0) {
      setStatus('serviceRequired');
      queueStatusReset();
      return;
    }

    const serviceSummary = serviceOptions
      .filter((service) => serviceState[service.id].enabled)
      .map((service) => {
        const current = serviceState[service.id];
        const selectedOptions = current.selections.length > 0 ? current.selections.join(', ') : 'General enquiry';
        const customNote = current.custom.trim() ? ` | Custom: ${current.custom.trim()}` : '';
        return `${service.label}: ${selectedOptions}${customNote}`;
      })
      .join('\n');

    const whatsappMessage = [
      'Hello Blitz Team,',
      '',
      `Im ${formData.name},`,
      `My Email id  ${formData.email}`,
      `My Phone number is ${formData.phone || 'Not provided'}`,
      '',
      'Services needed:',
      serviceSummary,
      '',
      'Project details:',
      projectDetails,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setServiceState(createInitialServiceState());
    queueStatusReset();
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-40 px-8 max-w-screen-2xl mx-auto">
      <AnimatedSection variant="scaleIn">
        <div className="grainy-gradient rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 border border-outline-variant/30 overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
            <div className="relative z-10 max-w-2xl">
              <MotionHeading
                className="text-5xl md:text-8xl font-black tracking-tighter mb-6 md:mb-8 text-primary"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Start a
                <br />
                project.
              </MotionHeading>
              <MotionParagraph
                className="text-base md:text-xl leading-7 md:leading-normal font-medium mb-8 md:mb-12 opacity-80 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Tell us what you are building, what is stuck, and what success looks like. We will
                open a WhatsApp message with your project brief so the conversation can start right away.
              </MotionParagraph>
              <MotionButton
                type="button"
                onClick={() => {
                  const opening = !isFormOpen;
                  setIsFormOpen(opening);

                  if (opening) {
                    setTimeout(() => {
                      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }, 100);
                  }
                }}
                className="bg-primary text-white text-base md:text-xl px-8 md:px-12 py-4 md:py-6 rounded-full font-black tracking-tighter flex items-center gap-3 md:gap-4 group overflow-hidden relative"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="relative z-10">{isFormOpen ? 'CLOSE FORM' : 'GET IN TOUCH'}</span>
                <MotionSpan
                  className="material-symbols-outlined relative z-10"
                  animate={{
                    rotate: isFormOpen ? 180 : 0,
                    x: isFormOpen ? 0 : [0, 4, 0],
                  }}
                  transition={{
                    duration: isFormOpen ? 0.3 : 1.5,
                    repeat: isFormOpen ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {isFormOpen ? 'expand_less' : 'arrow_forward'}
                </MotionSpan>
                <MotionDiv
                  className="absolute inset-0 bg-black"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </MotionButton>
            </div>
          </div>

          <AnimatePresence>
            {isFormOpen && (
              <MotionDiv
                ref={formRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden relative z-10"
              >
                <form onSubmit={handleSubmit} className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-black/10">
                  <MotionDiv
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase mb-3 text-primary">
                      Tell us about your project
                    </h3>
                  

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="contact-name"
                          className="text-[0.6875rem] font-bold uppercase tracking-widest text-black/60"
                        >
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className="w-full px-4 md:px-6 py-3.5 md:py-4 bg-white/70 backdrop-blur-sm border border-black/10 rounded-xl text-sm md:text-base text-black font-medium placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="contact-email"
                          className="text-[0.6875rem] font-bold uppercase tracking-widest text-black/60"
                        >
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@company.com"
                          className="w-full px-4 md:px-6 py-3.5 md:py-4 bg-white/70 backdrop-blur-sm border border-black/10 rounded-xl text-sm md:text-base text-black font-medium placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-4 md:mb-6">
                      <label
                        htmlFor="contact-phone"
                        className="text-[0.6875rem] font-bold uppercase tracking-widest text-black/60"
                      >
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className="w-full px-4 md:px-6 py-3.5 md:py-4 bg-white/70 backdrop-blur-sm border border-black/10 rounded-xl text-sm md:text-base text-black font-medium placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      />
                    </div>

                    <div className="mb-6 md:mb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4">
                        <div>
                          <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-black/60">
                            Services Needed *
                          </p>
                          <p className="text-sm text-black/55 mt-1.5 md:mt-2">
                            Choose one or more service groups, then select the closest sub-options.
                          </p>
                        </div>
                        <span className="w-fit rounded-full bg-black text-white px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em]">
                          {selectedServiceCount} selected
                        </span>
                      </div>

                      <div className="space-y-4">
                        {serviceOptions.map((service) => {
                          const current = serviceState[service.id];
                          const anotherServiceActive = serviceOptions.some(
                            (item) => item.id !== service.id && serviceState[item.id].enabled,
                          );

                          return (
                            <div
                              key={service.id}
                              className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur-sm overflow-hidden"
                            >
                              <div className="flex items-start gap-3 md:gap-4 px-4 md:px-5 py-3.5 md:py-4">
                                <input
                                  id={`service-${service.id}`}
                                  type="checkbox"
                                  checked={current.enabled}
                                  onChange={() => toggleServiceEnabled(service.id)}
                                  disabled={anotherServiceActive}
                                  className="mt-0.5 h-4 w-4 md:h-5 md:w-5 rounded border-black/15 text-black focus:ring-black/20"
                                />
                                <button
                                  type="button"
                                  onClick={() => toggleServiceExpanded(service.id)}
                                  disabled={anotherServiceActive}
                                  className="flex-1 text-left"
                                  aria-expanded={current.expanded}
                                >
                                  <div className="flex items-center justify-between gap-4">
                                    <div>
                                      <p className={`text-sm md:text-base font-bold tracking-tight ${anotherServiceActive ? 'text-black/35' : 'text-black'}`}>
                                        {service.label}
                                      </p>
                                      <p className={`text-xs md:text-sm mt-1 leading-5 ${anotherServiceActive ? 'text-black/30' : 'text-black/55'}`}>
                                        {service.description}
                                      </p>
                                    </div>
                                    <span className={`material-symbols-outlined ${anotherServiceActive ? 'text-black/30' : 'text-black/60'}`}>
                                      {current.expanded ? 'expand_less' : 'expand_more'}
                                    </span>
                                  </div>
                                </button>
                              </div>

                              {current.expanded && (
                                <div className="border-t border-black/8 px-4 md:px-5 py-4 md:py-5 space-y-4 md:space-y-5 bg-white/55">
                                  {service.options.length > 0 ? (
                                    <>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
                                        {service.options.map((option) => {
                                          const checked = current.selections.includes(option);

                                          return (
                                            <label
                                              key={option}
                                              className={`flex items-center gap-3 rounded-xl border px-3.5 md:px-4 py-3 transition-colors ${
                                                checked
                                                  ? 'border-black/20 bg-white text-black'
                                                  : 'border-black/8 bg-transparent text-black/70'
                                              }`}
                                            >
                                              <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => toggleSubSelection(service.id, option)}
                                                className="h-4 w-4 rounded border-black/15 text-black focus:ring-black/20"
                                              />
                                              <span className="text-sm font-medium leading-5">{option}</span>
                                            </label>
                                          );
                                        })}
                                      </div>

                                      <div className="flex flex-col gap-2">
                                        <label
                                          htmlFor={`custom-${service.id}`}
                                          className="text-[0.6875rem] font-bold uppercase tracking-widest text-black/60"
                                        >
                                          Custom {service.label} Need
                                        </label>
                                        <input
                                          id={`custom-${service.id}`}
                                          type="text"
                                          value={current.custom}
                                          onChange={(event) => handleCustomServiceInput(service.id, event.target.value)}
                                          placeholder={`Tell us what kind of ${service.label.toLowerCase()} you need`}
                                          className="w-full px-4 md:px-5 py-3.5 md:py-4 bg-white/80 border border-black/10 rounded-xl text-sm md:text-base text-black font-medium placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <div className="rounded-xl border border-black/8 bg-white/80 px-4 py-3.5 text-sm font-medium leading-6 text-black/65">
                                      Select this if you want us to review your idea first and help guide the next step.
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-6 md:mb-8">
                      <label
                        htmlFor="contact-message"
                        className="text-[0.6875rem] font-bold uppercase tracking-widest text-black/60"
                      >
                        Project Details
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about the product, timeline, goals, and any constraints."
                        className="w-full px-4 md:px-6 py-3.5 md:py-4 bg-white/70 backdrop-blur-sm border border-black/10 rounded-xl text-sm md:text-base text-black font-medium placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 md:gap-6">
                      <MotionButton
                        type="submit"
                        className="w-full sm:w-auto justify-center text-white text-sm md:text-base px-8 md:px-10 py-4 md:py-5 rounded-full font-black tracking-tighter flex items-center gap-3 overflow-hidden relative group bg-black"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">OPEN WHATSAPP</span>
                        <span className="material-symbols-outlined relative z-10 text-xl group-hover:translate-x-1 transition-transform">
                          send
                        </span>
                        <MotionDiv
                          className="absolute inset-0 bg-primary"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </MotionButton>

                      <AnimatePresence mode="wait">
                        {status === 'success' && (
                          <MotionDiv
                            key="success"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2 text-green-700 font-bold text-sm"
                          >
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                            WhatsApp opened with your message draft.
                          </MotionDiv>
                        )}
                        {status === 'serviceRequired' && (
                          <MotionDiv
                            key="service-required"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2 text-amber-900 font-bold text-sm"
                          >
                            <span className="material-symbols-outlined text-lg">warning</span>
                            Please choose at least one service before continuing.
                          </MotionDiv>
                        )}
                      </AnimatePresence>
                    </div>
                  </MotionDiv>
                </form>
              </MotionDiv>
            )}
          </AnimatePresence>

          <MotionDiv
            className="absolute -right-20 -bottom-20 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          >
            <span className="material-symbols-outlined text-[400px]">language</span>
          </MotionDiv>
        </div>
      </AnimatedSection>
    </section>
  );
}
