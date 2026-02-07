'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { useState, useTransition } from 'react';
import { cn } from '@/lib/utils';

export default function ShopFilters({
    categories,
    locale
}: {
    categories: any[],
    locale: string
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [query, setQuery] = useState(searchParams.get('query') || '');

    const updateFilters = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters('query', query || null);
    };

    const currentCategory = searchParams.get('category') || 'all';

    return (
        <aside className="w-full lg:w-64 space-y-10">
            {/* Search */}
            <div>
                <h3 className="text-sm uppercase tracking-widest font-bold text-brand-sage-dark mb-4 flex items-center">
                    <Search className="w-4 h-4 mr-2 rtl:ml-2" />
                    {locale === 'ar' ? 'بحث' : 'Recherche'}
                </h3>
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={locale === 'ar' ? 'ابحث عن زهور...' : 'Chercher des fleurs...'}
                        className="w-full bg-white border border-brand-rose/20 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage/30 transition-all shadow-sm"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => { setQuery(''); updateFilters('query', null); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-sage/50"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </form>
            </div>

            {/* Categories */}
            <div>
                <h3 className="text-sm uppercase tracking-widest font-bold text-brand-sage-dark mb-4 flex items-center">
                    <Filter className="w-4 h-4 mr-2 rtl:ml-2" />
                    {locale === 'ar' ? 'الفئات' : 'Catégories'}
                </h3>
                <div className="space-y-2">
                    <button
                        onClick={() => updateFilters('category', 'all')}
                        className={cn(
                            "block w-full text-left rtl:text-right px-4 py-2 rounded-lg text-sm transition-all",
                            currentCategory === 'all'
                                ? "bg-brand-sage-dark text-white font-medium"
                                : "hover:bg-brand-rose/10 text-brand-sage"
                        )}
                    >
                        {locale === 'ar' ? 'الكل' : 'Tous'}
                    </button>
                    {categories?.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => updateFilters('category', cat.slug)}
                            className={cn(
                                "block w-full text-left rtl:text-right px-4 py-2 rounded-lg text-sm transition-all",
                                currentCategory === cat.slug
                                    ? "bg-brand-sage-dark text-white font-medium"
                                    : "hover:bg-brand-rose/10 text-brand-sage"
                            )}
                        >
                            {locale === 'ar' ? cat.name_ar : cat.name_fr}
                        </button>
                    ))}
                </div>
            </div>

            {isPending && (
                <div className="text-xs text-brand-gold animate-pulse text-center">
                    Mise à jour...
                </div>
            )}
        </aside>
    );
}
