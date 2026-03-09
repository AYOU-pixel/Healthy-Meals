"use client";

import { motion } from "framer-motion";
import MenuCard from "./MenuCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type Item = {
  name: string;
  image: string;
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

export default function MenuSection({
  title,
  items,
}: {
  title: string;
  items: Item[];
}) {
  const bg     = sectionColors[title] ?? "bg-[#f4f7ef]";
  const accent = titleAccents[title]  ?? "bg-[#4a7c3f]";

  return (
    <section className={`w-full ${bg} py-12`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Title */}
        <motion.div
          className="flex flex-col items-center mb-10"
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

        {/* Mobile: 2-col grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden:   { opacity: 0, y: 20, scale: 0.96 },
                visible:  { opacity: 1, y: 0,  scale: 1    },
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <MenuCard name={item.name} image={item.image} />
            </motion.div>
          ))}
        </motion.div>

        {/* Tablet: horizontal scroll */}
        <div className="hidden sm:block lg:hidden">
          <ScrollArea className="w-full whitespace-nowrap">
            <motion.div
              className="flex gap-5 pb-4 px-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
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
                  <MenuCard name={item.name} image={item.image} />
                </motion.div>
              ))}
            </motion.div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Desktop: 5-col grid */}
        <motion.div
          className="hidden lg:grid grid-cols-5 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
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
              <MenuCard name={item.name} image={item.image} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}