'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

const partners = [
  { name: 'FitLife Academy', initials: 'FL' },
  { name: 'Iron Gym', initials: 'IG' },
  { name: 'Pulse Fitness', initials: 'PF' },
  { name: 'Elite Training', initials: 'ET' },
  { name: 'Body Works', initials: 'BW' },
  { name: 'Vitality Club', initials: 'VC' },
];

export default function PartnersLogos() {
  const { locale } = useLocale();

  const trustedByText = {
    pt: 'Usado por academias e profissionais em todo o Brasil',
    en: 'Used by gyms and professionals across Brazil',
    es: 'Utilizado por gimnasios y profesionales en todo Brasil',
  };

  return (
    <section className="py-12 px-6 border-y border-border/50 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          {trustedByText[locale]}
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                  <span className="text-sm font-bold text-primary/70 group-hover:text-primary transition-colors">
                    {partner.initials}
                  </span>
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block">
                  {partner.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
