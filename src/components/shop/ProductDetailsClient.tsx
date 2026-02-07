'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useCart, FlowerSize } from '@/store/useCart';
import { getPublicImageUrl } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { ShoppingCart, Check, Info, ShieldCheck, Truck, RefreshCw, Minus, Plus } from 'lucide-react';
import { Link } from '@/navigation';

interface ProductDetailsClientProps {
    flower: any;
    locale: string;
}

export default function ProductDetailsClient({ flower, locale }: ProductDetailsClientProps) {
    const t = useTranslations('Shop');
    const addItem = useCart((state) => state.addItem);

    // Sort variants by size order S, M, L
    const sizeOrder = ['S', 'M', 'L'];
    const sortedVariants = [...(flower.flower_variants || [])].sort((a, b) =>
        sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
    );

    // Initial state: try to find 'M' size first, otherwise first available
    const initialVariant = sortedVariants.find(v => v.size === 'M') || sortedVariants[0];
    const [selectedSize, setSelectedSize] = useState<FlowerSize>(initialVariant?.size || 'M');
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const currentVariant = sortedVariants.find(v => v.size === selectedSize) || initialVariant;
    const price = currentVariant?.price || flower.price;
    const imageUrl = currentVariant?.image_url || flower.images?.m;
    const name = locale === 'ar' ? flower.name_ar : flower.name_fr;
    const description = locale === 'ar' ? flower.description_ar : flower.description_fr;
    const category = locale === 'ar' ? flower.categories?.name_ar : flower.categories?.name_fr;

    const handleAddToCart = () => {
        addItem({
            id: flower.id,
            name: name,
            price: price,
            image: imageUrl,
            size: selectedSize,
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery Section */}
            <div className="space-y-6">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-brand-cream/20 shadow-2xl border border-brand-rose/10 group">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedSize}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={getPublicImageUrl(imageUrl)}
                                alt={name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Thumbnails if needed/available */}
                <div className="flex gap-4 px-2">
                    {sortedVariants.map((variant: any) => (
                        <button
                            key={variant.id}
                            onClick={() => setSelectedSize(variant.size as FlowerSize)}
                            className={`relative w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${selectedSize === variant.size
                                    ? 'border-brand-gold ring-4 ring-brand-gold/10'
                                    : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={getPublicImageUrl(variant.image_url)}
                                alt={variant.size}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col">
                <div className="mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <span className="px-4 py-1.5 bg-brand-rose/10 text-brand-gold rounded-full text-[10px] uppercase tracking-[0.2em] font-bold border border-brand-gold/10">
                            {category}
                        </span>
                        <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2 animate-pulse" />
                            {t('stock')}
                        </div>
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl font-serif text-brand-sage-dark mb-6 leading-tight">
                        {name}
                    </h1>

                    <div className="flex items-baseline gap-4 mb-10">
                        <span className="text-4xl font-light text-brand-sage-dark">
                            {price} <span className="text-xl font-medium tracking-wide">MAD</span>
                        </span>
                        {selectedSize === 'L' && (
                            <span className="text-brand-sage line-through opacity-50 text-lg italic">
                                {Math.round(price * 1.2)} MAD
                            </span>
                        )}
                    </div>

                    <div className="prose prose-sage max-w-none text-brand-sage text-lg leading-relaxed mb-12">
                        {description}
                    </div>

                    {/* Size Selector */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-xs uppercase tracking-widest font-bold text-brand-sage-dark">
                                {t('select_size')}
                            </label>
                            <button className="text-[10px] uppercase font-bold text-brand-gold hover:underline flex items-center gap-1">
                                <Info className="w-3 h-3" /> Guide des tailles
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {['S', 'M', 'L'].map((size) => {
                                const variant = sortedVariants.find(v => v.size === size);
                                const isAvailable = !!variant;
                                return (
                                    <button
                                        key={size}
                                        disabled={!isAvailable}
                                        onClick={() => setSelectedSize(size as FlowerSize)}
                                        className={`group relative py-6 rounded-2xl border-2 transition-all duration-500 overflow-hidden ${selectedSize === size
                                                ? 'border-brand-gold bg-brand-gold/5 text-brand-sage-dark shadow-lg'
                                                : 'border-brand-rose/10 bg-white text-brand-sage hover:border-brand-gold/30'
                                            } ${!isAvailable && 'opacity-30 cursor-not-allowed grayscale'}`}
                                    >
                                        <div className="relative z-10 flex flex-col items-center">
                                            <span className={`text-xl font-serif mb-1 ${selectedSize === size ? 'text-brand-gold' : ''}`}>{size}</span>
                                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">
                                                {size === 'S' ? 'Petit' : size === 'M' ? 'Moyen' : 'Luxueux'}
                                            </span>
                                        </div>
                                        {selectedSize === size && (
                                            <motion.div
                                                layoutId="activeSize"
                                                className="absolute inset-0 bg-brand-gold/10"
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quantity & CTA */}
                    <div className="flex flex-col sm:flex-row gap-6 mb-12">
                        <div className="flex items-center bg-brand-cream/30 rounded-full px-4 py-2 border border-brand-rose/10">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-2 hover:bg-white rounded-full transition-colors text-brand-sage"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-bold text-brand-sage-dark text-lg">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-2 hover:bg-white rounded-full transition-colors text-brand-sage"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <Button
                            onClick={handleAddToCart}
                            className={`flex-1 py-6 rounded-full text-lg font-bold transition-all duration-500 shadow-xl ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-brand-sage-dark'
                                }`}
                        >
                            <AnimatePresence mode="wait">
                                {isAdded ? (
                                    <motion.span
                                        key="added"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-5 h-5" />
                                        {t('added')}
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="add"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        {t('add_to_cart')}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-brand-cream">
                        {[
                            { icon: ShieldCheck, text: "Qualité Premium" },
                            { icon: Truck, text: "Livraison Express" },
                            { icon: RefreshCw, text: "Fleurs Fraîches" },
                            { icon: Info, text: "Conseil Expert" }
                        ].map((badge, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center gap-2 group">
                                <div className="p-3 bg-brand-cream/50 rounded-2xl group-hover:bg-brand-gold/10 transition-colors duration-300">
                                    <badge.icon className="w-5 h-5 text-brand-gold" />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-sage-dark">{badge.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
