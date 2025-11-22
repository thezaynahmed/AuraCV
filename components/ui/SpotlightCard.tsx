'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming this utility exists from shadcn setup

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

export const SpotlightCard = ({ children, className }: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isInside) {
        const rect = card.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isInside]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      className={cn(
        'relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 p-8 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-white/5',
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.05), transparent 80%)`,
        }}
        animate={{ opacity: isInside ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};