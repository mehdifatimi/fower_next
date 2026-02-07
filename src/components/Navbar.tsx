'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const toggleLanguage = () => {
        const nextLocale = locale === 'ar' ? 'fr' : 'ar';
        router.replace(pathname, { locale: nextLocale });
    };

    const navLinks = [
        { href: '/', label: t('home') },
        { href: '/shop', label: t('shop') },
        { href: '/categories', label: t('categories') },
        { href: '/about', label: t('about') },
        { href: '/catalogue', label: t('catalogue') },
        { href: '/events', label: t('events') },
        { href: '/contact', label: t('contact') },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full glass border-b border-brand-rose/20">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                    <Image src="/logo.png" alt="FLORAL ZAHRAE" width={100} height={60} className="object-contain" priority />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm uppercase tracking-widest text-brand-sage hover:text-brand-gold transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center text-brand-sage hover:text-brand-gold transition-colors"
                        title={locale === 'ar' ? 'Passer en français' : 'Changer pour l\'arab'}
                    >
                        <Globe className="w-5 h-5 mr-1 rtl:ml-1" />
                        <span className="text-xs font-medium uppercase">{locale === 'ar' ? 'FR' : 'AR'}</span>
                    </button>

                    <button className="relative p-2 text-brand-sage hover:text-brand-gold transition-colors">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="absolute top-0 right-0 w-4 h-4 bg-brand-gold text-white text-[10px] flex items-center justify-center rounded-full">
                            0
                        </span>
                    </button>

                    <button
                        className="md:hidden p-2 text-brand-sage"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-brand-cream border-t border-brand-rose/10 px-6 py-8 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-xl font-serif text-brand-sage-dark"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
