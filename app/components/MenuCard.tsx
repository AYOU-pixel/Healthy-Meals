import Image from "next/image";
import { Button } from "./ui/button";

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

  return (
    // h-full + flex-col so every card stretches to the tallest sibling
    <div className="flex flex-col h-full w-full cursor-pointer group">

      {/* ── Image ── */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-200">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* ── Content block: grows to fill remaining space ── */}
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

        {/* Spacer — pushes button to the bottom regardless of title length */}
        <div className="flex-1" />

        {/* ── Order Now ── */}
        <Button
          variant="outline"
          className="w-full rounded-xl text-sm font-semibold tracking-wide transition-colors duration-200 mt-2"
          style={{ borderColor: priceColor, color: priceColor }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = priceColor;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = priceColor;
          }}
          aria-label={`Order ${name}`}
        >
          Order Now
        </Button>
      </div>

    </div>
  );
}