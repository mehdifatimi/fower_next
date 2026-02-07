'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useLocale } from 'next-intl';

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
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const locale = useLocale();
    const name = locale === 'ar' ? product.name_ar : product.name_fr;

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
                <Image
                    src={product.image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Quick Actions Hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="p-3 bg-white/80 backdrop-blur rounded-full hover:bg-brand-gold hover:text-white transition-colors">
                        <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white/80 backdrop-blur rounded-full hover:bg-brand-sage-dark hover:text-white transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-sage mb-2 block">
                    {product.category}
                </span>
                <h3 className="font-serif text-xl text-brand-sage-dark mb-2 group-hover:text-brand-gold transition-colors">
                    {name}
                </h3>
                <p className="font-medium text-brand-sage-dark">
                    {product.price.toFixed(2)} MAD
                </p>

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="outline" size="sm" className="w-full">
                        Détails
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
