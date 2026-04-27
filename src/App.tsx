import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  ShieldCheck, 
  Server, 
  Headphones, 
  ArrowRight, 
  Menu, 
  X, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin,
  Monitor,
  Database,
  Lock,
  ChevronRight,
  Globe,
  Users
} from 'lucide-react';

// --- Components ---

const Navbar = ({ onContactClick, setView }: { onContactClick: () => void, setView: (v: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', action: () => setView('home') },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setView('home')}>
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">DI</div>
          <span className={`font-display font-bold text-2xl tracking-tighter text-brand-dark`}>
            Di Tech <span className="text-brand-accent">Solutions</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.action ? (
              <button key={link.name} onClick={link.action} className="text-sm font-semibold text-slate-600 hover:text-brand-primary transition-colors uppercase tracking-widest">{link.name}</button>
            ) : (
              <a key={link.name} href={link.href} className="text-sm font-semibold text-slate-600 hover:text-brand-primary transition-colors uppercase tracking-widest">{link.name}</a>
            )
          ))}
          <button 
            onClick={onContactClick}
            className="bg-brand-primary text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20"
          >
            Get a Quote
          </button>
        </div>

        <button className="md:hidden text-brand-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                link.action ? (
                  <button key={link.name} className="text-lg font-bold text-slate-800 text-left" onClick={() => { link.action!(); setIsMobileMenuOpen(false); }}>{link.name}</button>
                ) : (
                  <a key={link.name} href={link.href} className="text-lg font-bold text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</a>
                )
              ))}
              <button 
                onClick={() => { onContactClick(); setIsMobileMenuOpen(false); }}
                className="bg-brand-primary text-white w-full py-4 rounded-xl font-bold uppercase tracking-widest"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden bg-white">
      <div className="hero-blob w-[600px] h-[600px] bg-brand-primary -top-40 -left-40" />
      <div className="hero-blob w-[500px] h-[500px] bg-brand-accent -bottom-40 -right-40" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-block bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Empowering Digital Transformation
            </span>
            <h1 className="text-6xl lg:text-7xl font-display font-extrabold text-brand-dark leading-[1.1] tracking-tight mb-8">
              Empowering Businesses with <span className="gradient-text">Cloud & IT Excellence</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transform your enterprise with industry-leading Microsoft 365 solutions, military-grade Endpoint Security, and robust Cloud Infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                onClick={onContactClick}
                className="group bg-brand-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-secondary transition-all flex items-center gap-2 shadow-2xl shadow-brand-primary/30"
              >
                Free Consultation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#services" className="px-10 py-5 rounded-full font-bold text-lg text-brand-dark border border-slate-200 hover:border-brand-primary transition-all">
                Our Services
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              <span className="text-xs font-bold uppercase tracking-widest">Certified Partners:</span>
              <div className="flex gap-6">
                <span className="font-bold text-lg">Microsoft</span>
                <span className="font-bold text-lg">Trend Micro</span>
                <span className="font-bold text-lg">Kaspersky</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,51,102,0.3)]">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" alt="Cloud IT" className="w-full h-auto" />
            </div>
            {/* Floaties */}
            <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">Security Status</p>
                <p className="font-bold text-slate-800">100% Protected</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = ({ setView }: { setView: (v: string) => void }) => {
  const categories = [
    {
      id: "microsoft-365",
      title: "Microsoft 365 Solutions",
      icon: <Cloud className="text-brand-accent" />,
      items: ["Setup & Migration", "Exchange Online", "SharePoint & OneDrive", "Teams Deployment"]
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Solutions",
      icon: <Lock className="text-brand-accent" />,
      items: ["Endpoint Protection", "EDR / XDR (Trend/Kaspersky)", "Security Audits", "Compliance Ready"]
    },
    {
      id: "it-infrastructure",
      title: "IT Infrastructure",
      icon: <Server className="text-brand-accent" />,
      items: ["Active Directory Setup", "Virtualization (VMWare)", "Firewall (Fortinet)", "Hybrid Cloud"]
    },
    {
      id: "it-management",
      title: "Managed IT Services",
      icon: <Headphones className="text-brand-accent" />,
      items: ["24/7 Monitoring", "IT Helpdesk Support", "Backup Solutions", "Disaster Recovery"]
    }
  ];

  return (
    <section id="services" className="py-32 bg-brand-light">
      <div className="max-w-7xl mx-auto px-6 font-display">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-6">Our Core Expertise</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Click on a service to view detailed pricing and specialized plans.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setView(cat.id)}
              className="service-card group cursor-pointer border-transparent hover:border-brand-primary"
            >
              <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-primary transition-all duration-500">
                {React.cloneElement(cat.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-6">{cat.title}</h3>
              <ul className="space-y-3 mb-8">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-500 text-sm">
                    <ChevronRight size={14} className="text-brand-accent" /> {item}
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-brand-primary font-bold text-xs uppercase tracking-widest mt-auto group-hover:gap-4 transition-all">
                View Plans <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceDetails = ({ id, setView }: { id: string, setView: (v: string) => void }) => {
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  
  const serviceData: Record<string, { title: string, description: string, plans: any[] }> = {
    'microsoft-365': {
      title: "Microsoft 365 Solutions",
      description: "Scale your productivity with our expert Microsoft 365 deployment and management services.",
      plans: [
        { name: "Business Basic", price: { weekly: 2.5, monthly: 6, yearly: 60 }, features: ["1 TB Cloud Storage", "Web & Mobile apps", "Search & Discovery", "Email 50GB"] },
        { name: "Business Standard", price: { weekly: 5, monthly: 12.5, yearly: 120 }, features: ["Business Basic +", "Desktop Office apps", "Customer Appointments", "Webinar Hosting"] },
        { name: "Business Premium", price: { weekly: 8, monthly: 22, yearly: 220 }, features: ["Standard +", "Advanced Security", "Access & Data Control", "Cyber Threat Protection"] },
      ]
    },
    'cybersecurity': {
      title: "Cybersecurity Solutions",
      description: "Military-grade protection for your business data and infrastructure.",
      plans: [
        { name: "Standard Security", price: { weekly: 15, monthly: 50, yearly: 500 }, features: ["Basic Endpoint Protection", "Firewall Monitoring", "Weekly Scans", "Email Filtering"] },
        { name: "Advanced Threat Protection", price: { weekly: 30, monthly: 100, yearly: 1000 }, features: ["Full EDR / XDR", "24/7 Monitoring", "Threat Hunting", "Incident Response"] },
        { name: "Enterprise Shield", price: { weekly: 60, monthly: 200, yearly: 2000 }, features: ["Compliance Auditing", "SIEM Integration", "Unlimited Forensics", "Executive Security Reports"] },
      ]
    },
    'it-infrastructure': {
      title: "IT Infrastructure",
      description: "Robust and scalable server and networking solutions for the modern enterprise.",
      plans: [
        { name: "Essential Infrastructure", price: { weekly: 40, monthly: 150, yearly: 1500 }, features: ["Single Server Setup", "Layer 2 Networking", "Local Backups", "Standard Firewall"] },
        { name: "Corporate Network", price: { weekly: 80, monthly: 300, yearly: 3000 }, features: ["Multi-Server Hybrid Cloud", "SD-WAN Setup", "Off-site DR", "Advanced Fortinet Config"] },
        { name: "Data Center Grade", price: { weekly: 200, monthly: 750, yearly: 7500 }, features: ["Full Virtualization Cluster", "Zero Trust Network", "Redundant Storage", "High Availability Setup"] },
      ]
    },
    'it-management': {
      title: "Managed IT Management",
      description: "Comprehensive IT support and proactive management for your daily operations.",
      plans: [
        { name: "Lite Support", price: { weekly: 20, monthly: 80, yearly: 800 }, features: ["Remote Resolution", "Software Updates", "Asset Tracking", "8/5 Support"] },
        { name: "Professional Admin", price: { weekly: 50, monthly: 200, yearly: 2000 }, features: ["On-site & Remote", "Project Management", "Strategy Consulting", "24/7 Critical Only"] },
        { name: "Full IT Department", price: { weekly: 120, monthly: 500, yearly: 5000 }, features: ["vCIO Services", "Unlimited Monthly Hours", "IT Vendor Management", "True 24/7 VIP Support"] },
      ]
    }
  };

  const currentService = serviceData[id] || serviceData['microsoft-365'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-40 pb-20 bg-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-sm mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-6xl font-display font-extrabold text-brand-dark mb-8 leading-tight">{currentService.title}</h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl">{currentService.description}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-full flex gap-2 w-fit mx-auto lg:ml-auto">
            {['weekly', 'monthly', 'yearly'].map((p) => (
              <button 
                key={p}
                onClick={() => setPeriod(p as any)}
                className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${period === p ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' : 'text-slate-400 hover:text-brand-dark'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {currentService.plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[3rem] border border-slate-100 relative group transition-all ${i === 1 ? 'bg-brand-dark text-white ring-8 ring-brand-primary/5' : 'bg-slate-50 text-brand-dark hover:bg-slate-100'}`}
            >
              {i === 1 && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-dark px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Most Popular</span>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-display font-bold">${plan.price[period]}</span>
                <span className="text-sm opacity-50 ml-2">/ {period === 'yearly' ? 'yr' : period === 'weekly' ? 'wk' : 'mo'}</span>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((f: string, j: number) => (
                  <li key={j} className="flex items-start gap-3 text-sm opacity-70">
                    <CheckCircle2 size={18} className="text-brand-accent shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => {
                  const msg = `Hi Di Tech Solutions, I am interested in ${currentService.title} - ${plan.name} (${period} plan). Please provide more details.`;
                  window.open(`https://wa.me/923018224147?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${i === 1 ? 'bg-brand-primary text-white hover:bg-brand-secondary shadow-lg shadow-brand-primary/20' : 'bg-brand-dark text-white hover:bg-brand-primary'}`}
              >
                Inquire via WhatsApp <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const IndustrySolutions = ({ setView }: { setView: (v: string) => void }) => {
  const industries = [
    {
      title: 'BPO & Call Centers',
      desc: 'High-availability infrastructure for mission-critical support services.',
      features: ['Reliable VOIP Channels', 'Zero-Downtime Backup', 'EDR Protection']
    },
    {
      title: 'SMEs & Startups',
      desc: 'Scalable cloud solutions that grow with your business goals.',
      features: ['M365 Integration', 'Flexible Email Setup', 'Remote Tech Support']
    },
    {
      title: 'Corporate Enterprises',
      desc: 'Robust enterprise-level security and complex network management.',
      features: ['Hybrid Cloud Setup', 'Compliance Audits', 'vCIO Strategy']
    }
  ];

  return (
    <section id="solutions" className="py-32 bg-brand-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-display font-extrabold mb-16 text-center">Solutions for Every Industry</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {industries.map((ind, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.02 }}
              className="p-10 border border-white/10 rounded-3xl hover:bg-white/5 transition-all"
            >
               <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center mb-6">
                  <Globe size={24} className="text-brand-accent" />
               </div>
               <h4 className="text-2xl font-bold mb-4">{ind.title}</h4>
               <p className="text-slate-400 text-sm mb-6 leading-relaxed">{ind.desc}</p>
               <ul className="space-y-3 mb-8">
                 {ind.features.map((f, j) => (
                   <li key={j} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent">
                     <CheckCircle2 size={14} /> {f}
                   </li>
                 ))}
               </ul>
               <button onClick={() => setView('quote')} className="text-xs font-bold underline underline-offset-4 hover:text-brand-accent transition-colors uppercase tracking-widest">Inquire Now</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Careers = ({ setView }: { setView: (v: string) => void }) => {
  const jobs = [
    { title: "M365 Support Engineer", type: "Full-time", loc: "Karachi" },
    { title: "Cybersecurity Analyst", type: "Full-time", loc: "Karachi" },
    { title: "IT Infrastructure Lead", type: "Full-time", loc: "Hybrid" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <button onClick={() => setView('home')} className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-sm mb-12"><ArrowLeft size={16} /> Home</button>
        <h1 className="text-6xl font-display font-bold text-brand-dark mb-8">Join the Di Tech Team</h1>
        <p className="text-xl text-slate-500 mb-16">Work at the forefront of digital transformation in Pakistan. We're looking for passionate tech leaders.</p>
        
        <div className="space-y-6">
          {jobs.map((job, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-3xl hover:border-brand-primary transition-all flex justify-between items-center group">
              <div>
                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <p className="text-sm text-slate-400">{job.loc} • {job.type}</p>
              </div>
              <button onClick={() => window.open(`mailto:support@ditech.solutions?subject=Job Application: ${job.title}`)} className="bg-brand-primary text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all"><ChevronRight size={20} /></button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PrivacyPolicy = ({ setView }: { setView: (v: string) => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-20 bg-white min-h-screen font-sans">
    <div className="max-w-3xl mx-auto px-6">
      <button onClick={() => setView('home')} className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-sm mb-12"><ArrowLeft size={16} /> Home</button>
      <h1 className="text-5xl font-display font-bold text-brand-dark mb-8">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <p>Your privacy is important to us. It is Di Tech Solutions' policy to respect your privacy regarding any information we may collect from you across our website.</p>
        <h3 className="text-xl font-bold text-brand-dark">1. Information We Collect</h3>
        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
        <h3 className="text-xl font-bold text-brand-dark">2. Use of Information</h3>
        <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft.</p>
        <h3 className="text-xl font-bold text-brand-dark">3. Data Sharing</h3>
        <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
      </div>
    </div>
  </motion.div>
);

const TermsOfService = ({ setView }: { setView: (v: string) => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-20 bg-white min-h-screen">
    <div className="max-w-3xl mx-auto px-6">
      <button onClick={() => setView('home')} className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-sm mb-12"><ArrowLeft size={16} /> Home</button>
      <h1 className="text-5xl font-display font-bold text-brand-dark mb-8">Terms of Service</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <p>By accessing the website at ditechsolutions.pk, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        <h3 className="text-xl font-bold text-brand-dark">1. Use License</h3>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Di Tech Solutions' website for personal, non-commercial transitory viewing only.</p>
        <h3 className="text-xl font-bold text-brand-dark">2. Disclaimer</h3>
        <p>The materials on Di Tech Solutions' website are provided on an 'as is' basis. Di Tech Solutions makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.</p>
      </div>
    </div>
  </motion.div>
);

const GetAQuote = ({ setView }: { setView: (v: string) => void }) => {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', service: 'M365', users: '1-10', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*Quote Request*\nName: ${formData.name}\nCompany: ${formData.company}\nService: ${formData.service}\nUsers: ${formData.users}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/923018224147?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="pt-40 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <button onClick={() => setView('home')} className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-sm mb-12"><ArrowLeft size={16} /> Home</button>
        
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
          <h1 className="text-5xl font-display font-extrabold text-brand-dark mb-4 text-center">Get a Precision Quote</h1>
          <p className="text-slate-500 mb-12 text-center">Tell us about your requirements and we’ll customize a plan for you.</p>
          
          {sent ? (
            <div className="text-center py-20">
              <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Request Initiated!</h3>
              <p className="text-slate-500">We have received your request. Check your WhatsApp for the follow-up.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 ml-2">Name</label>
                <input required type="text" placeholder="John" className="w-full bg-slate-50 border-none p-5 rounded-2xl outline-none ring-2 ring-transparent focus:ring-brand-primary transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 ml-2">Company Name</label>
                <input required type="text" placeholder="TechCorp" className="w-full bg-slate-50 border-none p-5 rounded-2xl outline-none ring-2 ring-transparent focus:ring-brand-primary transition-all" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 ml-2">Service</label>
                <select className="w-full bg-slate-50 border-none p-5 rounded-2xl outline-none ring-2 ring-transparent focus:ring-brand-primary transition-all appearance-none" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                  <option value="M365">Microsoft 365</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Infrastructure">IT Infrastructure</option>
                  <option value="Support">Managed Support</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 ml-2">Number of Users</label>
                <select className="w-full bg-slate-50 border-none p-5 rounded-2xl outline-none ring-2 ring-transparent focus:ring-brand-primary transition-all appearance-none" value={formData.users} onChange={e => setFormData({...formData, users: e.target.value})}>
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                  <option>200+</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 ml-2">Detailed Requirements</label>
                <textarea required rows={4} placeholder="What specifically do you need?" className="w-full bg-slate-50 border-none p-5 rounded-2xl outline-none ring-2 ring-transparent focus:ring-brand-primary transition-all" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              </div>
              <button className="md:col-span-2 bg-brand-primary text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-lg hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/30">Submit Quote Request</button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ArrowLeft = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', service: 'General Inquiry' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const waMessage = `*New Lead from Website*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Service:* ${formData.service}\n*Message:* ${formData.message}`;
    const waUrl = `https://wa.me/923018224147?text=${encodeURIComponent(waMessage)}`;
    
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', service: 'General Inquiry' });
        // Redirect to WhatsApp after short delay
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 1500);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-brand-dark rounded-[4rem] p-12 lg:p-20 flex flex-col lg:flex-row gap-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-brand-primary/20 to-transparent pointer-events-none" />
          
          <div className="flex-1">
            <h2 className="text-5xl font-display font-extrabold text-white mb-8">Ready to Start Your Digital Journey?</h2>
            <p className="text-slate-400 mb-12 text-lg leading-relaxed">Fill out the form or reach out to us directly via our Karachi office. Our experts are ready to assist you.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-accent shadow-inner">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">WhatsApp / Call</p>
                  <p className="text-xl font-bold text-white">+92 301 8224147</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-accent shadow-inner">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Email Inquiry</p>
                  <p className="text-xl font-bold text-white">support@ditech.solutions</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-accent shadow-inner">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Karachi HQ</p>
                  <p className="text-sm font-bold text-white">BRR Tower, I.I. Chundrigar Rd, City Railway Colony, Karachi, 74000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-[3rem] p-10 shadow-2xl relative z-10">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
                <h3 className="text-3xl font-display font-bold text-brand-dark mb-4">Message Received!</h3>
                <p className="text-slate-500 mb-8">One of our experts will contact you within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="text-brand-primary font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-slate-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-brand-accent transition-all outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full bg-slate-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-brand-accent transition-all outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Interested Service</label>
                  <select 
                    className="w-full bg-slate-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-brand-accent transition-all outline-none appearance-none"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option>Microsoft 365 Solutions</option>
                    <option>Cybersecurity / Protection</option>
                    <option>Cloud Infrastructure</option>
                    <option>Managed Support</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Your Message</label>
                  <textarea 
                    required
                    rows={4} 
                    placeholder="How can we help your business today?" 
                    className="w-full bg-slate-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-brand-accent transition-all outline-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button 
                  disabled={status === 'loading'}
                  className="w-full bg-brand-primary text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-lg hover:bg-brand-secondary transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {status === 'loading' ? 'Sending...' : 'Request Consultation'} <ChevronRight size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-brand-primary h-64 rounded-[4rem] group overflow-hidden relative">
              <div className="absolute inset-0 bg-brand-accent/20 translate-y-full hover:translate-y-0 transition-transform duration-500" />
              <div className="h-full flex flex-col items-center justify-center text-white text-center p-6">
                <p className="text-4xl font-display font-extrabold mb-1">10+</p>
                <p className="text-[8px] font-bold uppercase tracking-widest leading-tight">Years Experience</p>
              </div>
            </div>
            <div className="bg-slate-100 h-64 rounded-[4rem] flex flex-col items-center justify-center text-brand-dark text-center p-6">
              <Users size={40} className="mb-4 text-brand-primary" />
              <p className="text-xl font-bold leading-tight">Certified Experts</p>
            </div>
            <div className="col-span-2 bg-brand-dark h-32 rounded-[2rem] flex items-center justify-center px-10 gap-6">
               <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 size={24} className="text-emerald-500" />
                  <span className="text-sm font-bold uppercase tracking-widest">Industry Proven</span>
               </div>
               <div className="h-8 w-px bg-white/10" />
               <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 size={24} className="text-emerald-500" />
                  <span className="text-sm font-bold uppercase tracking-widest">Global Support</span>
               </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-5xl font-display font-extrabold text-brand-dark mb-8">First Impression <span className="text-brand-accent">Matters.</span></h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              Di Tech Solutions is a modern IT services company specializing in cloud computing, cybersecurity, and enterprise IT infrastructure. We help businesses transform digitally using industry-leading technologies like Microsoft 365, Trend Micro, and Kaspersky.
            </p>
            <div className="space-y-6">
              {[
                { t: "Microsoft Certified Specialists", d: "Experts in cloud & productivity deployments." },
                { t: "Security First Approach", d: "Protecting your end-points with EDR & XDR." },
                { t: "Customer-Centric Focus", d: "Support that scales with your business." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1"><CheckCircle2 className="text-emerald-500" size={20} /></div>
                  <div>
                    <h4 className="font-bold text-brand-dark">{item.t}</h4>
                    <p className="text-sm text-slate-400">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  const partners = ["Microsoft", "Trend Micro", "Kaspersky", "Huawei", "Fortinet", "Cisco"];
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-12">Industry Leading Partners</p>
        <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-12">
          {partners.map(p => (
            <div key={p} className="text-2xl font-bold text-slate-300 hover:text-brand-primary transition-colors cursor-default">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    { name: "Business Basic", price: "6.00", features: ["1 TB Cloud Storage", "Web & Mobile apps", "Search & Discovery", "Email 50GB"] },
    { name: "Business Standard", price: "12.50", features: ["Business Basic +", "Desktop Office apps", "Customer Appointments", "Webinar Hosting"] },
    { name: "Business Premium", price: "22.00", features: ["Standard +", "Advanced Security", "Access & Data Control", "Cyber Threat Protection"] },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-display font-extrabold text-brand-dark mb-6">Microsoft 365 Plans</h2>
          <p className="text-slate-500">Industry-leading productivity tools for every business size.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className="p-10 rounded-[3rem] border border-slate-100 bg-slate-50 relative group transition-all hover:bg-brand-dark hover:text-white">
              {i === 1 && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-dark px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Recommended</span>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-display font-bold">${plan.price}</span>
                <span className="text-sm opacity-50 ml-2">/ user / mo</span>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm opacity-70">
                    <CheckCircle2 size={16} className="text-brand-accent" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border border-brand-primary text-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:border-transparent transition-all font-bold">Get Started</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/923018224147" 
    target="_blank" 
    rel="noreferrer"
    className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-bounce"
  >
    <Phone size={32} />
  </a>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState('home');

  const scrollToContact = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen">
      <Navbar onContactClick={() => setView('quote')} setView={setView} />
      
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onContactClick={() => setView('quote')} />
            <Partners />
            <About />
            <Services setView={setView} />
            <Pricing />
            
            <IndustrySolutions setView={setView} />

            <Contact />
          </motion.div>
        ) : view === 'microsoft-365' || view === 'cybersecurity' || view === 'it-infrastructure' || view === 'it-management' ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ServiceDetails id={view} setView={setView} />
          </motion.div>
        ) : view === 'careers' ? (
          <Careers setView={setView} />
        ) : view === 'privacy' ? (
          <PrivacyPolicy setView={setView} />
        ) : view === 'terms' ? (
          <TermsOfService setView={setView} />
        ) : view === 'quote' ? (
          <GetAQuote setView={setView} />
        ) : null}
      </AnimatePresence>

      <WhatsAppButton />

      <footer className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => setView('home')}>
                <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center text-white font-bold text-sm">DI</div>
                <span className="font-display font-bold text-xl tracking-tighter text-brand-dark">Di Tech Solutions</span>
              </div>
              <p className="text-slate-400 text-sm max-w-xs mb-6">Your trusted partner for modern cloud solutions and cybersecurity in Pakistan. Headquartered in Karachi.</p>
              <div className="flex gap-4">
                <Mail size={18} className="text-brand-primary" />
                <span className="text-sm text-slate-600">support@ditech.solutions</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-brand-dark mb-6 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><button onClick={() => setView('home')} className="hover:text-brand-primary">Home</button></li>
                <li><button onClick={() => setView('careers')} className="hover:text-brand-primary">Careers</button></li>
                <li><button onClick={scrollToContact} className="hover:text-brand-primary">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-brand-dark mb-6 uppercase text-xs tracking-widest">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><button onClick={() => setView('privacy')} className="hover:text-brand-primary">Privacy Policy</button></li>
                <li><button onClick={() => setView('terms')} className="hover:text-brand-primary">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-300">© 2024 Di Tech Solutions. All Rights Reserved.</p>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
               <span>Karachi, Pakistan</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
