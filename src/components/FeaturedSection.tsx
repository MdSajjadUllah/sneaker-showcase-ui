import { motion } from 'framer-motion';
import sneakerWhite from '@/assets/sneaker-white.png';

export function FeaturedSection() {
  return (
    <section id="featured" className="py-24 md:py-32 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-foreground/[0.02] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 rounded-full glass metallic-border mb-6">
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Featured Drop</p>
            </div>
            <h2 className="font-display text-5xl md:text-8xl text-gradient mb-6 leading-[0.9]">AIR<br />PHANTOM X</h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-10 max-w-md text-sm">
              Crafted with aerospace-grade materials and adaptive cushioning technology.
              Every step is engineered for maximum energy return and zero compromise.
            </p>

            {/* Specs in neumorphic boxes */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { label: 'Weight', value: '248g' },
                { label: 'Drop', value: '8mm' },
                { label: 'Cushion', value: 'Max' },
              ].map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="neumorphic p-4 text-center metallic-border"
                >
                  <p className="font-display text-2xl text-gradient">{spec.value}</p>
                  <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{spec.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#products"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-10 py-4 btn-metallic font-body text-sm uppercase tracking-[0.2em] rounded-full"
            >
              Shop Now — $219
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center relative"
          >
            {/* Glow behind shoe */}
            <div className="absolute w-64 h-64 rounded-full bg-foreground/[0.04] blur-[80px]" />

            <motion.img
              src={sneakerWhite}
              alt="Air Phantom X premium sneaker"
              className="w-full max-w-md drop-shadow-2xl relative z-10"
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
