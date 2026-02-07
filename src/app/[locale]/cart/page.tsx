'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/store/useCart';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CartPage() {
    const t = useTranslations('Cart');
    const locale = useLocale();
    const { items, removeItem, updateQuantity, total } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-cream/30 px-6">
                <div className="bg-white p-12 rounded-full mb-8 shadow-sm">
                    <ShoppingBag className="w-16 h-16 text-brand-sage" />
                </div>
                <h1 className="text-3xl font-serif text-brand-sage-dark mb-4">{t('empty')}</h1>
                <Link href="/shop">
                    <Button variant="primary">{t('cta')}</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-cream/30 py-20">
            <div className="container mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-brand-sage-dark mb-4">
                        {t('title')}
                    </h1>
                    <div className="w-20 h-1 bg-brand-gold" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.size}`}
                                className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6"
                            >
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-brand-cream/30">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-serif text-brand-sage-dark">{item.name}</h3>
                                        <button
                                            onClick={() => removeItem(item.id, item.size)}
                                            className="text-brand-sage hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-brand-sage mb-4 uppercase tracking-wider">
                                        Taille: <span className="font-bold text-brand-gold">{item.size}</span>
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4 bg-brand-cream/50 rounded-full px-4 py-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                className="hover:text-brand-gold transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="font-medium min-w-[1rem] text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                className="hover:text-brand-gold transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-lg font-medium text-brand-sage-dark">
                                            {(item.price * item.quantity).toFixed(2)} MAD
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-sm sticky top-24">
                            <h2 className="text-2xl font-serif text-brand-sage-dark mb-8 pb-4 border-b border-brand-rose/20">
                                {locale === 'ar' ? 'ملخص الطلب' : 'Résumé de commande'}
                            </h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-brand-sage">
                                    <span>{locale === 'ar' ? 'المجموع الفرعي' : 'Sous-total'}</span>
                                    <span>{total().toFixed(2)} MAD</span>
                                </div>
                                <div className="flex justify-between text-brand-sage">
                                    <span>{locale === 'ar' ? 'التوصيل' : 'Livraison'}</span>
                                    <span className="text-brand-gold font-medium">Gratuit</span>
                                </div>
                                <div className="pt-4 border-t border-brand-rose/20 flex justify-between text-xl font-bold text-brand-sage-dark">
                                    <span>{t('total')}</span>
                                    <span>{total().toFixed(2)} MAD</span>
                                </div>
                            </div>
                            <Link href="/checkout" className="w-full">
                                <Button variant="primary" className="w-full py-4 text-lg">
                                    {t('checkout')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
