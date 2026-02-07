'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { Link } from '@/navigation';

export default function ContactSection() {
    const t = useTranslations('Index.contact');

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="bg-brand-sage-dark rounded-[3rem] overflow-hidden shadow-2xl relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                    <div className="flex flex-col lg:flex-row p-12 lg:p-20 items-center gap-16 relative z-10">
                        {/* Text Content */}
                        <div className="w-full lg:w-1/2 text-white space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                                    {t('badge')}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                                    {t('title')}
                                </h2>
                                <p className="text-lg text-brand-cream/80 max-w-md">
                                    {t('subtitle')}
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-sage-dark transition-all duration-300">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-brand-gold uppercase tracking-widest">{t('info')}</p>
                                        <p className="text-brand-cream">{t('address')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-sage-dark transition-all duration-300">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-brand-gold uppercase tracking-widest">{t('phone')}</p>
                                        <p className="text-brand-cream">{t('phone')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Side */}
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="w-full max-w-md bg-white rounded-3xl p-8 lg:p-10 shadow-xl"
                            >
                                <div className="space-y-6">
                                    <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center mb-6">
                                        <MessageSquare className="w-8 h-8 text-brand-sage-dark" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-brand-sage-dark">
                                        Collaboration Exclusive
                                    </h3>
                                    <p className="text-brand-sage leading-relaxed">
                                        Vous avez un projet spécial ? Parlons-en et créons quelque chose d'inoubliable ensemble.
                                    </p>
                                    <Link href="/contact" className="block">
                                        <button className="w-full py-4 bg-brand-sage-dark text-white rounded-full font-medium hover:bg-brand-sage transition-all shadow-lg uppercase tracking-widest text-sm">
                                            Ecrivez-nous
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
