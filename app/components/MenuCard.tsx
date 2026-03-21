import Image from "next/image";

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
    <div className="flex flex-col items-center w-full cursor-pointer group">
      {/* Image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-200">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Title + Price row */}
      <div className="mt-2 w-full flex items-start justify-between gap-2">
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
    </div>
  );
}