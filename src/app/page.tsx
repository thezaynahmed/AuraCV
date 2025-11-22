'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionTemplate, 
  useMotionValue, 
  useInView,
  animate,
  useAnimationFrame,
  stagger
} from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  Command, 
  FileJson, 
  Github, 
  Globe, 
  Play, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  ChevronRight,
  Menu,
  X,
  Cpu,
  ScanLine,
  User,
  Briefcase,
  GraduationCap,
  Lock,
  Database,
  Zap,
  Layout,
  FileCheck,
  Eye,
  Server
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- 1. VISUAL FX PRIMITIVES ---

const RetroGrid = () => {
  return (
    <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-30 perspective-grid [perspective:200px] z-0">
      <div className="absolute inset-0 [transform:rotateX(35deg)]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300%] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600%]",
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]"
          )}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%" />
    </div>
  );
};

const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;
    const scramble = () => {
      interval = setInterval(() => {
        setDisplay(
          text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    };
    scramble();
    return () => clearInterval(interval);
  }, [text]);

  return <span className={cn("font-mono", className)}>{display}</span>;
};

const AuroraBackground = ({ className, children, showRadialGradient = true }: any) => {
  return (
    <div className={cn("relative flex flex-col h-[100vh] items-center justify-center bg-black text-slate-950 transition-bg", className)}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-20
            `,
            showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        />
      </div>
      {children}
    </div>
  );
};

const Noise = () => (
  <div 
    className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none mix-blend-overlay"
    style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

// --- 2. UI COMPONENTS ---

const BorderBeam = ({ duration = 10, delay = 0 }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-10">
      <div 
          className="absolute aspect-square w-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,#fff_360deg)] opacity-20 animate-border-beam mix-blend-color-dodge"
          style={{ 
              animationDuration: `${duration}s`,
              animationDelay: `-${delay}s`
          }} 
      />
  </div>
);

const MagneticButton = ({ children, className, variant = "primary", ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    x.set(clientX - (left + width / 2));
    y.set(clientY - (top + height / 2));
  }

  function handleMouseLeave() {
    x.set(0); y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 overflow-hidden group z-30",
        {
          "bg-white text-black px-8 py-4 text-lg hover:scale-105": variant === "primary",
          "bg-zinc-900 text-white border border-zinc-800 px-6 py-3 text-sm hover:bg-zinc-800": variant === "secondary",
        },
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/80 to-transparent w-[50%] h-full -translate-x-full group-hover:animate-shimmer" />
      )}
    </motion.button>
  );
};

const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Spotlight = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className={cn("group relative overflow-hidden", className)} onMouseMove={handleMouseMove}>
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

// --- 3. HERO DASHBOARD ---

const HeroDashboard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  
  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct * 20);
    y.set(yPct * 20);
  }

  return (
    <motion.div 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, scale: 0.8, rotateX: 40 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 1.5, type: "spring", stiffness: 30, delay: 0.2 }}
      className="relative w-full max-w-5xl mx-auto mt-24 perspective-1000 z-50"
    >
      <div className="relative rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl shadow-indigo-500/20 overflow-hidden group transform-gpu">
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,transparent,black)]" />
        <BorderBeam duration={12} />
        
        {/* Header */}
        <div className="h-12 border-b border-white/10 flex items-center px-4 gap-4 bg-white/5 relative z-20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-3 py-1 rounded-md bg-black/50 border border-white/5 text-[10px] font-mono text-zinc-500 flex items-center gap-2">
              <ShieldCheck size={10} className="text-green-500" />
              auracv.app/builder
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 h-[500px] relative z-10">
          <div className="col-span-3 border-r border-white/10 bg-zinc-900/30 p-4 hidden md:block space-y-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="h-10 w-full rounded-lg bg-white/5 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
          <div className="col-span-12 md:col-span-9 p-8 relative">
             {/* Laser Scanner */}
             <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-br-xl">
               <motion.div 
                 animate={{ top: ["-10%", "110%"] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute left-0 right-0 h-px bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] w-full"
               />
               <motion.div 
                 animate={{ top: ["-10%", "110%"], opacity: [0, 0.5, 0] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute left-0 right-0 h-20 bg-gradient-to-b from-green-500/20 to-transparent"
               />
            </div>
            {/* Mockup */}
            <div className="w-full h-full bg-white rounded shadow-2xl p-12 relative overflow-hidden">
               <div className="flex justify-between items-start mb-8">
                  <div className="space-y-3">
                     <div className="h-8 w-64 bg-zinc-900 rounded-md" />
                     <div className="h-4 w-32 bg-zinc-400 rounded-md" />
                  </div>
                  <div className="h-16 w-16 bg-zinc-100 rounded-full" />
               </div>
               <div className="space-y-4 opacity-50">
                  <div className="h-4 w-full bg-zinc-200 rounded" />
                  <div className="h-4 w-5/6 bg-zinc-200 rounded" />
                  <div className="h-4 w-4/6 bg-zinc-200 rounded" />
               </div>
               {/* Result Badge */}
               <div className="absolute bottom-8 right-8 bg-black text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-3 z-20">
                 <div className="relative">
                    <div className="absolute inset-0 bg-green-500 blur-md opacity-50 animate-pulse" />
                    <Check className="relative z-10 text-green-400 w-5 h-5" />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">ATS Score</div>
                    <div className="text-sm font-bold">100/100</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- 4. ENGINE ARCHITECTURE (Pixel-Perfect Reconstruction) ---

const EngineArchitecture = () => {
  return (
    <section className="py-40 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Built on a foundation of <br/>
              <span className="text-zinc-500">fast, production-grade tooling</span>
            </h2>
          </div>
        </FadeIn>

        <div className="relative flex flex-col items-center">
          
          {/* --- THE CHIP --- */}
          <FadeIn delay={0.2} className="relative z-30 mb-0">
            <div className="relative flex items-center justify-center">
               {/* Chip Body */}
               <div className="w-52 h-20 bg-gradient-to-b from-[#222] to-[#111] rounded-xl border border-[#333] flex items-center justify-center shadow-2xl relative z-20">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/20 rounded-xl pointer-events-none" />
                  <span className="text-xl font-bold text-zinc-400 tracking-wide z-10">Powered By</span>
               </div>
               
               {/* Pins (Top) */}
               <div className="absolute -top-2 left-0 w-full flex justify-center gap-4">
                  {[...Array(6)].map((_, i) => (
                     <div key={`t-${i}`} className="w-2 h-3 bg-gradient-to-b from-[#555] to-[#222] rounded-[1px]" />
                  ))}
               </div>
               {/* Pins (Bottom) */}
               <div className="absolute -bottom-2 left-0 w-full flex justify-center gap-4">
                  {[...Array(6)].map((_, i) => (
                     <div key={`b-${i}`} className="w-2 h-3 bg-gradient-to-t from-[#555] to-[#222] rounded-[1px]" />
                  ))}
               </div>
               {/* Pins (Left) */}
               <div className="absolute top-0 h-full -left-2 flex flex-col justify-center gap-3">
                  {[...Array(3)].map((_, i) => (
                     <div key={`l-${i}`} className="w-3 h-2 bg-gradient-to-r from-[#555] to-[#222] rounded-[1px]" />
                  ))}
               </div>
               {/* Pins (Right) */}
               <div className="absolute top-0 h-full -right-2 flex flex-col justify-center gap-3">
                  {[...Array(3)].map((_, i) => (
                     <div key={`r-${i}`} className="w-3 h-2 bg-gradient-to-l from-[#555] to-[#222] rounded-[1px]" />
                  ))}
               </div>
            </div>
          </FadeIn>

          {/* --- CIRCUITRY (Corrected Logic) --- */}
          <div className="relative w-full max-w-6xl h-48 -mt-1 mb-0 z-10">
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid meet">
                <defs>
                   <linearGradient id="beam-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                      <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                   </linearGradient>
                   <linearGradient id="beam-pink" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
                      <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                   </linearGradient>
                   <linearGradient id="beam-orange" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                      <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                   </linearGradient>
                </defs>

                {/* Left Line (React) - Exits Left Side */}
                <path d="M 510 0 L 200 0 L 200 200" fill="none" stroke="#222" strokeWidth="2" className="opacity-60" />
                <motion.path 
                   d="M 510 0 L 200 0 L 200 200" 
                   fill="none" 
                   stroke="url(#beam-blue)" 
                   strokeWidth="3"
                   strokeDasharray="60 180"
                   initial={{ strokeDashoffset: 240 }}
                   animate={{ strokeDashoffset: 0 }}
                   transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
                />

                {/* Center Line (Turbopack) - Exits Bottom Center */}
                <path d="M 600 0 L 599 200" fill="none" stroke="#222" strokeWidth="2" className="opacity-60" />
                <motion.path 
                   d="M 600 0 L 599 200" 
                   fill="none" 
                   stroke="url(#beam-pink)" 
                   strokeWidth="3"
                   strokeDasharray="60 180"
                   initial={{ strokeDashoffset: 240 }}
                   animate={{ strokeDashoffset: 0 }}
                   transition={{ duration: 1.8, ease: "linear", repeat: Infinity, delay: 0.3 }}
                />

                {/* Right Line (SWC) - Exits Right Side */}
                <path d="M 690 0 L 1000 0 L 1000 200" fill="none" stroke="#222" strokeWidth="2" className="opacity-60" />
                <motion.path 
                   d="M 690 0 L 1000 0 L 1000 200" 
                   fill="none" 
                   stroke="url(#beam-orange)" 
                   strokeWidth="3"
                   strokeDasharray="60 180"
                   initial={{ strokeDashoffset: 240 }}
                   animate={{ strokeDashoffset: 0 }}
                   transition={{ duration: 2.5, ease: "linear", repeat: Infinity, delay: 0.8 }}
                />
             </svg>
          </div>

          {/* --- THE CARDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl z-20 px-4">
             
             {/* Card 1: React */}
             <FadeIn delay={0.4} className="w-full">
                <div className="h-full bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border border-white/[0.08] rounded-2xl p-10 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                   {/* Top Gradient Line */}
                   <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
                   
                   {/* React Icon */}
                   <div className="mb-8">
                      <div className="w-12 h-12 text-[#61DAFB]">
                         <svg viewBox="0 0 24 24" fill="none" className="w-full h-full animate-[spin_10s_linear_infinite]">
                            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
                            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.5" />
                            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                         </svg>
                      </div>
                   </div>
                   
                   <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                      React <ArrowRight size={14} className="text-zinc-700 group-hover:text-blue-500 transition-colors -rotate-45" />
                   </h3>
                   <p className="text-[15px] text-zinc-400 leading-relaxed">
                      The library for web and native user interfaces. Next.js is built on the latest React features, including Server Components and Actions.
                   </p>
                </div>
             </FadeIn>

             {/* Card 2: Turbopack */}
             <FadeIn delay={0.6} className="w-full">
                <div className="h-full bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border border-white/[0.08] rounded-2xl p-10 relative overflow-hidden group hover:border-pink-500/30 transition-all duration-500">
                   {/* Top Gradient Line */}
                   <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60" />
                   
                   {/* Turbopack Icon */}
                   <div className="mb-8">
                      <div className="w-12 h-12 rounded-xl border-[2.5px] border-pink-500 flex items-center justify-center">
                         <div className="w-5 h-5 bg-pink-500/20 rounded-md border-[1.5px] border-pink-500" />
                      </div>
                   </div>
                   
                   <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                      Turbopack <ArrowRight size={14} className="text-zinc-700 group-hover:text-pink-500 transition-colors -rotate-45" />
                   </h3>
                   <p className="text-[15px] text-zinc-400 leading-relaxed">
                      An incremental bundler optimized for JavaScript and TypeScript, written in Rust, and built into Next.js.
                   </p>
                </div>
             </FadeIn>

             {/* Card 3: SWC */}
             <FadeIn delay={0.8} className="w-full">
                <div className="h-full bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border border-white/[0.08] rounded-2xl p-10 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-500">
                   {/* Top Gradient Line */}
                   <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />
                   
                   {/* SWC Icon */}
                   <div className="mb-8">
                      <div className="text-orange-500 font-black text-3xl italic">
                         SWC
                      </div>
                   </div>
                   
                   <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                      Speedy Web Compiler <ArrowRight size={14} className="text-zinc-700 group-hover:text-orange-500 transition-colors -rotate-45" />
                   </h3>
                   <p className="text-[15px] text-zinc-400 leading-relaxed">
                      An extensible Rust-based platform for the next generation of fast developer tools, and can be used for both compilation and minification.
                   </p>
                </div>
             </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 5. SECTIONS & PAGE ---

const HowItWorks = () => (
  <section className="py-32 bg-black border-t border-white/5 relative z-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-20">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">So simple, it feels like magic.</h2>
          <p className="text-zinc-400">No sign-up. No paywall. Just open and build.</p>
        </FadeIn>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent border-t border-dashed border-zinc-800 z-0" />
        
        {[
          { step: "01", title: "Import or Start", desc: "Paste your old resume or start fresh with our structured form.", icon: FileJson },
          { step: "02", title: "Real-Time Edit", desc: "Fill in the blanks. See the PDF update instantly as you type.", icon: Terminal },
          { step: "03", title: "Local Export", desc: "Download a polished, ATS-ready PDF. Your data vanishes from our browser.", icon: ArrowRight }
        ].map((item, i) => (
          <FadeIn key={i} delay={i * 0.2} className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 shadow-2xl shadow-black/50">
              <item.icon size={32} className="text-white" />
            </div>
            <div className="text-xs font-mono text-indigo-500 mb-2">STEP {item.step}</div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-zinc-400 max-w-xs">{item.desc}</p>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const ForEveryone = () => (
  <section className="py-32 bg-zinc-950 relative z-20 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="mb-16">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for every career stage.</h2>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Whether you&apos;re applying for your first internship or your VP role, AuraCV adapts to you.
          </p>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FadeIn delay={0.2}>
          <Spotlight className="rounded-2xl bg-black border border-white/10 p-8 h-full">
            <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
              <GraduationCap className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Students & Grads</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Don&apos;t know what to write? Use our <strong>proven templates</strong> to structure your limited experience into a professional narrative.
            </p>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="flex gap-2"><Check size={16} className="text-blue-500" /> GPA & Coursework sections</li>
              <li className="flex gap-2"><Check size={16} className="text-blue-500" /> One-click formatting</li>
            </ul>
          </Spotlight>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Spotlight className="rounded-2xl bg-black border border-white/10 p-8 h-full">
            <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
              <Briefcase className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Career Switchers</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Highlight transferrable skills. Our <strong>AI Polish</strong> helps you rewrite past roles to match your new target industry keywords.
            </p>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="flex gap-2"><Check size={16} className="text-purple-500" /> Skill-based layouts</li>
              <li className="flex gap-2"><Check size={16} className="text-purple-500" /> Keyword gap analysis</li>
            </ul>
          </Spotlight>
        </FadeIn>

        <FadeIn delay={0.6}>
          <Spotlight className="rounded-2xl bg-black border border-white/10 p-8 h-full">
            <div className="h-12 w-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6">
              <User className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Senior Experts</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Focus on impact. Use our <strong>Minimalist</strong> theme to present 10+ years of experience without clutter. ATS safe.
            </p>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="flex gap-2"><Check size={16} className="text-emerald-500" /> Executive summaries</li>
              <li className="flex gap-2"><Check size={16} className="text-emerald-500" /> Multi-page support</li>
            </ul>
          </Spotlight>
        </FadeIn>
      </div>
    </div>
  </section>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
      scrolled ? "top-4 px-4" : "top-0 px-0"
    )}>
      <div className={cn(
        "mx-auto flex items-center justify-between transition-all duration-300",
        scrolled 
          ? "h-14 max-w-3xl rounded-full bg-black/60 backdrop-blur-xl border border-white/10 px-6 shadow-2xl" 
          : "h-20 w-full bg-transparent px-8"
      )}>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
            <Command size={16} className="text-black" strokeWidth={3} />
          </div>
          <span className="text-lg font-bold text-white hidden sm:block">AuraCV</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/builder">
            <button className={cn(
              "bg-white text-black font-bold hover:bg-zinc-200 transition-colors rounded-full",
              scrolled ? "px-4 py-1.5 text-xs" : "px-6 py-2 text-sm"
            )}>
              Launch Builder
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <AuroraBackground className="h-auto min-h-screen pt-40 pb-20 relative overflow-hidden">
    <RetroGrid />
    <Noise />
    
    <div className="container mx-auto relative z-10 text-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-3 py-1 text-xs font-medium text-zinc-300 mb-8 hover:bg-white/10 transition-colors"
      >
        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
        <span className="text-indigo-300">Local-First Engine v1.0</span>
      </motion.div>

      <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <span className="block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent pb-2">
            Craft Your
          </span>
        </motion.div>
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <div className="block bg-gradient-to-b from-white via-white to-zinc-600 bg-clip-text text-transparent pb-4">
            <ScrambleText text="Legacy." />
          </div>
        </motion.div>
      </h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        The privacy-first resume builder. <br className="hidden md:block" />
        <span className="text-zinc-200 font-medium">Your data stays on your computer.</span> Zero tracking.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        <Link href="/builder">
          <MagneticButton variant="primary" className="shadow-2xl shadow-indigo-500/20">
            Start Building Free <ArrowRight className="ml-2 w-4 h-4" />
          </MagneticButton>
        </Link>
      </motion.div>

      <HeroDashboard />
    </div>
  </AuroraBackground>
);

const Footer = () => (
  <footer className="bg-black py-20 border-t border-white/10 relative z-10">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
           <div className="flex items-center gap-2 mb-6">
              <Command className="text-white" />
              <span className="text-xl font-bold text-white">AuraCV</span>
           </div>
           <p className="text-zinc-500 text-lg max-w-sm">
              The open-source standard for privacy-first career building.
           </p>
        </div>
        <div>
           <h4 className="font-bold text-white mb-6">Product</h4>
           <ul className="space-y-4 text-zinc-500">
              <li><Link href="/builder" className="hover:text-white transition-colors">Builder</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Templates</Link></li>
           </ul>
        </div>
        <div>
           <h4 className="font-bold text-white mb-6">Legal</h4>
           <ul className="space-y-4 text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
           </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex justify-between items-center text-zinc-600 text-sm mt-12">
         <p>© 2025 AuraCV Inc. Open Source.</p>
         <div className="flex gap-6">
            <Github className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Globe className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
         </div>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <EngineArchitecture />
      <HowItWorks />
      <ForEveryone />
      
      <section className="py-40 relative overflow-hidden flex flex-col items-center justify-center z-20">
         <div className="absolute inset-0 bg-black" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_50%)] blur-3xl" />
         
         {/* Starfield effect (Warp Speed) */}
         <div className="absolute inset-0 opacity-40">
            <div className="absolute h-[2px] w-[2px] bg-white rounded-full top-1/2 left-1/2 shadow-[0_0_10px_2px_white] animate-star-1"></div>
            <div className="absolute h-[3px] w-[3px] bg-white rounded-full top-1/3 left-1/3 shadow-[0_0_10px_2px_white] animate-star-2"></div>
            <div className="absolute h-[2px] w-[2px] bg-white rounded-full top-2/3 left-2/3 shadow-[0_0_10px_2px_white] animate-star-3"></div>
         </div>
         
         <div className="relative z-10 text-center px-6">
             <h2 className="text-5xl md:text-9xl font-bold tracking-tighter mb-12 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
                 Ready to Build?
             </h2>
             <Link href="/builder">
                 <MagneticButton variant="primary" className="h-24 px-20 text-3xl shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-shadow duration-500">
                     Start Your Career
                 </MagneticButton>
             </Link>
         </div>
      </section>
      
      <Footer />
    </div>
  );
}