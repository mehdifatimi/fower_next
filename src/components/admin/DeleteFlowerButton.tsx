'use client';

import { Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { deleteFlower } from '@/app/actions/flowers';
import { useRouter } from 'next/navigation';

interface DeleteFlowerButtonProps {
    id: string;
}

export default function DeleteFlowerButton({ id }: DeleteFlowerButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette fleur ?')) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await deleteFlower(id);
            if (result.success) {
                router.refresh();
            } else {
                alert('Erreur lors de la suppression: ' + result.error);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Une erreur est survenue lors de la suppression.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-brand-sage hover:text-red-500 transition-colors disabled:opacity-50"
            title="Supprimer"
        >
            {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Trash2 className="w-4 h-4" />
            )}
        </button>
    );
}
