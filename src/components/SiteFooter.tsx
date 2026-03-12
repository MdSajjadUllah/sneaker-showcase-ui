import { Instagram, Twitter, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

export function SiteFooter() {
  return (
    <footer id="footer" className="border-t border-foreground/[0.06] pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-3xl text-gradient mb-4 tracking-wider">NEXUS</h3>
            <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-xs">
              Premium footwear for those who demand excellence in every step they take.
            </p>
          </div>
          {[
            { title: 'Shop', links: ['New Arrivals', 'Best Sellers', 'Sale', 'All Shoes'] },
            { title: 'Support', links: ['Help Center', 'Returns', 'Shipping', 'Size Guide'] },
            { title: 'Company', links: ['About', 'Careers', 'Press', 'Sustainability'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="neumorphic p-8 md:p-10 mb-16 metallic-border text-center">
          <h4 className="font-display text-2xl text-gradient mb-2">STAY IN THE LOOP</h4>
          <p className="font-body text-xs text-muted-foreground mb-6">Get early access to drops & exclusive offers.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-full bg-muted border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
            />
            <button className="px-8 py-3 rounded-full btn-metallic font-body text-xs uppercase tracking-wider">
              Join
            </button>
          </div>
        </div>

        <div className="gradient-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2026 NEXUS. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-3 rounded-full glass metallic-border text-muted-foreground hover:text-foreground transition-all duration-300"
                aria-label="Social media"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
