'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Flower2, Layers, ShoppingBag, MessageSquare, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const locale = useLocale();

    const menuItems = [
        { href: `/${locale}/admin`, label: 'Dashboard', icon: LayoutDashboard },
        { href: `/${locale}/admin/flowers`, label: 'Fleurs', icon: Flower2 },
        { href: `/${locale}/admin/categories`, label: 'Catégories', icon: Layers },
        { href: `/${locale}/admin/orders`, label: 'Commandes', icon: ShoppingBag },
        { href: `/${locale}/admin/messages`, label: 'Messages', icon: MessageSquare },
    ];

    return (
        <div className="flex min-h-screen bg-brand-cream/20">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-brand-sage-dark text-brand-cream hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-8 border-b border-brand-cream/10">
                    <h2 className="text-xl font-serif text-brand-gold italic">FLORAL ZAHRAE</h2>
                    <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Administration</span>
                </div>

                <nav className="flex-grow p-4 mt-6 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                                    isActive
                                        ? "bg-brand-rose text-brand-sage-dark font-bold shadow-lg"
                                        : "hover:bg-brand-cream/5 text-brand-cream/70"
                                )}
                            >
                                <div className="flex items-center">
                                    <item.icon className={cn("w-5 h-5 mr-3", isActive ? "text-brand-sage-dark" : "text-brand-cream/30 group-hover:text-brand-cream")} />
                                    <span className="text-sm">{item.label}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-brand-cream/10">
                    <button className="flex items-center w-full px-4 py-3 text-brand-rose hover:bg-red-500/10 rounded-xl transition-colors">
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="text-sm">Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
