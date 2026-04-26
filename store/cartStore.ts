// store/cartStore.ts (updated)
import { create } from "zustand";
import { getCalories } from "@/lib/calorieData";

export type CartItem = {
  name: string;
  image: string;
  price: string; // e.g. "27dh"
  accentColor?: string;
  quantity: number;
  calories: number; // Add calories field
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity" | "calories">) => void;
  removeItem: (name: string) => void;
  updateQuantity: (name: string, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
  totalCalories: () => number;
};

const parseDH = (price: string) => parseInt(price.replace(/\D/g, ""), 10) || 0;

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) => {
    const calories = getCalories(item.name);
    set((state) => {
      const existing = state.items.find((i) => i.name === item.name);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.name === item.name 
              ? { ...i, quantity: i.quantity + 1 } 
              : i
          ),
        };
      }
      return { 
        items: [...state.items, { ...item, quantity: 1, calories }] 
      };
    });
  },

  removeItem: (name) =>
    set((state) => ({ items: state.items.filter((i) => i.name !== name) })),

  updateQuantity: (name, delta) =>
    set((state) => ({
      items: state.items
        .map((i) => 
          i.name === name 
            ? { ...i, quantity: Math.max(1, i.quantity + delta) } 
            : i
        )
        .filter((i) => i.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + parseDH(i.price) * i.quantity, 0),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalCalories: () =>
    get().items.reduce((sum, i) => sum + i.calories * i.quantity, 0),
}));