import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createClient } from '@/lib/supabase-server';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default async function CategoriesPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('Index');
    const supabase = await createClient();

    // Fetch Categories
    const { data: categories } = await supabase
        .from('categories')
        .select('id, name_fr, name_ar, slug, description_fr, description_ar');

    return (
        <div className="min-h-screen bg-brand-cream/30 py-24">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-serif text-brand-sage-dark mb-6">
                        {locale === 'ar' ? 'تصنيفاتنا' : 'Nos Catégories'}
                    </h1>
                    <p className="text-brand-sage max-w-xl mx-auto">
                        Explorez nos collections thématiques, de l'élégance classique aux créations saisonnières.
                    </p>
                    <div className="w-24 h-[1px] bg-brand-gold mx-auto mt-8" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories && categories.length > 0 ? (
                        categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/${locale}/shop?category=${cat.slug}`}
                                className="group bg-white p-8 rounded-3xl border border-brand-rose/10 shadow-xl shadow-brand-rose/5 hover:border-brand-gold/30 transition-all text-center flex flex-col items-center justify-between h-full"
                            >
                                <div>
                                    <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">🌸</span>
                                    </div>
                                    <h3 className="text-2xl font-serif text-brand-sage-dark mb-4 group-hover:text-brand-gold transition-colors">
                                        {locale === 'ar' ? cat.name_ar : cat.name_fr}
                                    </h3>
                                    <p className="text-brand-sage text-sm line-clamp-3 mb-6">
                                        {locale === 'ar' ? cat.description_ar : cat.description_fr}
                                    </p>
                                </div>
                                <span className="flex items-center text-xs uppercase tracking-widest font-bold text-brand-gold">
                                    {locale === 'ar' ? 'عرض المجموعة' : 'Voir la Collection'}
                                    <ChevronRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
                                </span>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-brand-sage opacity-50 italic">
                            Aucune catégorie n'est encore disponible.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
