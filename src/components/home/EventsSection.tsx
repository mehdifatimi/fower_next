'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/navigation';
import { ArrowRight } from 'lucide-react';

export default function EventsSection() {
    const t = useTranslations('Index.events');

    const eventTypes = [
        {
            key: 'marriage',
            image: '/marriage_hero.jpg',
        },
        {
            key: 'birthday',
            image: '/birthday_hero.jpg',
        },
        {
            key: 'corporate',
            image: '/corporate_hero.jpg',
        }
    ];

    return (
        <section className="py-24 bg-brand-cream/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {eventTypes.map((event, index) => (
                        <motion.div
                            key={event.key}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Link
                                href={`/events/${event.key}`}
                                className="group relative block h-[500px] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
                            >
                                <Image
                                    src={event.image}
                                    alt={t(`${event.key}.title`)}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                                    <h3 className="text-2xl font-serif mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {t(`${event.key}.title`)}
                                    </h3>
                                    <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3 italic">
                                        {t(`${event.key}.desc`)}
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        Découvrir <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
