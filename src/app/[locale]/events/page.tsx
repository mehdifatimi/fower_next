import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default async function EventsPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('Index');

    const EVENTS = [
        {
            id: 1,
            title_fr: "Atelier Art Floral",
            title_ar: "ورشة تنسيق الزهور",
            date: "2024-03-15",
            time: "14:00 - 17:00",
            location_fr: "Boutique FLORAL ZAHRAE",
            location_ar: "بوتيك زهرة",
            image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop",
            price: "450 DH"
        },
        {
            id: 2,
            title_fr: "Festival des Roses",
            title_ar: "مهرجان الورود",
            date: "2024-04-20",
            time: "09:00 - 18:00",
            location_fr: "Jardins Majorelle",
            location_ar: "حدائق ماجوريل",
            image: "https://images.unsplash.com/photo-1490750967868-58cb75065ed4?q=80&w=800&auto=format&fit=crop",
            price: "Gratuit"
        },
        {
            id: 3,
            title_fr: "Exposition Printemps",
            title_ar: "معرض الربيع",
            date: "2024-05-10",
            time: "10:00 - 20:00",
            location_fr: "Palais des Congrès",
            location_ar: "قصر المؤتمرات",
            image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
            price: "100 DH"
        }
    ];

    return (
        <div className="min-h-screen bg-brand-cream/30">
            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-brand-sage-dark">
                <div className="absolute inset-0 opacity-40">
                    <Image
                        src="https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=2000&auto=format&fit=crop"
                        alt="Events Hero"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-serif text-brand-cream mb-4">
                        {locale === 'ar' ? 'فعالياتنا القادمة' : 'Nos Événements'}
                    </h1>
                    <p className="text-xl text-brand-gold/90 font-light max-w-2xl mx-auto">
                        {locale === 'ar'
                            ? 'انضم إلينا في ورش العمل والمعارض الحصرية'
                            : 'Rejoignez-nous pour nos ateliers exclusifs et expositions florales'}
                    </p>
                </div>
            </div>

            {/* Events Grid */}
            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {EVENTS.map((event) => (
                        <div key={event.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-brand-rose/10">
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={event.image}
                                    alt={locale === 'ar' ? event.title_ar : event.title_fr}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                                    <span className="text-brand-sage-dark font-bold text-sm">
                                        {event.price}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-serif text-brand-sage-dark mb-4">
                                    {locale === 'ar' ? event.title_ar : event.title_fr}
                                </h3>

                                <div className="space-y-3 text-brand-sage">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-brand-gold" />
                                        <span className="text-sm">{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-brand-gold" />
                                        <span className="text-sm">{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-brand-gold" />
                                        <span className="text-sm">
                                            {locale === 'ar' ? event.location_ar : event.location_fr}
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full mt-8 py-3 bg-brand-sage/5 hover:bg-brand-sage-dark text-brand-sage-dark hover:text-brand-cream rounded-xl transition-all duration-300 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                    {locale === 'ar' ? 'احجز مكانك' : 'Réserver votre place'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
