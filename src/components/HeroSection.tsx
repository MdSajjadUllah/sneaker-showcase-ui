import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-sneaker.png';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle zoom animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      >
        <img
          src={heroImage}
          alt="Premium sneaker floating in dramatic lighting"
          className="w-full h-full object-cover opacity-50"
          loading="eager"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

      {/* Decorative metallic ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-foreground/[0.03] animate-spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-foreground/[0.05] animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        {/* Slogan box with gradient border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mb-8"
        >
          <div className="relative px-6 py-2 rounded-full metallic-border glass">
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.4em] text-muted-foreground">
              New Collection — 2026
            </p>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-7xl md:text-[12rem] leading-[0.82] tracking-tight text-gradient mb-8"
        >
          JUST DO IT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Precision engineered. Relentlessly tested. Built for those who never stop pushing boundaries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#products"
            className="inline-flex items-center justify-center px-10 py-4 btn-metallic font-body text-sm uppercase tracking-[0.2em] rounded-full"
          >
            Shop Now
          </a>
          <a
            href="#viewer"
            className="inline-flex items-center justify-center px-10 py-4 btn-outline-metallic font-body text-sm uppercase tracking-[0.2em] rounded-full"
          >
            3D Experience
          </a>
        </motion.div>
      </div>

     
    </section>
  );
}
