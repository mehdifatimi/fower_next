import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';

export default async function EventsPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('Index.events');

    const services = [
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
        <div className="min-h-screen bg-brand-cream/30">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-sage-dark">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/herosection.png"
                        alt="Events Hero"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
                </div>
                <div className="relative z-10 text-center px-6 text-white max-w-4xl mx-auto">
                    <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
                        {t('badge')}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
                        {t('title')}
                    </h1>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {services.map((service) => (
                        <div key={service.key} className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-brand-rose/10 flex flex-col">
                            <Link href={`/events/${service.key}`} className="relative h-80 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={t(`${service.key}.title`)}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </Link>

                            <div className="p-10 flex-grow flex flex-col items-center text-center">
                                <Link href={`/events/${service.key}`}>
                                    <h3 className="text-3xl font-serif text-brand-sage-dark mb-6 hover:text-brand-gold transition-colors">
                                        {t(`${service.key}.title`)}
                                    </h3>
                                </Link>

                                <p className="text-brand-sage leading-relaxed mb-8 flex-grow italic">
                                    "{t(`${service.key}.desc`)}"
                                </p>

                                <Link href={`/events/${service.key}`} className="w-full">
                                    <button className="w-full py-4 px-6 border border-brand-sage-dark text-brand-sage-dark font-bold rounded-xl hover:bg-brand-sage-dark hover:text-white transition-all duration-300 uppercase tracking-widest text-xs flex items-center justify-center gap-2 group/btn">
                                        Voir les détails
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 text-center bg-brand-sage-dark text-white rounded-3xl p-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-serif mb-8">
                            Un événement sur mesure ?
                        </h2>
                        <p className="text-brand-cream/80 max-w-2xl mx-auto mb-10 text-lg">
                            Nos artisans fleuristes sont à votre écoute pour transformer vos idées en réalité florale époustouflante.
                        </p>
                        <Link href="/contact">
                            <button className="px-12 py-5 bg-brand-gold text-white font-bold rounded-full hover:bg-white hover:text-brand-sage-dark transition-all duration-500 shadow-xl uppercase tracking-widest text-sm transform hover:scale-105">
                                Prendre un rendez-vous
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
