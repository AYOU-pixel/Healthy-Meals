"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  { src: "/g1.jpg", alt: "Restaurant interior" },
  { src: "/g2.jpg", alt: "Fresh juice pouring" },
  { src: "/g3.jpg", alt: "Food presentation" },
  { src: "/g5.jpg", alt: "Chef cooking" },
  { src: "/g4.jpg", alt: "Salad bowls" },
];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

function GalleryItem({
  src,
  alt,
  className,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] group ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#EB5E31]/0 group-hover:bg-[#EB5E31]/10 transition-colors duration-400 z-10 rounded-3xl" />
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="w-full bg-white py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <motion.div
          className="flex flex-col items-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#EB5E31]">
            Gallery
          </h2>
          <motion.div
            className="mt-3 h-[3px] rounded-full bg-[#EB5E31]/40"
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
          />
        </motion.div>

        {/* Desktop grid — original 3-col layout */}
        <motion.div
          className="hidden sm:grid grid-cols-3 grid-rows-3 gap-4 h-[500px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <GalleryItem src={galleryImages[0].src} alt={galleryImages[0].alt} className="col-span-3" delay={0} />
          <GalleryItem src={galleryImages[2].src} alt={galleryImages[2].alt} className="row-span-2" delay={0.08} />
          <GalleryItem src={galleryImages[1].src} alt={galleryImages[1].alt} delay={0.16} />
          <GalleryItem src={galleryImages[3].src} alt={galleryImages[3].alt} className="row-span-2" delay={0.24} />
          <GalleryItem src={galleryImages[4].src} alt={galleryImages[4].alt} delay={0.2} />
        </motion.div>

        {/* Mobile grid — simple 2-col stack */}
        <motion.div
          className="grid sm:hidden grid-cols-2 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* First image spans full width */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-2 relative overflow-hidden rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] aspect-[16/7] group"
          >
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={galleryImages[0].src} alt={galleryImages[0].alt} fill className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-[#EB5E31]/0 group-hover:bg-[#EB5E31]/10 transition-colors duration-300 z-10 rounded-2xl" />
          </motion.div>

          {/* Remaining 4 in 2-col grid */}
          {[galleryImages[2], galleryImages[1], galleryImages[3], galleryImages[4]].map((img, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.10)] aspect-square group"
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-[#EB5E31]/0 group-hover:bg-[#EB5E31]/10 transition-colors duration-300 z-10 rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}