import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FlowerSize = 'S' | 'M' | 'L' | 'XL';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    size: FlowerSize;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string, size: FlowerSize) => void;
    updateQuantity: (id: string, size: FlowerSize, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (newItem) => {
                const items = get().items;
                const existingItem = items.find(
                    (item) => item.id === newItem.id && item.size === newItem.size
                );

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === newItem.id && item.size === newItem.size
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...newItem, quantity: 1 }] });
                }
            },

            removeItem: (id, size) => {
                set({
                    items: get().items.filter((item) => !(item.id === id && item.size === size)),
                });
            },

            updateQuantity: (id, size, quantity) => {
                if (quantity < 1) return;
                set({
                    items: get().items.map((item) =>
                        item.id === id && item.size === size ? { ...item, quantity } : item
                    ),
                });
            },

            clearCart: () => set({ items: [] }),

            total: () => {
                return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'atar-al-ward-cart',
        }
    )
);
