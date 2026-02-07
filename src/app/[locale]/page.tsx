import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProductCard from '@/components/ProductCard';
import { createClient } from '@/lib/supabase-server';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name_ar: 'بوكيه الحب الملكي',
    name_fr: 'Bouquet Amour Royal',
    price: 450.00,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop',
    category: 'Classique',
    isNew: true
  },
  {
    id: '2',
    name_ar: 'سحر الربيع',
    name_fr: 'Charme de Printemps',
    price: 320.00,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop',
    category: 'Saison',
    isSale: true
  },
  {
    id: '3',
    name_ar: 'الوردة البيضاء النقية',
    name_fr: 'Éclat Blanc Pur',
    price: 580.00,
    image: 'https://images.unsplash.com/photo-1596073413225-30438cf56d34?q=80&w=800&auto=format&fit=crop',
    category: 'Luxe'
  }
];

// Helper to validate and get proper image URL
function getValidImageUrl(images: any): string {
  if (!images) return MOCK_PRODUCTS[0].image;

  const imageUrl = images.m || images.xl || images.s;
  if (!imageUrl) return MOCK_PRODUCTS[0].image;

  // Only return if it's a valid HTTP/HTTPS URL
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Return fallback for local paths
  return MOCK_PRODUCTS[0].image;
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Index');
  const supabase = await createClient();

  // Fetch featured flowers
  const { data: flowers } = await supabase
    .from('flowers')
    .select('*, categories(name_fr, name_ar)')
    .eq('featured', true)
    .limit(3);

  const displayProducts = flowers && flowers.length > 0
    ? flowers.map((f: any) => ({
      id: f.id,
      name_ar: f.name_ar,
      name_fr: f.name_fr,
      price: Number(f.price),
      image: getValidImageUrl(f.images),
      category: locale === 'ar' ? f.categories?.name_ar : f.categories?.name_fr,
      isNew: new Date(f.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
    }))
    : MOCK_PRODUCTS;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-brand-cream">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-brand-rose rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-brand-sage rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-sage-dark mb-6 animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-brand-sage max-w-2xl mx-auto mb-10 animate-fade-in [animation-delay:200ms]">
            {t('hero.subtitle')}
          </p>
          <div className="animate-fade-in [animation-delay:400ms]">
            <button className="px-8 py-4 bg-brand-sage-dark text-brand-cream font-medium rounded-full hover:bg-brand-sage transition-all transform hover:scale-105 shadow-lg uppercase tracking-widest text-sm">
              {t('hero.cta')}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Sélection Exclusive</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-sage-dark mb-6">
              Nos Fleurs Vedettes
            </h2>
            <div className="w-24 h-[1px] bg-brand-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
