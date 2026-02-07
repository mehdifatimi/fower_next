'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { ShoppingCart, Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { useCart, FlowerSize } from '@/store/useCart';

interface Variant {
    size: string;
    price: number;
    image_url?: string | null;
}

interface ProductCardProps {
    product: {
        id: string;
        name_ar: string;
        name_fr: string;
        price: number;
        image: string;
        category: string;
        isNew?: boolean;
        isSale?: boolean;
        variants?: Variant[];
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const locale = useLocale();
    const addItem = useCart(state => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const name = locale === 'ar' ? product.name_ar : product.name_fr;

    // Sort variants to ensure S, M, L order
    const sortedVariants = product.variants?.sort((a, b) => {
        const order = { 'S': 1, 'M': 2, 'L': 3 };
        return (order[a.size as keyof typeof order] || 0) - (order[b.size as keyof typeof order] || 0);
    });

    // Default to 'L' if available, otherwise 'M', then 'S', then null
    const defaultVariant = sortedVariants?.find(v => v.size === 'L') ||
        sortedVariants?.find(v => v.size === 'M') ||
        sortedVariants?.[0];

    const [selectedSize, setSelectedSize] = useState<string | null>(defaultVariant?.size || null);

    const activeVariant = sortedVariants?.find(v => v.size === selectedSize);
    const displayPrice = activeVariant?.price || product.price;
    const displayImage = activeVariant?.image_url || product.image;

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: name,
            price: displayPrice,
            image: displayImage,
            size: (selectedSize || 'M') as FlowerSize,
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500"
        >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isNew && (
                    <span className="bg-brand-sage text-brand-cream text-[10px] uppercase tracking-tighter px-2 py-1 rounded">
                        Nouveau
                    </span>
                )}
                {product.isSale && (
                    <span className="bg-brand-gold text-white text-[10px] uppercase tracking-tighter px-2 py-1 rounded">
                        Soldes
                    </span>
                )}
            </div>

            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream/30">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={displayImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={displayImage}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Quick Actions Hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                        onClick={handleAddToCart}
                        className={cn(
                            "p-3 rounded-full transition-all transform hover:scale-110 shadow-lg",
                            isAdded ? "bg-green-500 text-white" : "bg-white/90 backdrop-blur hover:bg-brand-sage-dark hover:text-white"
                        )}
                    >
                        {isAdded ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-sage mb-2 block">
                    {product.category}
                </span>
                <Link href={`/shop/${product.id}`}>
                    <h3 className="font-serif text-xl text-brand-sage-dark mb-2 group-hover:text-brand-gold transition-colors underline-offset-4 hover:underline">
                        {name}
                    </h3>
                </Link>

                {/* Size Selector */}
                {sortedVariants && sortedVariants.length > 0 && (
                    <div className="flex justify-center gap-2 mb-4">
                        {['S', 'M', 'L'].map((size) => {
                            const exists = sortedVariants.some(v => v.size === size);
                            if (!exists) return null;

                            return (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={cn(
                                        "w-8 h-8 rounded-full text-xs font-medium transition-all",
                                        selectedSize === size
                                            ? "bg-brand-sage-dark text-white border-brand-sage-dark"
                                            : "border border-brand-cream text-brand-sage hover:border-brand-sage"
                                    )}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div>
                )}

                <p className="font-medium text-brand-sage-dark">
                    {displayPrice.toFixed(2)} MAD
                </p>

                <div className="mt-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href={`/shop/${product.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full">
                            {locale === 'ar' ? 'تفاصيل' : 'Détails'}
                        </Button>
                    </Link>
                    <Button
                        variant="primary"
                        size="sm"
                        className={cn("w-full transition-all", isAdded && "bg-green-600")}
                        onClick={handleAddToCart}
                    >
                        {isAdded
                            ? (locale === 'ar' ? 'تمت الإضافة' : 'Ajouté !')
                            : (locale === 'ar' ? 'أضف للسلة' : 'Ajouter au panier')
                        }
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
