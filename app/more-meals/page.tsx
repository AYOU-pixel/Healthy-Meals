"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
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

const lunchData = [
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

const drinksData = [
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

const saucesData = [
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

const tabData = {
  Breakfast: breakfastData,
  Lunch: lunchData,
  Drinks: drinksData,
  Sauces: saucesData,
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

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
      <CardContent className="p-3 flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{item.name}</p>
          <p className="text-xs text-gray-400">{item.kcal} kcal</p>
        </div>

        <Button
          size="sm"
          onClick={handleAdd}
          className="rounded-full"
          style={{ backgroundColor: accentColor }}
        >
          {added ? "✓" : "+"}
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
      ? "#4a7c3f"
      : activeTab === "Lunch"
      ? "#e07b3a"
      : activeTab === "Drinks"
      ? "#e07b3a"
      : "#e07b3a";

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur bg-white/80 border-b">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.back()}>
            <ChevronLeft />
          </button>
          <h1 className="font-semibold text-lg">More Meals</h1>
          <div className="w-6" />
        </div>

        {/* Tabs */}
        <div className="max-w-2xl mx-auto px-4 pb-3">
          <Tabs
            defaultValue="Breakfast"
            onValueChange={(val) => setActiveTab(val as Tab)}
          >
            <TabsList className="flex gap-2 bg-transparent p-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                    ${
                      isActive
                        ? "text-white shadow-md scale-[1.03]"
                        : "text-gray-500 bg-white border-gray-200 hover:border-gray-300"
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: accentColor,
                            borderColor: accentColor,
                          }
                        : {}
                    }
                  >
                    {tab}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.category}>
            <p
              className="text-sm font-bold mb-3"
              style={{ color: accentColor }}
            >
              {section.category}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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