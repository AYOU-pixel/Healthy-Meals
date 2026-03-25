"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import MenuCard from "./MenuCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { ChevronRight, ChevronLeft } from "lucide-react";

type Item = {
  name: string;
  image: string;
  price?: string;
};

const sectionColors: Record<string, string> = {
  Breakfast: "bg-[#eef3e8]",
  Lunch:     "bg-[#f5d9cf]",
  Juice:     "bg-[#fde8ef]",
};

const titleAccents: Record<string, string> = {
  Breakfast: "bg-[#4a7c3f]",
  Lunch:     "bg-[#e07b3a]",
  Juice:     "bg-[#e07b3a]",
};

const accentHex: Record<string, string> = {
  Breakfast: "#4a7c3f",
  Lunch:     "#e07b3a",
  Juice:     "#e07b3a",
};

export default function MenuSection({
  title,
  items,
}: {
  title: string;
  items: Item[];
}) {
  const bg     = sectionColors[title] ?? "bg-[#f4f7ef]";
  const accent = titleAccents[title]  ?? "bg-[#4a7c3f]";
  const hex    = accentHex[title]     ?? "#4a7c3f";

  // ── Mobile carousel state ──────────────────────────────────────────────────
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (el.scrollLeft > 10) setShowHint(false);
      const firstCard = el.querySelector<HTMLElement>("[data-card]");
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth + 12;
      const index = Math.min(Math.round(el.scrollLeft / cardWidth), items.length - 1);
      setActiveIndex(index);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [items.length]);

  const scrollMobileTo = (i: number) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 12;
    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  };

  // ── Desktop carousel state (Lunch only) ───────────────────────────────────
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_SCROLL_AMOUNT = 280; // px per arrow click

  const updateArrows = useCallback(() => {
    const el = desktopScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = desktopScrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => el.removeEventListener("scroll", updateArrows);
  }, [updateArrows]);

  const scrollDesktop = (dir: "left" | "right") => {
    const el = desktopScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? CARD_SCROLL_AMOUNT : -CARD_SCROLL_AMOUNT, behavior: "smooth" });
  };

  const isLunch = title === "Lunch";

  return (
    <section className={`w-full ${bg} py-12`}>
      <div className="max-w-6xl mx-auto">

        {/* ── Title ── */}
        <motion.div
          className="flex flex-col items-center mb-10 px-4 sm:px-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-700 tracking-wide uppercase">
            {title}
          </h2>
          <motion.div
            className={`mt-2 h-[3px] rounded-full ${accent}`}
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          />
        </motion.div>

        {/* ── MOBILE: controlled snap carousel ── */}
        <div className="sm:hidden relative">
          <motion.div
            className="absolute right-4 top-1/3 -translate-y-1/2 z-10 pointer-events-none"
            initial={{ opacity: 0, x: -4 }}
            animate={showHint ? { opacity: [0, 1, 1, 0], x: [-4, 0, 0, 4] } : { opacity: 0 }}
            transition={{ duration: 1.8, repeat: showHint ? Infinity : 0, repeatDelay: 1 }}
          >
            <div className="flex items-center gap-0.5 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
              <span className="text-[10px] text-gray-500 font-medium">swipe</span>
              <ChevronRight size={12} className="text-gray-400" />
            </div>
          </motion.div>

          <div className="overflow-hidden px-4">
            <div
              ref={mobileScrollRef}
              className="flex gap-3 overflow-x-scroll pb-4"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                scrollPaddingLeft: "0px",
              }}
            >
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  data-card
                  className={`flex-shrink-0 ${i === items.length - 1 ? "pr-4" : ""}`}
                  style={{
                    width: "calc(75vw - 16px)",
                    maxWidth: "260px",
                    scrollSnapAlign: "start",
                  }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MenuCard name={item.name} image={item.image} price={item.price} accentColor={hex} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-1.5 mt-3">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to card ${i + 1}`}
                onClick={() => scrollMobileTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? `w-4 ${accent}` : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── TABLET: horizontal scroll ── */}
        <div className="hidden sm:block lg:hidden px-4 sm:px-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <motion.div
              className="flex gap-5 pb-4 px-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0 w-[180px]"
                  variants={{
                    hidden:  { opacity: 0, y: 20, scale: 0.96 },
                    visible: { opacity: 1, y: 0,  scale: 1    },
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MenuCard name={item.name} image={item.image} price={item.price} accentColor={hex} />
                </motion.div>
              ))}
            </motion.div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* ── DESKTOP ── */}
        {isLunch ? (
          /* Lunch → single-row horizontal carousel with arrow nav */
          <div className="hidden lg:block relative px-4 sm:px-6">

            {/* Left arrow */}
            <button
              onClick={() => scrollDesktop("left")}
              aria-label="Scroll left"
              className={`
                absolute left-0 top-1/2 -translate-y-1/2 z-10
                w-10 h-10 flex items-center justify-center
                rounded-full bg-white shadow-md
                border border-gray-100
                transition-all duration-200
                hover:shadow-lg hover:scale-105 active:scale-95
                ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}
              `}
              style={{ color: hex }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Scroll track */}
            <div
              ref={desktopScrollRef}
              className="flex gap-5 overflow-x-scroll pb-2"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Hide WebKit scrollbar */}
              <style>{`
                div[data-lunch-scroll]::-webkit-scrollbar { display: none; }
              `}</style>

              {items.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0"
                  style={{
                    width: "220px",
                    scrollSnapAlign: "start",
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MenuCard name={item.name} image={item.image} price={item.price} accentColor={hex} />
                </motion.div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scrollDesktop("right")}
              aria-label="Scroll right"
              className={`
                absolute right-0 top-1/2 -translate-y-1/2 z-10
                w-10 h-10 flex items-center justify-center
                rounded-full bg-white shadow-md
                border border-gray-100
                transition-all duration-200
                hover:shadow-lg hover:scale-105 active:scale-95
                ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}
              `}
              style={{ color: hex }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        ) : (
          /* Breakfast / other sections → original 5-col grid */
          <motion.div
            className="hidden lg:grid grid-cols-5 gap-6 px-4 sm:px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden:  { opacity: 0, y: 20, scale: 0.96 },
                  visible: { opacity: 1, y: 0,  scale: 1    },
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <MenuCard name={item.name} image={item.image} price={item.price} accentColor={hex} />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}