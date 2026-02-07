'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';

export default function HeroSection() {
    const t = useTranslations('Index.hero');

    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/herosection.png"
                    alt="Floral Luxury Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-30 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-sage-dark/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-20 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block drop-shadow-lg">
                        Art Floral d'Excellence
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif mb-8 leading-tight drop-shadow-2xl">
                        {t('title')}
                    </h1>
                    <p className="text-lg md:text-2xl text-brand-cream max-w-3xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md">
                        {t('subtitle')}
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link href="/shop">
                            <button className="group relative px-10 py-5 bg-white text-brand-sage-dark font-bold rounded-full hover:bg-brand-gold hover:text-white transition-all duration-500 shadow-2xl transform hover:scale-105 uppercase tracking-[0.2em] text-sm overflow-hidden">
                                <span className="relative z-10">{t('cta')}</span>
                                <div className="absolute inset-0 bg-brand-sage-dark -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                            </button>
                        </Link>

                        <Link href="/about">
                            <button className="px-10 py-5 border-2 border-white/50 text-white font-bold rounded-full hover:border-white hover:bg-white/10 transition-all duration-500 uppercase tracking-[0.2em] text-sm backdrop-blur-sm">
                                Notre Histoire
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent mx-auto animate-pulse" />
            </motion.div>
        </section>
    );
}
