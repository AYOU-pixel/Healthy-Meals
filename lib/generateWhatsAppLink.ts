// lib/generateWhatsAppLink.ts
import { CartItem } from "@/store/cartStore";

export type OrderFormData = {
  name: string;
  phone: string;
  address: string;
};

const WHATSAPP_NUMBER = "212619902620"; // +212 619-902620

const parseDH = (price: string) => parseInt(price.replace(/\D/g, ""), 10) || 0;

export function generateWhatsAppLink(
  items: CartItem[],
  form: OrderFormData
): string {
  const lines: string[] = [];

  lines.push("🥗 *NEW ORDER - FIT FOOD* 🥗");
  lines.push("━━━━━━━━━━━━━━━━━━━━━");
  lines.push("");
  lines.push("*👤 Customer Info*");
  lines.push(`   Name: ${form.name}`);
  lines.push(`   📞 Phone: ${form.phone}`);
  lines.push(`   📍 Address: ${form.address}`);
  lines.push("");
  lines.push("*🍽️ Order Details*");
  lines.push("━━━━━━━━━━━━━━━━━━━━━");

  for (const item of items) {
    const itemTotal = parseDH(item.price) * item.quantity;
    lines.push(`• ${item.name} x${item.quantity} — ${itemTotal} DH`);
  }

  const total = items.reduce(
    (sum, i) => sum + parseDH(i.price) * i.quantity,
    0
  );

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━━");
  lines.push(`💰 *TOTAL: ${total} DH*`);
  lines.push("");
  lines.push("_Thank you for ordering from Fit Food! 🌿_");

  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}