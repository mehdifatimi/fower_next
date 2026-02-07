'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function createFlower(locale: string, formData: FormData) {
    const supabase = await createClient();

    const name_fr = formData.get('name_fr') as string;
    const name_ar = formData.get('name_ar') as string;
    const description_fr = formData.get('description_fr') as string;
    const description_ar = formData.get('description_ar') as string;
    const category_id = formData.get('category_id') as string;
    const featured = formData.get('featured') === 'on';
    const priceInput = parseFloat(formData.get('price') as string) || parseFloat(formData.get('price_m') as string) || 0;
    const stockInput = parseInt(formData.get('stock') as string) || parseInt(formData.get('stock_m') as string) || 0;
    const imageUrl = formData.get('image_m') as string;

    const { data: flower, error } = await supabase
        .from('flowers')
        .insert([{
            name_fr,
            name_ar,
            description_fr,
            description_ar,
            price: priceInput,
            stock: stockInput,
            category_id,
            featured,
            images: { m: imageUrl }
        }])
        .select()
        .single();

    if (error || !flower) {
        console.error('Error creating flower:', error);
        return { success: false, error: error?.message || 'Failed to create flower' };
    }

    // Insert Variants
    const variants = ['s', 'm', 'l'].map(size => {
        const price = parseFloat(formData.get(`price_${size}`) as string);
        const stock = parseInt(formData.get(`stock_${size}`) as string);
        const image = formData.get(`image_${size}`) as string;

        if (isNaN(price)) return null;

        return {
            flower_id: flower.id,
            size: size.toUpperCase(),
            price,
            stock: isNaN(stock) ? 0 : stock,
            image_url: image || null
        };
    }).filter(Boolean);

    if (variants.length > 0) {
        const { error: variantError } = await supabase
            .from('flower_variants')
            .insert(variants);

        if (variantError) {
            console.error('Error creating variants:', variantError);
        }
    }

    revalidatePath('/[locale]/admin/flowers', 'page');
    revalidatePath('/[locale]', 'page');
    return { success: true };
}

export async function updateFlower(id: string, locale: string, formData: FormData) {
    const supabase = await createClient();

    const name_fr = formData.get('name_fr') as string;
    const name_ar = formData.get('name_ar') as string;
    const description_fr = formData.get('description_fr') as string;
    const description_ar = formData.get('description_ar') as string;
    const category_id = formData.get('category_id') as string;
    const featured = formData.get('featured') === 'on';
    const price = parseFloat(formData.get('price') as string) || parseFloat(formData.get('price_m') as string) || 0;
    const stock = parseInt(formData.get('stock') as string) || parseInt(formData.get('stock_m') as string) || 0;
    const imageUrl = formData.get('image_m') as string;

    const { error } = await supabase
        .from('flowers')
        .update({
            name_fr,
            name_ar,
            description_fr,
            description_ar,
            price,
            stock,
            category_id,
            featured,
            images: { m: imageUrl }
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating flower:', error);
        return { success: false, error: error.message };
    }

    // Update Variants (Upsert logic)
    const variants = ['s', 'm', 'l'].map(size => {
        const price = parseFloat(formData.get(`price_${size}`) as string);
        const stock = parseInt(formData.get(`stock_${size}`) as string);
        const image = formData.get(`image_${size}`) as string;

        if (isNaN(price)) return null;

        return {
            flower_id: id,
            size: size.toUpperCase(),
            price,
            stock: isNaN(stock) ? 0 : stock,
            image_url: image || null
        };
    }).filter(Boolean);

    if (variants.length > 0) {
        // Simple delete and re-insert for variants to avoid complex upsert conflicts in this demo
        await supabase.from('flower_variants').delete().eq('flower_id', id);
        const { error: variantError } = await supabase
            .from('flower_variants')
            .insert(variants);

        if (variantError) {
            console.error('Error updating variants:', variantError);
        }
    }

    revalidatePath(`/${locale}/admin/flowers`);
    revalidatePath(`/${locale}`);
    redirect(`/${locale}/admin/flowers`);
}

export async function deleteFlower(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('flowers')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting flower:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/[locale]/admin/flowers', 'page');
    revalidatePath('/[locale]', 'page');
    return { success: true };
}
