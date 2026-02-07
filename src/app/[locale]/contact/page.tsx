'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { sendMessage } from '@/app/actions/contact';
import Button from '@/components/ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    const t = useTranslations('Navbar'); // Using for base labels or add to messages
    const locale = useLocale();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const result = await sendMessage(formData);

        if (result.success) {
            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } else {
            setStatus('error');
        }
    }

    return (
        <div className="min-h-screen bg-brand-cream/30 py-24">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <header className="text-center mb-16">
                        <h1 className="text-5xl font-serif text-brand-sage-dark mb-6">
                            {locale === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}
                        </h1>
                        <p className="text-brand-sage max-w-xl mx-auto">
                            Une question, un événement spécial ou une commande personnalisée ? Notre équipe est à votre écoute.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div className="flex items-start space-x-6 rtl:space-x-reverse">
                                <div className="p-4 bg-brand-rose/20 rounded-2xl text-brand-sage-dark">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-serif mb-2">Notre Boutique</h3>
                                    <p className="text-brand-sage leading-relaxed">
                                        N, TAW10, lot Iguder, 48 AV Alla El Fassi Marrakech 40000, Morocco<br />
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 rtl:space-x-reverse">
                                <div className="p-4 bg-brand-rose/20 rounded-2xl text-brand-sage-dark">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-serif mb-2">Téléphone</h3>
                                    <p className="text-brand-sage">+212 762818313</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 rtl:space-x-reverse">
                                <div className="p-4 bg-brand-rose/20 rounded-2xl text-brand-sage-dark">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-serif mb-2">Email</h3>
                                    <p className="text-brand-sage">contact@floralzahrae.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-brand-rose/5 border border-brand-rose/10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">
                                        {locale === 'ar' ? 'الاسم الكامل' : 'Nom Complet'}
                                    </label>
                                    <input
                                        name="name"
                                        required
                                        type="text"
                                        className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            required
                                            type="email"
                                            className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">
                                            {locale === 'ar' ? 'رقم الهاتف' : 'Téléphone'}
                                        </label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={5}
                                        className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30 resize-none"
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        'Envoi...'
                                    ) : (
                                        <span className="flex items-center">
                                            <Send className="w-4 h-4 mr-2 rtl:ml-2" />
                                            {locale === 'ar' ? 'إرسال الرسالة' : 'Envoyer le Message'}
                                        </span>
                                    )}
                                </Button>

                                {status === 'success' && (
                                    <p className="text-green-600 text-sm text-center">
                                        Votre message a été envoyé avec succès !
                                    </p>
                                )}
                                {status === 'error' && (
                                    <p className="text-red-600 text-sm text-center">
                                        Une erreur est survenue. Veuillez réessayer.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
