"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function FloatingCartButton() {
  const { totalItems, openCart, isOpen } = useCartStore();
  const count = totalItems();

  if (isOpen) return null;

  return (
    <motion.button
      onClick={openCart}
      aria-label="Open cart"
      className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-[#4a7c3f] text-white shadow-lg flex items-center justify-center hover:bg-[#3d6a34] transition-colors"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <ShoppingBag size={22} />

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#e07b3a] text-white text-[10px] font-bold flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {count > 9 ? "9+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}