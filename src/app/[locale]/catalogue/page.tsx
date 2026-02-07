import { getTranslations } from 'next-intl/server';

export default async function CataloguePage() {
    const t = await getTranslations('Index');

    return (
        <div className="h-[calc(100vh-100px)] bg-brand-cream p-4">
            <div className="container mx-auto h-full px-0 md:px-6">
                <div className="w-full h-full bg-white rounded-lg shadow-xl overflow-hidden border border-brand-rose/20">
                    <iframe
                        src="/catalogue.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                        className="w-full h-full"
                        title="Catalogue"
                    />
                </div>
            </div>
        </div>
    );
}
