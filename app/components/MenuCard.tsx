import Image from "next/image";

export default function MenuCard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <div className="flex flex-col items-center w-full cursor-pointer group">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-200">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="mt-2 text-sm sm:text-base font-medium text-gray-700 text-center leading-tight whitespace-normal">
        {name}
      </p>
    </div>
  );
}