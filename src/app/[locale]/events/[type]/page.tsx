import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { CheckCircle2, ArrowLeft, MessageSquare, Phone } from 'lucide-react';
import { Link } from '@/navigation';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ locale: string; type: string }>;
}

export default async function ServiceDetailPage({ params }: Props) {
    const { locale, type } = await params;
    setRequestLocale(locale);

    // Validate type
    const validTypes = ['marriage', 'birthday', 'corporate'];
    if (!validTypes.includes(type)) {
        notFound();
    }

    const t = await getTranslations('Index.events');

    // Image mapping
    const images: Record<string, string> = {
        marriage: '/marriage_hero.jpg',
        birthday: '/birthday_hero.jpg',
        corporate: '/corporate_hero.jpg'
    };

    // Gallery mapping
    const galleries: Record<string, string[]> = {
        marriage: ['/marriage_1.jpg', '/marriage_2.jpg'],
        birthday: ['/birthday_1.jpg'],
        corporate: ['/corporate_1.png']
    };

    const gallery = galleries[type] || [];

    // Safely get features array
    const features = t.raw(`${type}.features`) as string[];

    return (
        <div className="min-h-screen bg-brand-cream/20">
            {/* Header / Hero */}
            <div className="relative h-[60vh] min-h-[500px] flex items-end">
                <Image
                    src={images[type]}
                    alt={t(`${type}.title`)}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="container mx-auto px-6 pb-20 relative z-10 text-white text-center">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
                        <span className="uppercase tracking-widest text-xs font-bold">Retour aux services</span>
                    </Link>
                    <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight">
                        {t(`${type}.title`)}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-sm uppercase tracking-[0.4em] text-brand-gold font-bold mb-6">
                            L'Expérience Floral Zahrae
                        </h2>
                        <p className="text-2xl md:text-3xl font-serif text-brand-sage-dark mb-10 leading-relaxed italic">
                            {t(`${type}.full_desc`)}
                        </p>

                        <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-rose/10">
                            <h3 className="text-xl font-bold text-brand-sage-dark mb-8">Ce que nous proposons :</h3>
                            <ul className="space-y-6">
                                {features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                                        <span className="text-brand-sage text-lg">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        {/* Summary Box */}
                        <div className="bg-brand-sage-dark text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                            <h3 className="text-3xl font-serif mb-6 relative z-10">Prêt à sublimer votre événement ?</h3>
                            <p className="text-brand-cream/80 mb-10 text-lg relative z-10">
                                Chaque demande est unique. Contactez-nous pour une étude personnalisée de votre projet.
                            </p>

                            <div className="flex flex-col gap-4 relative z-10">
                                <Link href={`/contact?service=${type}`}>
                                    <button className="w-full py-5 bg-brand-gold text-white font-bold rounded-full hover:bg-white hover:text-brand-sage-dark transition-all duration-500 shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-3">
                                        <MessageSquare className="w-5 h-5" />
                                        Demander un devis
                                    </button>
                                </Link>
                                <a href="https://wa.me/212762818313" target="_blank" rel="noopener noreferrer">
                                    <button className="w-full py-5 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-500 uppercase tracking-widest text-sm flex items-center justify-center gap-3">
                                        <Phone className="w-5 h-5" />
                                        Discuter sur WhatsApp
                                    </button>
                                </a>
                            </div>
                        </div>

                        {/* Custom Gallery Rendering */}
                        <div className={`grid ${gallery.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
                            {gallery.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`relative h-72 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-[1.02] ${idx % 2 !== 0 ? 'mt-8' : ''}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${type} gallery ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
