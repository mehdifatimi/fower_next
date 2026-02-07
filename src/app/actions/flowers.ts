'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function createFlower(formData: FormData) {
    const supabase = await createClient();

    const name_fr = formData.get('name_fr') as string;
    const name_ar = formData.get('name_ar') as string;
    const description_fr = formData.get('description_fr') as string;
    const description_ar = formData.get('description_ar') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);
    const category_id = formData.get('category_id') as string;
    const featured = formData.get('featured') === 'on';
    const imageUrl = formData.get('imageUrl') as string;

    const { error } = await supabase
        .from('flowers')
        .insert([{
            name_fr,
            name_ar,
            description_fr,
            description_ar,
            price,
            stock,
            category_id,
            featured,
            images: { m: imageUrl } // Simplified for now
        }]);

    if (error) {
        console.error('Error creating flower:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/[locale]/admin/flowers', 'page');
    revalidatePath('/[locale]', 'page');
    return { success: true };
}

export async function updateFlower(id: string, formData: FormData) {
    const supabase = await createClient();

    const name_fr = formData.get('name_fr') as string;
    const name_ar = formData.get('name_ar') as string;
    const description_fr = formData.get('description_fr') as string;
    const description_ar = formData.get('description_ar') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);
    const category_id = formData.get('category_id') as string;
    const featured = formData.get('featured') === 'on';
    const imageUrl = formData.get('imageUrl') as string;

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

    revalidatePath('/[locale]/admin/flowers', 'page');
    revalidatePath('/[locale]', 'page');
    return { success: true };
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
