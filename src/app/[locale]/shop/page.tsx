import { setRequestLocale } from 'next-intl/server';
import ProductCard from '@/components/ProductCard';
import { createClient } from '@/lib/supabase-server';
import { getPublicImageUrl } from '@/lib/utils';
import ShopFilters from '@/components/ShopFilters';

export default async function ShopPage({
    params,
    searchParams
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ category?: string; query?: string }>;
}) {
    const { locale } = await params;
    const { category, query } = await searchParams;
    setRequestLocale(locale);

    const supabase = await createClient();

    // Fetch Categories
    const { data: categories } = await supabase
        .from('categories')
        .select('id, name_fr, name_ar, slug');

    // Fetch Flowers with filters and variants
    let flowerQuery = supabase
        .from('flowers')
        .select('*, categories!inner(name_fr, name_ar, slug), flower_variants(*)');

    if (category && category !== 'all') {
        flowerQuery = flowerQuery.eq('categories.slug', category);
    }

    if (query) {
        flowerQuery = flowerQuery.ilike(locale === 'ar' ? 'name_ar' : 'name_fr', `%${query}%`);
    }

    const { data: flowers } = await flowerQuery;

    return (
        <div className="min-h-screen bg-brand-cream/30 py-20">
            <div className="container mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-brand-sage-dark mb-4">
                        {locale === 'ar' ? 'متجرنا' : 'Notre Boutique'}
                    </h1>
                    <div className="w-20 h-1 bg-brand-gold" />
                </header>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Client Filters */}
                    <ShopFilters categories={categories || []} locale={locale} />

                    {/* Results Grid */}
                    <div className="flex-grow">
                        {flowers && flowers.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {flowers.map((f: any) => {
                                    // Logic to prefer Size L variant
                                    const variantL = f.flower_variants?.find((v: any) => v.size === 'L');
                                    const variantM = f.flower_variants?.find((v: any) => v.size === 'M');

                                    const displayPrice = variantL?.price || variantM?.price || f.price;
                                    const displayImage = variantL?.image_url || variantM?.image_url || f.images?.m;

                                    return (
                                        <ProductCard
                                            key={f.id}
                                            product={{
                                                id: f.id,
                                                name_ar: f.name_ar,
                                                name_fr: f.name_fr,
                                                price: Number(displayPrice),
                                                image: getPublicImageUrl(displayImage),
                                                category: locale === 'ar' ? f.categories?.name_ar : f.categories?.name_fr,
                                                variants: f.flower_variants?.map((v: any) => ({
                                                    size: v.size,
                                                    price: Number(v.price),
                                                    image_url: getPublicImageUrl(v.image_url)
                                                }))
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="h-96 flex flex-col items-center justify-center text-brand-sage text-center">
                                <p className="text-xl font-serif mb-4">
                                    {locale === 'ar' ? 'لم يتم العثور على منتجات' : 'Aucun produit trouvé'}
                                </p>
                                <div className="w-12 h-[1px] bg-brand-gold" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
