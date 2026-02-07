'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/store/useCart';
import { Link } from '@/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { MessageCircle, Loader2 } from 'lucide-react';
import { createOrder } from '@/app/actions/orders';

export default function CheckoutPage() {
    const t = useTranslations('Checkout');
    const ct = useTranslations('Cart');
    const locale = useLocale();
    const { items, total, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleWhatsAppRedirect = async () => {
        setIsSubmitting(true);

        try {
            // 1. Save to Database
            const orderResult = await createOrder({
                customer_name: formData.name,
                customer_phone: formData.phone,
                delivery_address: formData.address,
                message: formData.message,
                total_amount: total(),
                items: items.map(item => ({
                    flower_id: item.id,
                    size: item.size,
                    quantity: item.quantity,
                    unit_price: item.price
                }))
            });

            if (!orderResult.success) {
                const errorMsg = locale === 'ar'
                    ? `فشل حفظ الطلب: ${orderResult.error}`
                    : `Échec de la sauvegarde de la commande: ${orderResult.error}`;
                alert(errorMsg);
                setIsSubmitting(false);
                return;
            }

            // 2. Prepare WhatsApp Message
            const phone = "212762818313"; // Updated contact number
            const itemsList = items.map(item => `- ${item.name} (${item.size}) x${item.quantity}: ${(item.price * item.quantity).toFixed(2)} MAD`).join('\n');

            const text = `*Nouvelle Commande #${orderResult.orderId.slice(0, 8)} - Floral Zahrae*\n\n` +
                `*Client:* ${formData.name}\n` +
                `*Téléphone:* ${formData.phone}\n` +
                `*Adresse:* ${formData.address}\n` +
                `*Note:* ${formData.message || 'N/A'}\n\n` +
                `*Produits:*\n${itemsList}\n\n` +
                `*TOTAL: ${total().toFixed(2)} MAD*`;

            const encodedText = encodeURIComponent(text);

            // 3. Clear Cart
            clearCart();

            // 4. Redirect
            window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');

        } catch (error) {
            console.error('Order creation error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-cream/30 px-6">
                <h1 className="text-3xl font-serif text-brand-sage-dark mb-4">{ct('empty')}</h1>
                <Link href="/shop">
                    <Button variant="primary">{ct('cta')}</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-cream/30 py-20">
            <div className="container mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-brand-sage-dark mb-4">
                        {t('title')}
                    </h1>
                    <div className="w-20 h-1 bg-brand-gold" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm">
                        <h2 className="text-2xl font-serif text-brand-sage-dark mb-8">
                            {locale === 'ar' ? 'معلومات التوصيل' : 'Informations de livraison'}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-brand-sage mb-2 uppercase tracking-widest">{t('name')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-brand-rose/20 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                    placeholder="Jean Dupont"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-sage mb-2 uppercase tracking-widest">{t('phone')}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-brand-rose/20 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                    placeholder="06 12 34 56 78"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-sage mb-2 uppercase tracking-widest">{t('address')}</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-brand-rose/20 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                    placeholder="N° 123, Rue Example, Casablanca"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-sage mb-2 uppercase tracking-widest">{t('message')}</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl border border-brand-rose/20 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                                    placeholder={locale === 'ar' ? 'رسالة إضافية...' : 'Un mot doux, une instruction...'}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm h-fit sticky top-24">
                        <h2 className="text-2xl font-serif text-brand-sage-dark mb-8">
                            {locale === 'ar' ? 'ملخص الطلب' : 'Résumé de commande'}
                        </h2>
                        <div className="space-y-4 mb-8">
                            {items.map(item => (
                                <div key={`${item.id}-${item.size}`} className="flex justify-between items-center py-2 border-b border-brand-rose/10">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-brand-sage-dark">{item.name}</span>
                                        <span className="text-xs text-brand-sage uppercase tracking-wider">{item.size} x {item.quantity}</span>
                                    </div>
                                    <span className="font-medium">{(item.price * item.quantity).toFixed(2)} MAD</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-2xl font-bold text-brand-sage-dark mb-8">
                            <span>{ct('total')}</span>
                            <span>{total().toFixed(2)} MAD</span>
                        </div>

                        <Button
                            onClick={handleWhatsAppRedirect}
                            variant="primary"
                            className="w-full py-4 text-lg flex items-center justify-center gap-3"
                            disabled={!formData.name || !formData.phone || !formData.address || isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <MessageCircle className="w-6 h-6" />
                            )}
                            {t('confirm')}
                        </Button>
                        <p className="text-[10px] text-brand-sage text-center mt-4 uppercase tracking-widest">
                            {locale === 'ar' ? 'سيتم فتح واتساب لإتمام طلبك' : 'WhatsApp s\'ouvrira pour finaliser votre commande'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
