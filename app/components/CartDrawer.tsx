"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { generateWhatsAppLink, OrderFormData } from "@/lib/generateWhatsAppLink";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalPrice, totalItems } =
    useCartStore();

  const [step, setStep] = useState<"cart" | "form">("cart");
  const [form, setForm] = useState<OrderFormData>({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState<Partial<OrderFormData>>({});

  const validate = () => {
    const e: Partial<OrderFormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.address.trim()) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const link = generateWhatsAppLink(items, form);
    window.open(link, "_blank");
    clearCart();
    closeCart();
    setStep("cart");
    setForm({ name: "", phone: "", address: "" });
  };

  const handleClose = () => {
    closeCart();
    setStep("cart");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#4a7c3f]" />
                <h2 className="font-semibold text-gray-800 text-lg">
                  {step === "cart" ? "Your Cart" : "Delivery Info"}
                </h2>
                {step === "cart" && totalItems() > 0 && (
                  <span className="bg-[#4a7c3f] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems()}
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {step === "cart" ? (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 flex flex-col gap-3"
                  >
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
                        <ShoppingBag size={48} strokeWidth={1} />
                        <p className="text-sm">Your cart is empty</p>
                        <p className="text-xs text-gray-300">Add items from the menu</p>
                      </div>
                    ) : (
                      items.map((item) => (
                        <motion.div
                          key={item.name}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 30 }}
                          className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3"
                        >
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 truncate">{item.name}</p>
                            <p
                              className="text-xs font-semibold mt-0.5"
                              style={{ color: item.accentColor ?? "#4a7c3f" }}
                            >
                              {item.price}
                            </p>

                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.name, -1)}
                                className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#4a7c3f] transition-colors"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.name, 1)}
                                className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#4a7c3f] transition-colors"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => removeItem(item.name)}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 flex flex-col gap-4"
                  >
                    <p className="text-sm text-gray-500">
                      Fill in your details and we'll send your order via WhatsApp.
                    </p>

                    {(["name", "phone", "address"] as const).map((field) => (
                      <div key={field} className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          {field === "name" ? "👤 Full Name" : field === "phone" ? "📞 Phone Number" : "📍 Delivery Address"}
                        </label>
                        {field === "address" ? (
                          <textarea
                            rows={2}
                            value={form[field]}
                            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            placeholder="Street, neighborhood, city..."
                            className={`w-full rounded-xl border px-3 py-2 text-sm resize-none outline-none transition-colors focus:border-[#4a7c3f] ${
                              errors[field] ? "border-red-400" : "border-gray-200"
                            }`}
                          />
                        ) : (
                          <input
                            type={field === "phone" ? "tel" : "text"}
                            value={form[field]}
                            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            placeholder={field === "name" ? "Your full name" : "+212 6XX-XXXXXX"}
                            className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#4a7c3f] ${
                              errors[field] ? "border-red-400" : "border-gray-200"
                            }`}
                          />
                        )}
                        {errors[field] && (
                          <p className="text-xs text-red-400">{errors[field]}</p>
                        )}
                      </div>
                    ))}

                    {/* Order summary recap */}
                    <div className="bg-[#eef3e8] rounded-2xl p-3 mt-1">
                      <p className="text-xs font-semibold text-[#4a7c3f] mb-2">Order Summary</p>
                      {items.map((item) => (
                        <div key={item.name} className="flex justify-between text-xs text-gray-600 py-0.5">
                          <span>{item.name} x{item.quantity}</span>
                          <span>{parseInt(item.price) * item.quantity} DH</span>
                        </div>
                      ))}
                      <div className="border-t border-[#4a7c3f]/20 mt-2 pt-2 flex justify-between font-semibold text-sm text-[#4a7c3f]">
                        <span>Total</span>
                        <span>{totalPrice()} DH</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-4 flex flex-col gap-3">
                {step === "cart" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="font-bold text-gray-800">{totalPrice()} DH</span>
                  </div>
                )}

                {step === "form" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep("cart")}
                      className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="flex-1 py-3 rounded-xl bg-[#25D366] text-white text-sm font-bold hover:bg-[#20bc5a] transition-colors flex items-center justify-center gap-2"
                    >
                      <WhatsAppIcon />
                      Send Order
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setStep("form")}
                    className="w-full py-3.5 rounded-xl bg-[#4a7c3f] text-white font-bold text-sm hover:bg-[#3d6a34] transition-colors"
                  >
                    Proceed to Checkout →
                  </button>
                )}

                {step === "cart" && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-400 hover:text-red-400 transition-colors text-center"
                  >
                    Clear cart
                  </button>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}