'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/navigation';

export default function AboutSection() {
    const t = useTranslations('Index.about');

    return (
        <section className="py-24 bg-brand-cream/30 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative h-[500px] md:h-[600px]"
                    >
                        <div className="absolute inset-0 border-[20px] border-white z-10 translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8" />
                        <Image
                            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1200&auto=format&fit=crop"
                            alt="Floral Craftsmanship"
                            fill
                            className="object-cover rounded-sm shadow-2xl"
                        />
                    </motion.div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                                {t('badge')}
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-sage-dark leading-tight mb-8">
                                {t('title')}
                            </h2>
                            <p className="text-lg text-brand-sage leading-relaxed mb-10 max-w-xl">
                                {t('text')}
                            </p>
                            <Link href="/about">
                                <button className="group relative px-8 py-4 overflow-hidden border border-brand-sage-dark text-brand-sage-dark hover:text-white transition-colors duration-500 rounded-full">
                                    <span className="relative z-10 uppercase tracking-widest text-xs font-bold">
                                        {t('cta')}
                                    </span>
                                    <div className="absolute inset-0 bg-brand-sage-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
