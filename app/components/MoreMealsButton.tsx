"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function MoreMealsButton({ accentColor }: { accentColor?: string }) {
  const router = useRouter();
  const color = accentColor ?? "#4a7c3f";

  return (
    <div className="flex justify-center py-6">
      <button
        onClick={() => router.push("/more-meals")}
        className="group flex items-center gap-2 px-6 py-2.5 rounded-full border-2 text-sm font-semibold transition-all duration-200 hover:shadow-md active:scale-95"
        style={{
          borderColor: color,
          color: color,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = color;
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = color;
        }}
      >
        More Meals
        <ChevronRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </button>
    </div>
  );
}