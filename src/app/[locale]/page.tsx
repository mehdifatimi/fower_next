import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProductCard from '@/components/ProductCard';
import { createClient } from '@/lib/supabase-server';
import { getPublicImageUrl } from '@/lib/utils';
import { Link } from '@/navigation';


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

import AboutSection from '@/components/home/AboutSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import EventsSection from '@/components/home/EventsSection';
import ContactSection from '@/components/home/ContactSection';
import HeroSection from '@/components/home/HeroSection';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Index');
  const supabase = await createClient();

  // Fetch featured flowers with variants
  const { data: flowers } = await supabase
    .from('flowers')
    .select('*, categories(name_fr, name_ar), flower_variants(*)')
    .eq('featured', true)
    .limit(3);

  const displayProducts = flowers && flowers.length > 0
    ? flowers.map((f: any) => {
      // Logic to prefer Size L variant
      const variantL = f.flower_variants?.find((v: any) => v.size === 'L');
      const variantM = f.flower_variants?.find((v: any) => v.size === 'M');

      const displayPrice = variantL?.price || variantM?.price || f.price;
      const displayImage = variantL?.image_url || variantM?.image_url || f.images?.m;

      return {
        id: f.id,
        name_ar: f.name_ar,
        name_fr: f.name_fr,
        price: Number(displayPrice),
        image: getPublicImageUrl(displayImage),
        category: locale === 'ar' ? f.categories?.name_ar : f.categories?.name_fr,
        isNew: new Date(f.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
        variants: f.flower_variants?.map((v: any) => ({
          size: v.size,
          price: Number(v.price),
          image_url: getPublicImageUrl(v.image_url)
        }))
      };
    })
    : MOCK_PRODUCTS;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{t('featured.badge')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-sage-dark mb-6">
              {t('featured.title')}
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

      {/* Events Section */}
      <EventsSection />

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
