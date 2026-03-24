"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import MenuCard from "./MenuCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { ChevronRight } from "lucide-react";

const juiceItems = [
  { name: "Mango smoothie",          image: "/18.jpg", price: "23dh" },
  { name: "Berry smoothie",          image: "/6.jpg",  price: "26dh" },
  { name: "Nutty & Berry smoothie",  image: "/19.jpg", price: "33dh" },
  { name: "Kiwi & berry smoothie",   image: "/7.jpg",  price: "28dh" },
  { name: "Protein smoothie",        image: "/17.jpg", price: "30dh" },
];

const ACCENT     = "#e07b3a";
const ACCENT_CLS = "bg-[#e07b3a]";

export default function JuiceSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (el.scrollLeft > 10) setShowHint(false);
      const firstCard = el.querySelector<HTMLElement>("[data-card]");
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth + 12;
      const index = Math.min(
        Math.round(el.scrollLeft / cardWidth),
        juiceItems.length - 1
      );
      setActiveIndex(index);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 12;
    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-[#fde8ef] py-12">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <motion.div
          className="flex flex-col items-center mb-10 px-4 sm:px-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-700 tracking-wide uppercase">
            Juice
          </h2>
          <motion.div
            className="mt-2 h-[3px] rounded-full bg-[#e07b3a]"
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          />
        </motion.div>

        {/* ── MOBILE: controlled snap carousel ── */}
        <div className="sm:hidden relative">

          {/* Swipe hint */}
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

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-scroll pb-4"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            {juiceItems.map((item, i) => (
              <motion.div
                key={i}
                data-card
                className="flex-shrink-0"
                style={{
                  width: "75vw",
                  maxWidth: "260px",
                  scrollSnapAlign: "start",
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <MenuCard name={item.name} image={item.image} price={item.price} accentColor={ACCENT} />
              </motion.div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            {juiceItems.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to card ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? `w-4 ${ACCENT_CLS}` : "w-1.5 bg-gray-300"
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
              {juiceItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0 w-[180px]"
                  variants={{
                    hidden:  { opacity: 0, y: 20, scale: 0.96 },
                    visible: { opacity: 1, y: 0,  scale: 1    },
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MenuCard name={item.name} image={item.image} price={item.price} accentColor={ACCENT} />
                </motion.div>
              ))}
            </motion.div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* ── DESKTOP: 5-col grid ── */}
        <motion.div
          className="hidden lg:grid grid-cols-5 gap-6 px-4 sm:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {juiceItems.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden:  { opacity: 0, y: 20, scale: 0.96 },
                visible: { opacity: 1, y: 0,  scale: 1    },
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <MenuCard name={item.name} image={item.image} price={item.price} accentColor={ACCENT} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}