import { createClient } from '@/lib/supabase-server';
import { setRequestLocale } from 'next-intl/server';
import { getPublicImageUrl } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from '@/navigation';

export default async function ProductDetailsPage({
    params
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    const supabase = await createClient();

    const { data: flower } = await supabase
        .from('flowers')
        .select('*, categories(name_fr, name_ar), flower_variants(*)')
        .eq('id', id)
        .single();

    if (!flower) {
        notFound();
    }

    const name = locale === 'ar' ? flower.name_ar : flower.name_fr;
    const description = locale === 'ar' ? flower.description_ar : flower.description_fr;
    const category = locale === 'ar' ? flower.categories?.name_ar : flower.categories?.name_fr;

    return (
        <div className="min-h-screen bg-brand-cream/30 py-20">
            <div className="container mx-auto px-6">
                <nav className="mb-8 flex items-center gap-2 text-sm text-brand-sage">
                    <Link href="/shop" className="hover:text-brand-gold transition-colors">
                        {locale === 'ar' ? 'المتجر' : 'Boutique'}
                    </Link>
                    <span>/</span>
                    <span className="text-brand-sage-dark">{name}</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 shadow-sm">
                    {/* Image Section */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-cream/30">
                        <Image
                            src={getPublicImageUrl(flower.images?.m)}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col">
                        <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-bold mb-4">
                            {category}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif text-brand-sage-dark mb-6">
                            {name}
                        </h1>
                        <p className="text-2xl font-medium text-brand-sage-dark mb-8">
                            {flower.price} MAD
                        </p>

                        <div className="prose prose-sage max-w-none mb-10">
                            <p className="text-brand-sage text-lg leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Note: In a full app, we would add the size selector and cart button here too */}
                        <div className="mt-auto pt-8 border-t border-brand-cream">
                            <Link
                                href="/shop"
                                className="inline-block px-8 py-4 bg-brand-sage-dark text-brand-cream font-medium rounded-full hover:bg-brand-sage transition-all text-center"
                            >
                                {locale === 'ar' ? 'العودة للمتجر' : 'Retour à la boutique'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
