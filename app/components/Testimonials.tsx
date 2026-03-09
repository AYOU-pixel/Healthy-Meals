"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah Parker",
    image: "/img1.jpg",
    initials: "SP",
    review: "Absolutely delicious! The flavors were rich and the service was excellent.",
  },
  {
    name: "Rita Chunem",
    image: "/img2.jpg",
    initials: "RC",
    review: "Every dish was perfectly cooked. You can really taste the quality.",
  },
  {
    name: "Mark Rojo",
    image: "/img3.jpg",
    initials: "MR",
    review: "Fresh ingredients, great atmosphere, and friendly staff. I'll be back!",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full bg-[#fafafa] py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#EB5E31] mb-3">
            Testimonials
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xs mx-auto leading-relaxed">
            What our customers are saying about us.
          </p>
          {/* Accent bar */}
          <motion.div
            className="mt-4 mx-auto h-[3px] rounded-full bg-[#EB5E31]/40"
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          />
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.97 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="h-full"
              >
                <Card className="relative h-full rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_40px_-8px_rgba(235,94,49,0.15)] transition-shadow duration-300">

                  {/* Top accent strip */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#EB5E31]/60 via-[#EB5E31] to-[#EB5E31]/60" />

                  <CardContent className="flex flex-col items-center text-center pt-8 pb-8 px-6">

                    {/* Quote icon */}
                    <Quote className="absolute top-5 right-5 w-6 h-6 text-[#EB5E31] opacity-20" />

                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.07 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="mb-4"
                    >
                      <Avatar className="w-20 h-20 ring-2 ring-[#EB5E31]/25 ring-offset-2">
                        <AvatarImage
                          src={r.image}
                          alt={r.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-sm font-semibold bg-[#EB5E31]/10 text-[#EB5E31]">
                          {r.initials}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>

                    {/* Name */}
                    <p className="font-semibold text-gray-800 text-[15px] mb-1">
                      {r.name}
                    </p>

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg
                          key={s}
                          className="w-3.5 h-3.5 text-[#EB5E31]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="w-8 h-[2px] bg-[#EB5E31]/40 rounded-full mb-4" />

                    {/* Review */}
                    <p className="text-muted-foreground text-sm leading-relaxed italic">
                      "{r.review}"
                    </p>

                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}