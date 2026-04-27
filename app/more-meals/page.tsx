"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Flame } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

// ─── Types ─────────────────────────

type MenuItem = {
  name: string;
  image: string;
  price?: string;
  kcal: number;
};

const tabs = ["Breakfast", "Lunch", "Drinks", "Sauces"] as const;
type Tab = (typeof tabs)[number];

// ─── Data ─────────────────────────

const breakfastData = [
  {
    category: "Base",
    items: [
      { name: "Oat", image: "/a62.jpg", price: "25dh", kcal: 250 },
      { name: "Granola", image: "/a42.jpg", price: "30dh", kcal: 450 },
      { name: "Quinoa", image: "/a34.jpg", price: "28dh", kcal: 220 },
      { name: "Healthy waffles", image: "/a32.jpg", price: "35dh", kcal: 320 },
      { name: "Healthy pancakes", image: "/a35.jpg", price: "38dh", kcal: 350 },
      { name: "Whole meal bread", image: "/a36.jpg", price: "10dh", kcal: 120 },
      { name: "Eggs", image: "/a37.jpg", price: "20dh", kcal: 155 },
    ],
  },
  {
    category: "Fruits",
    items: [
      { name: "Berries", image: "/a38.jpg", price: "25dh", kcal: 80 },
      { name: "Banana", image: "/a39.jpg", price: "10dh", kcal: 105 },
      { name: "Kiwi", image: "/a70.jpg", price: "12dh", kcal: 90 },
      { name: "Avocado", image: "/a40.jpg", price: "20dh", kcal: 240 },
    ],
  },
  {
    category: "Liquids & Creamy",
    items: [
      { name: "Plant-based milk", image: "/a29.jpg", price: "18dh", kcal: 120 },
      { name: "Thick smoothie", image: "/a71.jpg", price: "35dh", kcal: 220 },
      { name: "Plain yogurt", image: "/a10.jpg", price: "12dh", kcal: 100 },
    ],
  },
  {
    category: "Toppings",
    items: [
      { name: "Chia seeds", image: "/a24.jpg", price: "10dh", kcal: 60 },
      { name: "Coconut", image: "/a41.jpg", price: "10dh", kcal: 90 },
      { name: "Dried fruits", image: "/a42.jpg", price: "15dh", kcal: 120 },
      { name: "Peanut butter", image: "/a11.jpg", price: "12dh", kcal: 100 },
      { name: "Agave syrup", image: "/a26.jpg", price: "10dh", kcal: 80 },
    ],
  },
];

const lunchData = [
  {
    category: "Base",
    items: [
      { name: "Whole grain bread", image: "/a36.jpg", price: "15dh", kcal: 260 },
      { name: "Whole grain toast", image: "/a26.jpg", price: "18dh", kcal: 220 },
      { name: "Whole wheat wrap", image: "/a43.jpg", price: "20dh", kcal: 240 },
      { name: "Brown rice", image: "/a34.jpg", price: "25dh", kcal: 350 },
      { name: "Whole wheat pasta", image: "/a44.jpg", price: "25dh", kcal: 360 },
      { name: "Bulgur", image: "/a22.jpg", price: "22dh", kcal: 330 },
    ],
  },
  {
    category: "Proteins",
    items: [
      { name: "Turkey", image: "/a21.jpg", price: "40dh", kcal: 180 },
      { name: "Ground meat", image: "/a20.jpg", price: "45dh", kcal: 280 },
      { name: "Grilled chicken", image: "/a46.jpg", price: "38dh", kcal: 220 },
      { name: "Fresh tuna", image: "/a45.jpg", price: "50dh", kcal: 190 },
      { name: "Eggs", image: "/a37.jpg", price: "20dh", kcal: 155 },
      { name: "Salmon", image: "/a47.jpg", price: "65dh", kcal: 330 },
    ],
  },
  {
    category: "Vegetables",
    items: [
      { name: "Corn", image: "/a22.jpg", price: "10dh", kcal: 70 },
      { name: "Fresh salad", image: "/a5.jpg", price: "15dh", kcal: 40 },
      { name: "Broccoli", image: "/a25.jpg", price: "12dh", kcal: 55 },
      { name: "Potatoes", image: "/a16.jpg", price: "10dh", kcal: 130 },
      { name: "Mushrooms", image: "/a17.jpg", price: "15dh", kcal: 40 },
      { name: "Beetroot", image: "/a18.jpg", price: "12dh", kcal: 60 },
      { name: "Carrots", image: "/a19.jpg", price: "8dh", kcal: 45 },
    ],
  },
];

const drinksData = [
  {
    category: "Drinks",
    items: [
      { name: "Water", image: "/a60.jpg", price: "5dh", kcal: 0 },
      { name: "Plant-based milk", image: "/a29.jpg", price: "20dh", kcal: 120 },
      { name: "Fresh juice", image: "/a1.jpg", price: "28dh", kcal: 140 },
      { name: "Coconut water", image: "/a41.jpg", price: "22dh", kcal: 70 },
      { name: "Whey", image: "/a58.jpg", price: "30dh", kcal: 120 },
    ],
  },
  {
    category: "Fruits for juices / smoothies",
    items: [
      { name: "Berries", image: "/a38.jpg", price: "1dh", kcal: 80 },
      { name: "Banana", image: "/a39.jpg", price: "3dh", kcal: 105 },
      { name: "Mango", image: "/a6.jpg", price: "6dh", kcal: 135 },
      { name: "Pineapple", image: "/a9.jpg", price: "4dh", kcal: 120 },
      { name: "Avocado", image: "/a40.jpg", price: "3dh", kcal: 240 },
      { name: "Lemon", image: "/a13.jpg", price: "2dh", kcal: 20 },
      { name: "Dried fruits", image: "/a42.jpg", price: "15dh", kcal: 120 },
      { name: "Apple", image: "/a8.jpg", price: "1dh", kcal: 95 },
    ],
  },
  {
    category: "Detox",
    items: [
      { name: "Lemon Detox", image: "/a48.jpg", price: "22dh", kcal: 30 },
      { name: "Green Detox", image: "/a59.jpg", price: "25dh", kcal: 50 },
      { name: "Tropical Detox", image: "/a52.jpg", price: "28dh", kcal: 90 },
      { name: "Berry Detox", image: "/a66.jpg", price: "28dh", kcal: 80 },
      { name: "Cucumber Fresh", image: "/a65.jpg", price: "22dh", kcal: 25 },
      { name: "Orange Mint", image: "/a69.jpg", price: "25dh", kcal: 70 },
      { name: "Matcha", image: "/a72.jpg", price: "25dh", kcal: 80 },
    ],
  },
];

const saucesData = [
  {
    category: "Home made Seasonings & Sauces",
    items: [
      { name: "Yogurt sauce lemon", image: "/a67.jpg", price: "10dh", kcal: 60 },
      { name: "Avocado sauce", image: "/a55.jpg", price: "15dh", kcal: 120 },
      { name: "Honey mustard", image: "/a56.jpg", price: "10dh", kcal: 90 },
      { name: "Spicy sauce", image: "/a64.jpg", price: "8dh", kcal: 40 },
      { name: "Garlic sauce", image: "/a61.jpg", price: "10dh", kcal: 100 },
      { name: "Pesto sauce", image: "/a57.jpg", price: "15dh", kcal: 130 },
    ],
  },
];

const tabData = {
  Breakfast: breakfastData,
  Lunch: lunchData,
  Drinks: drinksData,
  Sauces: saucesData,
};

// ─── Design tokens ─────────────────────────

const colors = {
  green: "#4a7c3f",
  greenLight: "#eef4ec",
  orange: "#e07b3a",
  orangeLight: "#faf0ea",
};

// ─── Card ─────────────────────────

function ModernCard({ item, accentColor }: { item: MenuItem; accentColor: string }) {
  const { addItem, openCart } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      name: item.name,
      image: item.image,
      price: item.price ?? "0dh",
      accentColor,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 600);
  };

  const isGreen = accentColor === colors.green;
  const flameTint = isGreen ? colors.green : colors.orange;
  const imgBg = isGreen ? colors.greenLight : colors.orangeLight;

  return (
    <Card
      className="group rounded-[18px] border-0 transition-all duration-200"
      style={{
        background: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 6px 16px rgba(0,0,0,0.09), 0 2px 6px rgba(0,0,0,0.05)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <CardContent className="p-3 flex items-center gap-4">
        {/* Image */}
        <div
          className="relative flex-shrink-0 rounded-[14px] overflow-hidden"
          style={{
            width: 66,
            height: 66,
            background: imgBg,
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium leading-tight truncate mb-[5px]"
            style={{
              color: "#1a1a1a",
              letterSpacing: "-0.1px",
            }}
          >
            {item.name}
          </p>
          <div className="flex items-center gap-1">
            <Flame
              size={11}
              strokeWidth={1.8}
              style={{ color: flameTint, opacity: 0.75, flexShrink: 0 }}
            />
            <p
              className="text-xs font-normal"
              style={{ color: "#8a9086" }}
            >
              {item.kcal} kcal
            </p>
          </div>
        </div>

        {/* Price */}
        {item.price && (
          <p
            className="text-xs font-medium flex-shrink-0"
            style={{ color: "#8a9086" }}
          >
            {item.price}
          </p>
        )}

        {/* Add button */}
        <Button
          size="icon"
          onClick={handleAdd}
          className="rounded-full flex-shrink-0 transition-all duration-150 active:scale-90"
          style={{
            backgroundColor: added ? "#22c55e" : accentColor,
            width: 34,
            height: 34,
            minWidth: 34,
            boxShadow: added
              ? "0 2px 8px rgba(34,197,94,0.35)"
              : isGreen
              ? "0 2px 8px rgba(74,124,63,0.32)"
              : "0 2px 8px rgba(224,123,58,0.32)",
            border: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          <span
            className="text-white font-light transition-all duration-200"
            style={{ fontSize: 20, lineHeight: 1 }}
          >
            {added ? "✓" : "+"}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────

export default function MoreMealsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Breakfast");

  const sections = tabData[activeTab];

  const accentColor =
    activeTab === "Breakfast"
      ? colors.green
      : activeTab === "Lunch"
      ? colors.orange
      : activeTab === "Drinks"
      ? colors.green
      : colors.orange;

  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #f7f8f5 0%, #ffffff 100%)" }}
    >
      {/* ── Header ── */}
      <div
        className="sticky top-0 z-20"
        style={{
          background: "rgba(247,248,245,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-0 flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center rounded-full transition-all duration-150 active:scale-90"
            style={{
              width: 36,
              height: 36,
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <ChevronLeft size={18} strokeWidth={2.2} style={{ color: "#1a1a1a" }} />
          </button>

          <h1
            className="font-semibold"
            style={{ fontSize: 16, letterSpacing: "-0.2px", color: "#1a1a1a" }}
          >
            More Meals
          </h1>

          <div style={{ width: 36 }} />
        </div>

        {/* ── Tabs ── */}
        <div className="max-w-2xl mx-auto px-4 pb-4 pt-3">
          <Tabs
            defaultValue="Breakfast"
            onValueChange={(val) => setActiveTab(val as Tab)}
          >
            <TabsList className="flex gap-2 bg-transparent p-0 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                const isGreenTab =
                  tab === "Breakfast" || tab === "Drinks";

                return (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 active:scale-95"
                    style={{
                      padding: "8px 18px",
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: "0.05px",
                      border: isActive
                        ? `1.5px solid ${isGreenTab ? colors.green : colors.orange}`
                        : "1.5px solid rgba(0,0,0,0.1)",
                      background: isActive
                        ? isGreenTab
                          ? colors.green
                          : colors.orange
                        : "#ffffff",
                      color: isActive ? "#ffffff" : "#8a9086",
                      boxShadow: isActive
                        ? isGreenTab
                          ? "0 3px 10px rgba(74,124,63,0.26)"
                          : "0 3px 10px rgba(224,123,58,0.26)"
                        : "none",
                      transform: isActive ? "scale(1.04)" : "scale(1)",
                    }}
                  >
                    {tab}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-2xl mx-auto px-4 py-7 flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.category}>
            {/* Section label */}
            <p
              className="mb-3 font-semibold"
              style={{
                color: accentColor,
                fontSize: 11,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
              }}
            >
              {section.category}
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.items.map((item: MenuItem) => (
                <ModernCard
                  key={item.name}
                  item={item}
                  accentColor={accentColor}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}