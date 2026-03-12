import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';
import { RotateCw, ZoomIn, Palette, Smartphone } from 'lucide-react';
import sneakerWhite from '@/assets/sneaker-white.png';
import sneakerBlack from '@/assets/sneaker-black.png';
import sneakerRed from '@/assets/sneaker-red.png';
import sneakerGrey from '@/assets/sneaker-grey.png';
import sneakerBlue from '@/assets/sneaker-blue.png';

const colorOptions = [
  { name: 'Phantom White', color: 'hsl(0 0% 90%)', image: sneakerWhite },
  { name: 'Shadow Black', color: 'hsl(0 0% 15%)', image: sneakerBlack },
  { name: 'Blaze Red', color: 'hsl(0 72% 51%)', image: sneakerRed },
  { name: 'Cloud Grey', color: 'hsl(0 0% 55%)', image: sneakerGrey },
  { name: 'Velocity Blue', color: 'hsl(220 80% 55%)', image: sneakerBlue },
];

export function InteractiveViewer() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="viewer" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Interactive</p>
          <h2 className="font-display text-5xl md:text-7xl text-gradient">3D EXPERIENCE</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="neumorphic p-6 md:p-10 metallic-border">
            {/* Viewer area */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-square md:aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-secondary via-muted to-secondary flex items-center justify-center cursor-grab active:cursor-grabbing mb-6"
              style={{ perspective: '1200px' }}
            >
              {/* Grid pattern background */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />

              <motion.img
                key={selectedColor}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: zoom }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ rotateX, rotateY }}
                src={colorOptions[selectedColor].image}
                alt={colorOptions[selectedColor].name}
                className="w-3/4 md:w-1/2 object-contain drop-shadow-2xl pointer-events-none select-none"
                draggable={false}
              />

              {/* Corner labels */}
              <div className="absolute top-4 left-4 font-body text-[10px] uppercase tracking-widest text-muted-foreground/60">
                Move cursor to rotate
              </div>
              <div className="absolute bottom-4 right-4 font-body text-[10px] uppercase tracking-widest text-muted-foreground/60">
                360° View
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Color swatches */}
              <div className="flex items-center gap-3">
                <span className="font-body text-xs uppercase tracking-wider text-muted-foreground mr-2">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Color
                </span>
                {colorOptions.map((opt, i) => (
                  <button
                    key={opt.name}
                    onClick={() => setSelectedColor(i)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      i === selectedColor
                        ? 'border-foreground scale-110 shadow-lg'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    style={{ background: opt.color }}
                    aria-label={`Select ${opt.name}`}
                    title={opt.name}
                  />
                ))}
              </div>

              {/* Zoom + AR */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setZoom(z => Math.min(z + 0.2, 1.8))}
                  className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoom(1)}
                  className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                  aria-label="Reset rotation"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all font-body text-xs uppercase tracking-wider"
                  aria-label="Try on with AR"
                >
                  <Smartphone className="w-4 h-4" />
                  AR Try-On
                </button>
              </div>
            </div>

            {/* Selected color label */}
            <div className="text-center mt-4">
              <p className="font-display text-xl text-foreground">{colorOptions[selectedColor].name}</p>
              <p className="font-body text-xs text-muted-foreground">Air Phantom X — $219</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
