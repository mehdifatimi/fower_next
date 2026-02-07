import { getTranslations, setRequestLocale } from 'next-intl/server';
import { createClient } from '@/lib/supabase-server';
import { createFlower } from '@/app/actions/flowers';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';


export default async function NewFlowerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Index'); // Using base t for now or add specific translations

    const supabase = await createClient();
    const { data: categories } = await supabase
        .from('categories')
        .select('id, name_fr, name_ar');

    const createFlowerWithLocale = async (formData: FormData) => {
        "use server";
        await createFlower(locale, formData);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link
                        href={`/${locale}/admin/flowers`}
                        className="flex items-center text-brand-sage hover:text-brand-sage-dark transition-colors mb-2 text-sm"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Retour à la liste
                    </Link>
                    <h1 className="text-3xl font-serif text-brand-sage-dark">Ajouter une Nouvelle Fleur</h1>
                </div>
            </div>

            <form action={createFlowerWithLocale} className="space-y-8 bg-white p-10 rounded-3xl shadow-xl shadow-brand-rose/5 border border-brand-rose/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* French Details */}
                    <div className="space-y-6">
                        <h3 className="text-xs uppercase tracking-widest font-bold text-brand-gold border-b border-brand-rose/10 pb-2">Détails en Français</h3>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">Nom (FR)</label>
                            <input
                                name="name_fr"
                                required
                                type="text"
                                className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">Description (FR)</label>
                            <textarea
                                name="description_fr"
                                rows={4}
                                className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30 resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Arabic Details */}
                    <div className="space-y-6">
                        <h3 className="text-xs uppercase tracking-widest font-bold text-brand-gold border-b border-brand-rose/10 pb-2 rtl:text-right">التفاصيل بالعربية</h3>
                        <div dir="rtl">
                            <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">الاسم (AR)</label>
                            <input
                                name="name_ar"
                                required
                                type="text"
                                className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30"
                            />
                        </div>
                        <div dir="rtl">
                            <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">الوصف (AR)</label>
                            <textarea
                                name="description_ar"
                                rows={4}
                                className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30 resize-none"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-brand-rose/10">
                    <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">Prix (MAD)</label>
                        <input
                            name="price"
                            required
                            type="number"
                            step="0.01"
                            className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">Stock</label>
                        <input
                            name="stock"
                            required
                            type="number"
                            className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">Catégorie</label>
                        <select
                            name="category_id"
                            required
                            className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30"
                        >
                            <option value="">Sélectionner...</option>
                            {categories?.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {locale === 'ar' ? cat.name_ar : cat.name_fr}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-brand-rose/10">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-brand-gold">Variantes par Taille (S, M, L)</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['S', 'M', 'L'].map((size) => (
                            <div key={size} className="space-y-4 p-6 bg-brand-cream/10 rounded-2xl border border-brand-rose/10">
                                <div className="flex items-center justify-between border-b border-brand-rose/10 pb-2">
                                    <span className="text-lg font-serif text-brand-sage-dark">Taille {size}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Variante</span>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-sage mb-1">Prix ({size})</label>
                                    <input
                                        name={`price_${size.toLowerCase()}`}
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="w-full bg-white border border-brand-rose/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-sage mb-1">Stock ({size})</label>
                                    <input
                                        name={`stock_${size.toLowerCase()}`}
                                        type="number"
                                        placeholder="0"
                                        className="w-full bg-white border border-brand-rose/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage/30"
                                    />
                                </div>
                                <div>
                                    <ImageUpload name={`image_${size.toLowerCase()}`} label={`Image (${size})`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-brand-rose/10">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <input
                            name="featured"
                            type="checkbox"
                            id="featured"
                            className="w-5 h-5 accent-brand-sage-dark rounded border-brand-rose/20"
                        />
                        <label htmlFor="featured" className="text-sm font-medium text-brand-sage-dark">
                            Mettre en avant sur la page d'accueil
                        </label>
                    </div>
                </div>

                <div className="pt-8">
                    <Button type="submit" className="w-full py-4 text-lg">
                        <Save className="w-5 h-5 mr-3" />
                        Enregistrer la Fleur
                    </Button>
                </div>
            </form>
        </div>
    );
}
