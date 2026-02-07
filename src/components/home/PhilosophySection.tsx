'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Award, Heart, Sparkles } from 'lucide-react';

export default function PhilosophySection() {
    const t = useTranslations('Index.philosophy');

    const items = [
        { icon: Award, title: t('item1.title'), desc: t('item1.desc') },
        { icon: Sparkles, title: t('item2.title'), desc: t('item2.desc') },
        { icon: Heart, title: t('item3.title'), desc: t('item3.desc') },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                            {t('badge')}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-brand-sage-dark">
                            {t('title')}
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="text-center group"
                        >
                            <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-sage-dark group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                                <item.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-serif text-brand-sage-dark mb-4">{item.title}</h3>
                            <p className="text-brand-sage leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
