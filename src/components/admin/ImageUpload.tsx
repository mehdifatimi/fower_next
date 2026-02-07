'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase';
import { Upload, X, Loader2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { getPublicImageUrl } from '@/lib/utils';

interface ImageUploadProps {
    name: string;
    defaultValue?: string;
    label?: string;
}

export default function ImageUpload({ name, defaultValue, label }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(defaultValue || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset states
        setUploading(true);
        setError(null);
        setSuccess(false);

        try {
            // 1. Create unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `flowers/${fileName}`;

            // 2. Upload to Supabase Storage (Assumes 'flowers' bucket exists)
            const { error: uploadError, data } = await supabase.storage
                .from('flowers')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 3. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('flowers')
                .getPublicUrl(filePath);

            setPreview(publicUrl);
            setSuccess(true);
        } catch (err: any) {
            console.error('Upload error:', err);
            setError(err.message || 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const clearImage = () => {
        setPreview(null);
        setSuccess(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-2">
            {label && <label className="block text-xs uppercase tracking-widest font-bold text-brand-sage mb-2">{label}</label>}

            <div className="relative group">
                <div className={`relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed transition-all ${preview ? 'border-brand-sage' : 'border-brand-rose/20 bg-brand-cream/10 hover:border-brand-sage/50'
                    }`}>
                    {preview ? (
                        <>
                            <Image
                                src={getPublicImageUrl(preview)}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2 bg-white rounded-full text-brand-sage hover:text-brand-gold transition-colors"
                                >
                                    <Upload className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={clearImage}
                                    className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50 ml-2 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 flex flex-col items-center justify-center text-brand-sage/60 hover:text-brand-sage transition-colors"
                        >
                            <Upload className="w-8 h-8 mb-2" />
                            <span className="text-xs font-medium uppercase tracking-widest">Ajouter Image</span>
                        </button>
                    )}

                    {uploading && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
                            <Loader2 className="w-8 h-8 animate-spin text-brand-sage" />
                        </div>
                    )}

                    {success && !uploading && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                    )}
                </div>

                {error && <p className="text-[10px] text-red-500 mt-1 font-medium">{error}</p>}

                {/* Hidden Inputs */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*"
                />
                <input type="hidden" name={name} value={preview || ''} />
            </div>
        </div>
    );
}
