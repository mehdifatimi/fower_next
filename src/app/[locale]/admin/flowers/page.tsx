import { createClient } from '@/lib/supabase-server';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminFlowersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const supabase = await createClient();

    const { data: flowers } = await supabase
        .from('flowers')
        .select('*, categories(name_fr)')
        .order('created_at', { ascending: false });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-serif text-brand-sage-dark mb-2">Gestion des Fleurs</h1>
                    <p className="text-brand-sage">Ajoutez, modifiez ou supprimez vos produits floraux.</p>
                </div>
                <Link
                    href={`/${locale}/admin/flowers/new`}
                    className="flex items-center px-6 py-3 bg-brand-sage-dark text-brand-cream rounded-full hover:bg-brand-sage transition-all shadow-lg"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Nouvelle Fleur
                </Link>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-brand-rose/10 shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-brand-cream/50 text-brand-sage-dark text-xs uppercase tracking-widest font-bold">
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Nom (FR)</th>
                            <th className="px-6 py-4">Catégorie</th>
                            <th className="px-6 py-4">Prix</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-rose/10">
                        {flowers?.map((flower) => (
                            <tr key={flower.id} className="hover:bg-brand-rose/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-cream">
                                        {flower.images?.m ? (
                                            <Image src={flower.images.m} alt="" fill className="object-cover" />
                                        ) : (
                                            <span className="flex items-center justify-center h-full text-[10px] text-brand-sage opacity-50">N/A</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-brand-sage-dark">{flower.name_fr}</td>
                                <td className="px-6 py-4 text-sm text-brand-sage">{flower.categories?.name_fr || 'Sans catégorie'}</td>
                                <td className="px-6 py-4 text-sm font-bold">{flower.price} MAD</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${flower.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {flower.stock > 0 ? `En Stock (${flower.stock})` : 'Rupture'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <button className="p-2 text-brand-sage hover:text-brand-gold transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-brand-sage hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {(!flowers || flowers.length === 0) && (
                    <div className="py-20 text-center text-brand-sage italic">
                        Aucune fleur trouvée. Commencez par en ajouter une !
                    </div>
                )}
            </div>
        </div>
    );
}
