import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

export default async function AboutPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('Index');

    return (
        <div className="min-h-screen bg-brand-cream/30">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1600&auto=format&fit=crop"
                    alt="Luxury Flowers"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-brand-sage-dark/20 mix-blend-multiply" />
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-serif text-white drop-shadow-lg mb-6">
                        {locale === 'ar' ? 'قصتنا' : 'Notre Histoire'}
                    </h1>
                    <div className="w-24 h-1 bg-brand-gold mx-auto" />
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block">L'Art de la Fleur</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-brand-sage-dark mb-10">
                        {locale === 'ar' ? 'فلورال زهراء: تجسيد للفخامة والأناقة' : 'FLORAL ZAHRAE : Quintessence de l\'Élégance'}
                    </h2>
                    <div className="space-y-8 text-brand-sage leading-relaxed text-lg italic">
                        <p>
                            Depuis notre création, FLORAL ZAHRAE s'est donné pour mission de transformer chaque instant en un souvenir impérissable. Plus qu'une boutique de fleurs, nous sommes des artisans de l'émotion.
                        </p>
                        <p>
                            Chaque composition que nous créons est une œuvre d'art unique, élaborée avec les fleurs les plus rares et les plus fraîches, sélectionnées pour leur beauté exceptionnelle et leur parfum envoûtant.
                        </p>
                    </div>
                    <div className="w-1 bg-brand-rose h-24 my-16 opacity-30" />
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-rose/20">
                            <Image
                                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop"
                                alt="Artisanal Arrangement"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-3xl font-serif text-brand-sage-dark">Engagement Artisanal</h3>
                            <p className="text-brand-sage leading-relaxed">
                                Nos artisans fleuristes marient savoir-faire traditionnel et vision contemporaine pour concevoir des bouquets qui respirent la vie et le luxe. Nous croyons que la perfection réside dans le détail : de la sélection du ruban de soie à l'équilibre subtil des nuances.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold">✨</div>
                                    <span className="text-brand-sage-dark font-medium">Excellence Florale</span>
                                </div>
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold">🚚</div>
                                    <span className="text-brand-sage-dark font-medium">Livraison Signature</span>
                                </div>
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold">🌿</div>
                                    <span className="text-brand-sage-dark font-medium">Durabilité et Passion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
