// components/MenuCard.tsx (updated)
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flame } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { getCalories } from "@/lib/calorieData";

export default function MenuCard({
  name,
  image,
  price,
  accentColor,
}: {
  name: string;
  image: string;
  price?: string;
  accentColor?: string;
}) {
  const priceColor = accentColor ?? "#4a7c3f";
  const { addItem, openCart } = useCartStore();
  const [added, setAdded] = useState(false);
  const calories = getCalories(name);

  const handleAddToCart = () => {
    addItem({ name, image, price: price ?? "0dh", accentColor });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  return (
    <div className="flex flex-col h-full w-full cursor-pointer group">

      {/* Image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-200">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content block */}
      <div className="flex flex-col flex-1 mt-2 gap-1">

        {/* Title + Price row */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm sm:text-base font-medium text-gray-700 leading-tight flex-1 min-w-0">
            {name}
          </p>
          {price && (
            <span
              className="text-sm sm:text-base font-semibold flex-shrink-0 leading-tight tabular-nums"
              style={{ color: priceColor }}
            >
              {price}
            </span>
          )}
        </div>

        {/* Calories display */}
        {calories > 0 && (
          <div className="flex items-center gap-1 mt-0.5">
            <Flame size={12} className="text-orange-400" />
            <span className="text-xs text-gray-500">{calories} cal</span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.96 }}
          className="w-full rounded-xl text-sm font-semibold tracking-wide transition-colors duration-200 mt-2 py-2 px-4 border overflow-hidden relative"
          style={{
            borderColor: priceColor,
            color: added ? "#fff" : priceColor,
            backgroundColor: added ? priceColor : "transparent",
          }}
          aria-label={`Add ${name} to cart`}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                className="flex items-center justify-center gap-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <Check size={14} /> Added!
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}