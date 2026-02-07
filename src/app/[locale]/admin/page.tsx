export default function AdminDashboard() {
    return (
        <div className="p-8">
            <div className="mb-10">
                <h1 className="text-3xl font-serif text-brand-sage-dark mb-2">Tableau de Bord Admin</h1>
                <p className="text-brand-sage">Gérez votre boutique FLORAL ZAHRAE avec élégance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Ventes Totales', value: '12,450 MAD', change: '+12%' },
                    { label: 'Commandes', value: '45', change: '+5' },
                    { label: 'Messages', value: '12', change: '8 non lus', alert: true },
                    { label: 'Fleurs en Stock', value: '156', change: 'Correction requise' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-rose/10">
                        <span className="text-xs uppercase tracking-widest text-brand-sage font-bold block mb-2">{stat.label}</span>
                        <div className="text-2xl font-serif text-brand-sage-dark mb-1">{stat.value}</div>
                        <span className={stat.alert ? 'text-brand-gold text-xs' : 'text-brand-sage text-xs'}>
                            {stat.change}
                        </span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-brand-rose/10 h-64 flex items-center justify-center text-brand-sage/40">
                    [Graphique des ventes Recharts ici]
                </div>
                <div className="bg-white p-8 rounded-2xl border border-brand-rose/10">
                    <h3 className="font-serif text-xl mb-6">Commandes Récentes</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-brand-rose/10 last:border-0">
                                <div>
                                    <div className="text-sm font-medium">#CMD-2024-00{i}</div>
                                    <div className="text-xs text-brand-sage">Il y a 2 heures</div>
                                </div>
                                <span className="px-3 py-1 bg-brand-cream text-brand-sage-dark rounded-full text-[10px] uppercase font-bold">
                                    En attente
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
