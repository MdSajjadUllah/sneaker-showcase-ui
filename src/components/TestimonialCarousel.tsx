import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sajid Arefin Saad',
    role: 'Marathon Runner',
    text: "These are hands down the best running shoes I've ever owned. The cushioning is unreal and they look incredible on the track.",
    rating: 5,
    avatar: 'SA',
  },
  {
    name: 'Maisha Noor',
    role: 'Streetwear Designer',
    text: "The design language is on another level. I get compliments every single time I wear them. Perfect blend of form and function.",
    rating: 5,
    avatar: 'MN',
  },
  {
    name: 'Udoy Rebeiro',
    role: 'Fitness Coach',
    text: "I train 6 days a week and these hold up beautifully. The support is phenomenal and the breathability keeps my feet cool.",
    rating: 5,
    avatar: 'UR',
  },
  {
    name: 'Shahadat Hossain',
    role: 'Sneaker Collector',
    text: "After 200+ pairs, I can confidently say this is the most premium sneaker experience I've had. Worth every penny.",
    rating: 5,
    avatar: 'SH',
  },
];
export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-foreground/[0.02] blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Testimonials</p>
          <h2 className="font-display text-5xl md:text-7xl text-gradient">VOICES</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="neumorphic p-8 md:p-12 relative metallic-border min-h-[280px] flex flex-col justify-center">
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-foreground/[0.06]">
              <Quote className="w-12 h-12" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                  ))}
                </div>
                <p className="font-body text-base md:text-lg text-foreground/90 leading-relaxed mb-8 italic">
                  "{testimonials[current].text}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full btn-metallic flex items-center justify-center font-body text-xs font-bold">
                    {testimonials[current].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-display text-lg text-foreground">{testimonials[current].name}</p>
                    <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-6 mt-8 items-center">
            <button
              onClick={prev}
              className="p-3 rounded-full glass metallic-border text-muted-foreground hover:text-foreground transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current ? 'bg-foreground w-8' : 'bg-muted-foreground/30 w-1.5'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full glass metallic-border text-muted-foreground hover:text-foreground transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
