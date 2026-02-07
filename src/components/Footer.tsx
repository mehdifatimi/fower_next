import { Instagram, Mail, Phone, MapPin, Youtube, Facebook, MessageCircle } from 'lucide-react';

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
                    <ul className="space-y-4 text-brand-cream/70 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                            <span>N, TAW10, lot Iguder, 48 AV Alla El Fassi Marrakech 40000, Morocco</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                            <span>+212 762 818 313</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                            <span>contact@floralzahrae.com</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-brand-gold">Suivez-nous</h4>
                    <div className="flex space-x-6 rtl:space-x-reverse">
                        <a
                            href="https://www.instagram.com/floral_zahrae/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border border-brand-cream/20 rounded-full hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="https://wa.me/212762818313"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border border-brand-cream/20 rounded-full hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300"
                        >
                            <MessageCircle className="w-5 h-5" />
                        </a>
                        <a
                            href="mailto:contact@floralzahrae.com"
                            className="p-2 border border-brand-cream/20 rounded-full hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-20 pt-8 border-t border-brand-cream/10 text-center text-xs text-brand-cream/40">
                &copy; {currentYear} C-Digital. Tous droits réservés.
            </div>
        </footer>
    );
}
