"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Plus, Check, Flame } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

// ─── Types ─────────────────────────────────────────────────────────────────────

type MenuItem = {
  name: string;
  image: string;
  price?: string;
  kcal: number;
};

type Section = { category: string; items: MenuItem[] };
const tabs = ["Breakfast", "Lunch", "Drinks", "Sauces"] as const;
type Tab = (typeof tabs)[number];

// ─── Data ──────────────────────────────────────────────────────────────────────

const breakfastData: Section[] = [
  {
    category: "Base",
    items: [
      { name: "Oat",              image: "/a62.jpg", price: "18dh", kcal: 350 },
      { name: "Granola",          image: "/a42.jpg", price: "22dh", kcal: 420 },
      { name: "Quinoa",           image: "/a34.jpg", price: "20dh", kcal: 220 },
      { name: "Healthy waffles",  image: "/a32.jpg", price: "25dh", kcal: 290 },
      { name: "Healthy pancakes", image: "/a35.jpg", price: "28dh", kcal: 310 },
      { name: "Whole meal bread", image: "/a36.jpg", price: "8dh",  kcal: 85  },
      { name: "Eggs",             image: "/a37.jpg", price: "15dh", kcal: 155 },
    ],
  },
  {
    category: "Fruits",
    items: [
      { name: "Berries", image: "/a38.jpg", price: "22dh", kcal: 85  },
      { name: "Banana",  image: "/a39.jpg", price: "8dh",  kcal: 105 },
      { name: "Kiwi",    image: "/a6.jpg",  price: "10dh", kcal: 90  },
      { name: "Avocado", image: "/a40.jpg", price: "18dh", kcal: 240 },
    ],
  },
  {
    category: "Liquids & Creamy",
    items: [
      { name: "Plant-based milk", image: "/a29.jpg", price: "12dh", kcal: 110 },
      { name: "Thick smoothie",   image: "/a32.jpg", price: "28dh", kcal: 210 },
      { name: "Plain yogurt",     image: "/a10.jpg", price: "9dh",  kcal: 120 },
    ],
  },
  {
    category: "Toppings",
    items: [
      { name: "Chia seeds",    image: "/a4.jpg",  price: "8dh",  kcal: 70  },
      { name: "Coconut",       image: "/a41.jpg", price: "7dh",  kcal: 95  },
      { name: "Dried fruits",  image: "/a42.jpg", price: "12dh", kcal: 110 },
      { name: "Peanut butter", image: "/a11.jpg", price: "10dh", kcal: 95  },
      { name: "Agave syrup",   image: "/a26.jpg", price: "7dh",  kcal: 110 },
    ],
  },
];

const lunchData: Section[] = [
  {
    category: "Base",
    items: [
      { name: "Whole grain bread",  image: "/a36.jpg", price: "10dh", kcal: 260 },
      { name: "Whole grain toast",  image: "/a26.jpg", price: "12dh", kcal: 210 },
      { name: "Whole wheat wrap",   image: "/a43.jpg", price: "14dh", kcal: 230 },
      { name: "Brown rice",         image: "/a34.jpg", price: "18dh", kcal: 350 },
      { name: "Whole wheat pasta",  image: "/a44.jpg", price: "18dh", kcal: 360 },
      { name: "Bulgur",             image: "/a22.jpg", price: "16dh", kcal: 340 },
    ],
  },
  {
    category: "Proteins",
    items: [
      { name: "Turkey",          image: "/a21.jpg", price: "32dh", kcal: 180 },
      { name: "Ground meat",     image: "/a20.jpg", price: "35dh", kcal: 280 },
      { name: "Grilled chicken", image: "/a46.jpg", price: "30dh", kcal: 220 },
      { name: "Fresh tuna",      image: "/a45.jpg", price: "40dh", kcal: 190 },
      { name: "Eggs",            image: "/a37.jpg", price: "15dh", kcal: 155 },
      { name: "Salmon",          image: "/a47.jpg", price: "55dh", kcal: 330 },
    ],
  },
  {
    category: "Vegetables",
    items: [
      { name: "Corn",         image: "/a22.jpg", price: "8dh",  kcal: 70  },
      { name: "Fresh salad",  image: "/a5.jpg",  price: "12dh", kcal: 35  },
      { name: "Broccoli",     image: "/a25.jpg", price: "10dh", kcal: 55  },
      { name: "Potatoes",     image: "/a16.jpg", price: "8dh",  kcal: 130 },
      { name: "Mushrooms",    image: "/a17.jpg", price: "12dh", kcal: 40  },
      { name: "Beetroot",     image: "/a18.jpg", price: "10dh", kcal: 60  },
      { name: "Carrots",      image: "/a19.jpg", price: "6dh",  kcal: 45  },
    ],
  },
];

const drinksData: Section[] = [
  {
    category: "Drinks",
    items: [
      { name: "Water",            image: "/a60.jpg", price: "5dh",  kcal: 0   },
      { name: "Plant-based milk", image: "/a29.jpg", price: "15dh", kcal: 110 },
      { name: "Fresh juice",      image: "/a1.jpg",  price: "22dh", kcal: 150 },
      { name: "Coconut water",    image: "/a41.jpg", price: "18dh", kcal: 70  },
      { name: "Whey",             image: "/a58.jpg", price: "25dh", kcal: 120 },
    ],
  },
  {
    category: "Fruits for juices / smoothies",
    items: [
      { name: "Berries",      image: "/a38.jpg", price: "22dh", kcal: 85  },
      { name: "Banana",       image: "/a39.jpg", price: "8dh",  kcal: 105 },
      { name: "Mango",        image: "/a6.jpg",  price: "12dh", kcal: 130 },
      { name: "Pineapple",    image: "/a9.jpg",  price: "10dh", kcal: 120 },
      { name: "Avocado",      image: "/a40.jpg", price: "18dh", kcal: 240 },
      { name: "Lemon",        image: "/a13.jpg", price: "5dh",  kcal: 45  },
      { name: "Dried fruits", image: "/a42.jpg", price: "12dh", kcal: 110 },
      { name: "Apple",        image: "/a8.jpg",  price: "6dh",  kcal: 95  },
    ],
  },
  {
    category: "Detox",
    items: [
      { name: "Lemon Detox",    image: "/a48.jpg", price: "18dh", kcal: 35 },
      { name: "Green Detox",    image: "/a59.jpg", price: "22dh", kcal: 55 },
      { name: "Tropical Detox", image: "/a52.jpg", price: "24dh", kcal: 90 },
      { name: "Berry Detox",    image: "/a49.jpg", price: "24dh", kcal: 80 },
      { name: "Cucumber Fresh", image: "/a51.jpg", price: "18dh", kcal: 30 },
      { name: "Orange Mint",    image: "/a53.jpg", price: "20dh", kcal: 70 },
      { name: "Apple Cinnamon", image: "/a50.jpg", price: "18dh", kcal: 85 },
    ],
  },
];

const saucesData: Section[] = [
  {
    category: "Home made Seasonings & Sauces",
    items: [
      { name: "Yogurt sauce lemon", image: "/a10.jpg", price: "8dh",  kcal: 70  },
      { name: "Avocado sauce",      image: "/a55.jpg", price: "12dh", kcal: 110 },
      { name: "Honey mustard",      image: "/a56.jpg", price: "7dh",  kcal: 85  },
      { name: "Spicy sauce",        image: "/a12.jpg", price: "6dh",  kcal: 45  },
      { name: "Garlic sauce",       image: "/a61.jpg", price: "7dh",  kcal: 95  },
      { name: "Pesto sauce",        image: "/a57.jpg", price: "10dh", kcal: 130 },
    ],
  },
];

const tabData: Record<Tab, Section[]> = {
  Breakfast: breakfastData,
  Lunch:     lunchData,
  Drinks:    drinksData,
  Sauces:    saucesData,
};

// Per-tab accent + background tint
const tabStyle: Record<Tab, { accent: string; pill: string; label: string; dot: string }> = {
  Breakfast: {
    accent: "#3d6b35",
    pill:   "rgba(74,124,63,0.1)",
    label:  "#4a7c3f",
    dot:    "#4a7c3f",
  },
  Lunch: {
    accent: "#c4631e",
    pill:   "rgba(224,123,58,0.1)",
    label:  "#e07b3a",
    dot:    "#e07b3a",
  },
  Drinks: {
    accent: "#2563c0",
    pill:   "rgba(59,130,246,0.1)",
    label:  "#3b82f6",
    dot:    "#3b82f6",
  },
  Sauces: {
    accent: "#7c3aad",
    pill:   "rgba(139,92,246,0.1)",
    label:  "#8b5cf6",
    dot:    "#8b5cf6",
  },
};

// ─── Premium Card ───────────────────────────────────────────────────────────────

function MealCard({ item, accent }: { item: MenuItem; accent: string }) {
  const { addItem, openCart } = useCartStore();
  const [added, setAdded] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleAdd = () => {
    if (added) return;
    addItem({ name: item.name, image: item.image, price: item.price ?? "0dh", accentColor: accent });
    setAdded(true);
    setTimeout(() => { setAdded(false); openCart(); }, 750);
  };

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100/80 transition-all duration-300 ease-out"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 10px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 60%)" }}
        />

        {/* Price badge — top left */}
        {item.price && (
          <div
            className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-white text-[11px] font-bold tracking-wide backdrop-blur-sm"
            style={{ backgroundColor: `${accent}e6` }}
          >
            {item.price}
          </div>
        )}

        {/* Add button — top right, floating */}
        <button
          onClick={handleAdd}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          aria-label={`Add ${item.name}`}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200"
          style={{
            backgroundColor: added ? accent : "rgba(255,255,255,0.92)",
            color: added ? "#fff" : accent,
            transform: pressed ? "scale(0.88)" : "scale(1)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
          }}
        >
          {added
            ? <Check size={14} strokeWidth={2.5} />
            : <Plus size={15} strokeWidth={2.5} />
          }
        </button>
      </div>

      {/* Text */}
      <div className="px-3.5 py-3">
        <p className="text-[13px] font-semibold text-gray-800 leading-snug truncate">
          {item.name}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <Flame size={10} className="text-orange-400 flex-shrink-0" />
          <span className="text-[11px] text-gray-400 font-medium">{item.kcal} kcal</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MoreMealsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Breakfast");

  const sections = tabData[activeTab];
  const style    = tabStyle[activeTab];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f7f8f9" }}>

      {/* ── Sticky header ───────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-30 border-b border-gray-100"
        style={{ backgroundColor: "rgba(247,248,249,0.92)", backdropFilter: "blur(12px)" }}
      >
        {/* Back row */}
        <div className="flex items-center gap-3 px-5 pt-4 pb-1">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 transition-all duration-150 hover:bg-gray-50 active:scale-95"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            aria-label="Go back"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <h1 className="text-[16px] font-bold text-gray-800 tracking-tight">Build Your Meal</h1>
        </div>

        {/* Tab row */}
        <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const ts = tabStyle[tab];
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200"
                style={
                  isActive
                    ? {
                        backgroundColor: ts.accent,
                        color: "#fff",
                        boxShadow: `0 4px 14px ${ts.accent}40`,
                        transform: "scale(1.03)",
                      }
                    : {
                        backgroundColor: "#fff",
                        color: "#6b7280",
                        border: "1.5px solid #e5e7eb",
                      }
                }
              >
                {tab}
              </button>
            );
          })}
        </div>
      </header>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="px-5 pt-6 pb-24 flex flex-col gap-10">
        {sections.map((section, si) => (
          <section key={section.category}>

            {/* Section header */}
            <div className="flex items-center gap-2.5 mb-4">
              {/* Colored accent bar */}
              <div
                className="w-1 h-5 rounded-full flex-shrink-0"
                style={{ backgroundColor: style.label }}
              />
              <p
                className="text-[13px] font-bold uppercase tracking-[0.08em]"
                style={{ color: style.label }}
              >
                {section.category}
              </p>
              {/* Item count pill */}
              <span
                className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: style.pill, color: style.label }}
              >
                {section.items.length}
              </span>
            </div>

            {/* Card grid — responsive: 2 cols mobile, 3 tablet, 4 desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {section.items.map((item) => (
                <MealCard key={item.name} item={item} accent={style.accent} />
              ))}
            </div>

          </section>
        ))}
      </div>

    </main>
  );
}