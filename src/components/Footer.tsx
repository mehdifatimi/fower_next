export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-sage-dark text-brand-cream pt-20 pb-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-2xl font-serif mb-6">FLORAL ZAHRAE</h3>
                    <p className="text-brand-cream/70 max-w-xs leading-relaxed">
                        Créations florales artisanales pour capturer l'essence de chaque instant précieux.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-brand-gold">Contact</h4>
                    <ul className="space-y-4 text-brand-cream/70">
                        <li>Casablanca, Maroc</li>
                        <li>+212 5XX XX XX XX</li>
                        <li>contact@floralzahrae.com</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-brand-gold">Suivez-nous</h4>
                    <div className="flex space-x-4 rtl:space-x-reverse">
                        <span className="hover:text-brand-gold transition-colors cursor-pointer uppercase text-xs tracking-tighter">Instagram</span>
                        <span className="hover:text-brand-gold transition-colors cursor-pointer uppercase text-xs tracking-tighter">Pinterest</span>
                        <span className="hover:text-brand-gold transition-colors cursor-pointer uppercase text-xs tracking-tighter">Facebook</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-20 pt-8 border-t border-brand-cream/10 text-center text-xs text-brand-cream/40">
                &copy; {currentYear} FLORAL ZAHRAE. Tous droits réservés.
            </div>
        </footer>
    );
}
