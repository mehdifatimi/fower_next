'use server';

import { createClient } from '@/lib/supabase-server';

export async function sendMessage(formData: FormData) {

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    const supabase = await createClient();

    const { error } = await supabase
        .from('messages')
        .insert([{ name, email, phone, message }]);

    if (error) {
        console.error('Error sending message:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}
