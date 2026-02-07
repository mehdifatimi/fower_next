import { createClient } from '@/lib/supabase-server';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/navigation';
import ProductDetailsClient from '@/components/shop/ProductDetailsClient';
import { ChevronRight, Home } from 'lucide-react';

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

    return (
        <div className="min-h-screen bg-brand-cream/20">
            {/* Elegant Header/Breadcrumb Area */}
            <div className="bg-white/50 border-b border-brand-rose/10 py-8 mb-12">
                <div className="container mx-auto px-6">
                    <nav className="flex items-center gap-3 text-sm text-brand-sage font-medium">
                        <Link href="/" className="hover:text-brand-gold transition-colors flex items-center gap-1">
                            <Home className="w-4 h-4" />
                        </Link>
                        <ChevronRight className="w-3 h-3 opacity-50" />
                        <Link href="/shop" className="hover:text-brand-gold transition-colors italic">
                            {locale === 'ar' ? 'المتجر' : 'Boutique'}
                        </Link>
                        <ChevronRight className="w-3 h-3 opacity-50" />
                        <span className="text-brand-sage-dark font-serif italic text-lg">{name}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-6 pb-24">
                <ProductDetailsClient flower={flower} locale={locale} />
            </div>
        </div>
    );
}
