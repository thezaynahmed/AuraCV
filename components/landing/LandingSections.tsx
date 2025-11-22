'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { Plus, Server, CheckCircle, GitMerge, XCircle, Shield } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

// --- 1. Comparison Section ---

const FakeTextLine = ({ isSuccess, delay }: { isSuccess: boolean; delay: number }) => {
    const iconVariants: Variants = {
        hidden: { scale: 0, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { delay: delay + 0.7, type: "spring", stiffness: 300, damping: 20 } },
    };
    const Icon = isSuccess ? CheckCircle : XCircle;

    return (
        <div className={cn("relative h-2 rounded-sm bg-zinc-700/80", !isSuccess && "rotate-[-1deg] last:w-5/6 odd:w-11/12")}>
            <motion.div variants={iconVariants} className="absolute -right-6 top-1/2 -translate-y-1/2">
                <Icon className={cn("w-4 h-4", isSuccess ? "text-green-500" : "text-red-500")} />
            </motion.div>
        </div>
    );
};

const AtsScanner = ({ isSuccess = false }: { isSuccess?: boolean }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.6 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return (
        <div ref={ref} className="h-full rounded-lg bg-zinc-900 p-4 border border-white/10 space-y-3 relative overflow-hidden">
            <motion.div
                className="space-y-2"
                initial="hidden"
                animate={controls}
                transition={{ staggerChildren: 0.1 }}
            >
                <div className="w-1/2 h-4 rounded bg-zinc-700"></div>
                <FakeTextLine isSuccess={isSuccess} delay={0.2} />
                <FakeTextLine isSuccess={isSuccess} delay={0.4} />
                <FakeTextLine isSuccess={isSuccess} delay={0.6} />
                <FakeTextLine isSuccess={isSuccess} delay={0.8} />
                <FakeTextLine isSuccess={isSuccess} delay={1.0} />
            </motion.div>
            <motion.div
                className={cn("absolute w-full h-0.5", isSuccess ? "bg-green-500/50" : "bg-red-500/50")}
                initial={{ top: "0%" }}
                animate={isInView ? { top: "100%", transition: { duration: 1, delay: 0.2, ease: "easeInOut" } } : {}}
            >
                 <div className={cn("w-full h-full", isSuccess ? "bg-green-400" : "bg-red-500")}></div>
            </motion.div>
            <motion.div 
                className={cn("absolute bottom-2 right-3 font-mono text-xs", isSuccess ? "text-green-400" : "text-red-400")}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1, transition: { delay: 1.5, duration: 0.5 } } : {}}
            >
                {isSuccess ? "Status: Match Found" : "Status: Parse Error"}
            </motion.div>
        </div>
    );
};

export const ComparisonSection = () => (
    <motion.section
        className="py-24 px-6 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
    >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 opacity-50" />


        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                Don&apos;t let robots reject you.
            </h2>
            <p className="mt-4 text-lg text-zinc-400 max-w-3xl mx-auto">
                75% of resumes are rejected by ATS software before a human ever sees them. AuraCV is engineered to pass the scan, every time.
            </p>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <div className="p-6 rounded-xl border border-white/10 bg-zinc-950 shadow-2xl">
                    <div className="relative h-64"><AtsScanner /></div>
                    <p className="font-medium text-zinc-400 mt-4 text-center">
                        Messy formatting confuses hiring robots.
                    </p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-zinc-950 shadow-2xl">
                    <div className="relative h-64"><AtsScanner isSuccess={true} /></div>
                    <p className="font-medium text-zinc-400 mt-4 text-center">
                        Structured data gets you the interview.
                    </p>
                </div>
            </div>
        </div>
    </motion.section>
);


// --- 2. Templates Section ---

const TemplateThumbnail = ({ isDark }: { isDark?: boolean }) => {
  const bgColor = isDark ? 'bg-zinc-800' : 'bg-white';
  const lineBg = isDark ? 'bg-zinc-600/70' : 'bg-zinc-300';
  const headerBg = isDark ? 'bg-zinc-700' : 'bg-zinc-400';

  return (
    <div
      className={cn(
        'w-[200px] h-[280px] rounded-lg shadow-xl border border-white/20 p-4 flex gap-3',
        bgColor
      )}
    >
      <div className="w-1/4 space-y-2">
        <div className={cn('h-8 rounded', headerBg)}></div>
        <div className={cn('h-2 rounded', lineBg)}></div>
        <div className={cn('h-2 rounded', lineBg)}></div>
        <div className={cn('h-2 w-2/3 rounded', lineBg)}></div>
      </div>
      <div className="w-3/4 space-y-2">
        <div className={cn('h-5 w-5/6 rounded', headerBg)}></div>
        <div className={cn('h-2 rounded', lineBg)}></div>
        <div className={cn('h-2 rounded', lineBg)}></div>
        <div className={cn('h-2 w-5/6 rounded', lineBg)}></div>
        <div className="pt-2">
          <div className={cn('h-3 w-1/3 rounded', headerBg)}></div>
        </div>
        <div className={cn('h-2 rounded', lineBg)}></div>
        <div className={cn('h-2 rounded', lineBg)}></div>
      </div>
    </div>
  );
};

const MarqueeContent = ({ 'aria-hidden': ariaHidden }: { 'aria-hidden'?: boolean }) => (
  <div className="flex shrink-0 items-center gap-8 px-4" aria-hidden={ariaHidden}>
    {Array.from({ length: 4 }).map((_, i) => (
      <TemplateThumbnail key={i} isDark={true} />
    ))}
    {Array.from({ length: 4 }).map((_, i) => (
      <TemplateThumbnail key={i + 4} isDark={false} />
    ))}
  </div>
);

export const TemplatesSection = () => (
    <motion.section
        className="py-24 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
    >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
        <div className="text-center max-w-3xl mx-auto mb-12 px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                Crafted for Every Career
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
                Minimalist, professional templates that stand out. Whether you&apos;re a student, engineer, or executive.
            </p>
        </div>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-scroll">
                <MarqueeContent />
                <MarqueeContent aria-hidden={true} />
            </div>
        </div>
    </motion.section>
);


// --- 3. System Stats ---

const stats = [
    { value: "0ms", label: "Latency", icon: Server, description: "Local-first architecture means zero delay." },
    { value: "100%", label: "Parse Rate", icon: CheckCircle, description: "Built to be read perfectly by any ATS." },
    { value: "Local", label: "Data Storage", icon: Shield, description: "Your data stays on your device, always." },
    { value: "MIT", label: "License", icon: GitMerge, description: "Free and open-source, forever." }
];

export const StatsSection = () => (
    <motion.section 
        className="py-24 px-6 border-t border-b border-white/10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
    >
        <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">A System Built for Results</h2>
                <p className="mt-4 text-lg text-zinc-400">
                    Every detail is optimized for a single purpose: getting you hired.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <SpotlightCard key={i} className="p-8 text-center">
                        <stat.icon className="w-10 h-10 mx-auto mb-6 text-zinc-400" />
                        <p className="text-5xl font-bold tracking-tighter text-white">{stat.value}</p>
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-2">{stat.label}</p>
                        <p className="text-sm text-zinc-400 mt-4">{stat.description}</p>
                    </SpotlightCard>
                ))}
            </div>
        </div>
    </motion.section>
);

// --- 4. FAQ Section ---

const faqs = [
    {
    q: "Is it really free?",
    a: "Yes. This project is open-source under the MIT License. It's free to use, modify, and distribute. No hidden paywalls, ever."
  },
  {
    q: "Where is my data stored?",
    a: "Locally on your device. We use `localStorage` to save your progress. Your JSON data never touches a server, ensuring 100% privacy and GDPR compliance."
  },
  {
    q: "Can I import from LinkedIn?",
    a: "Not yet. To ensure strict ATS compliance, we currently require manual entry. A 'Profile Import' feature (PDF parsing) is on the roadmap for v2."
  },
  {
    q: "How many templates are available?",
    a: "We launched with 3 'Master' templates: The ATS Classic (for scanners), The Modern (for product roles), and The Minimalist (for executives). More community themes are coming soon."
  }
];

export const FAQSection = () => (
    <motion.section 
        className="py-24 px-6"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
    >
        <div className="max-w-2xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                    Common Questions
                </h2>
                <p className="mt-4 text-lg text-zinc-400">
                    Quick answers to the most frequent questions about AuraCV.
                </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
                        <AccordionTrigger className="text-lg text-left font-medium text-white hover:text-zinc-200 group py-6">
                           <div className="flex items-center gap-4">
                                <span className="font-mono text-sm text-zinc-600">0{i + 1}</span>
                                <span className="flex-1">{faq.q}</span>
                            </div>
                            <Plus className="h-5 w-5 ml-auto shrink-0 text-zinc-500 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                        </AccordionTrigger>
                        <AccordionContent className="text-zinc-400 pt-2 pb-6 leading-relaxed pl-10">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    </motion.section>
);



export function AllLandingSections() {
    return (
        <>
            <ComparisonSection />
            <TemplatesSection />
            <StatsSection />
            <FAQSection />
        </>
    )
}
