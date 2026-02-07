'use client';

import { useState, useEffect, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { sendMessage } from '@/app/actions/contact';
import Button from '@/components/ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

function ContactForm() {
    const t = useTranslations('Index.contact');
    const searchParams = useSearchParams();
    const serviceType = searchParams.get('service');

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (serviceType && ['marriage', 'birthday', 'corporate'].includes(serviceType)) {
            const template = t(`form.templates.${serviceType}`);
            setMessage(template);
        }
    }, [serviceType, t]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const currentMessage = formData.get('message') as string;
        const phone = formData.get('phone') as string;

        const result = await sendMessage(formData);

        if (result.success) {
            setStatus('success');
            (e.target as HTMLFormElement).reset();
            setMessage('');

            // WhatsApp Redirect
            const waPhone = "212762818313";
            const text = `*Nouveau Message - Floral Zahrae*\n\n` +
                `*Nom:* ${name}\n` +
                `*Email:* ${email}\n` +
                `*Téléphone:* ${phone || 'Non précisé'}\n\n` +
                `*Message:* ${currentMessage}`;

            const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');
        } else {
            setStatus('error');
        }
    }

    return (
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-brand-rose/5 border border-brand-rose/10">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">
                        {t('form.name')}
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
                            {t('form.email')}
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
                            {t('form.phone')}
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
                        {t('form.message')}
                    </label>
                    <textarea
                        name="message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-brand-cream/20 border border-brand-rose/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage/30 resize-none"
                    ></textarea>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? (
                        t('form.sending')
                    ) : (
                        <span className="flex items-center">
                            <Send className="w-4 h-4 mr-2 rtl:ml-2" />
                            {t('form.send')}
                        </span>
                    )}
                </Button>

                {status === 'success' && (
                    <p className="text-green-600 text-sm text-center">
                        {t('form.success')}
                    </p>
                )}
                {status === 'error' && (
                    <p className="text-red-600 text-sm text-center">
                        {t('form.error')}
                    </p>
                )}
            </form>
        </div>
    );
}

export default function ContactPage() {
    const t = useTranslations('Index.contact');

    return (
        <div className="min-h-screen bg-brand-cream/30 py-24">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <header className="text-center mb-16">
                        <h1 className="text-5xl font-serif text-brand-sage-dark mb-6">
                            {t('badge')}
                        </h1>
                        <p className="text-brand-sage max-w-xl mx-auto">
                            {t('subtitle')}
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
                                    <h3 className="text-lg font-serif mb-2">{t('info')}</h3>
                                    <p className="text-brand-sage leading-relaxed">
                                        N, TAW10, lot Iguder, 48 AV Alla El Fassi Marrakech 40000, Morocco<br />
                                        {t('address')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 rtl:space-x-reverse">
                                <div className="p-4 bg-brand-rose/20 rounded-2xl text-brand-sage-dark">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-serif mb-2">{t('phone_label')}</h3>
                                    <p className="text-brand-sage">{t('phone')}</p>
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

                        {/* Contact Form with Suspense for searchParams */}
                        <Suspense fallback={<div className="h-96 flex items-center justify-center">Chargement du formulaire...</div>}>
                            <ContactForm />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
