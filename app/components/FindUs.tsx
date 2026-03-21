"use client";

import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Phone, ShoppingBag, Star, Clock, MapPin } from "lucide-react";

export default function FindUs() {
  return (
    <section id="find-us" className="w-full bg-white py-14 sm:py-18 px-4 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#EB5E31]">
            Find Us
          </h2>
          <motion.div
            className="mt-3 h-[3px] rounded-full bg-[#EB5E31]/40"
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
          />
        </motion.div>

        {/* Two-column card */}
        <motion.div
          className="rounded-2xl border border-gray-100 shadow-[0_4px_32px_-4px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col lg:flex-row"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >

          {/* LEFT: Map — 65% width on desktop */}
          <div className="relative w-full lg:w-[65%] h-64 sm:h-80 lg:h-auto lg:min-h-[420px]">
            <iframe
              title="Restaurant Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13000!2d-5.15!3d33.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda44fb0d5f5a931%3A0x5f0f48e6b0e8e0e!2sSa%C3%AFss!5e0!3m2!1sen!2sma!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", position: "absolute", inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Address pill overlaid on map */}
            <motion.div
              className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.12)] border border-gray-100"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <MapPin className="w-3.5 h-3.5 text-[#EB5E31] flex-shrink-0" />
              <span className="text-xs font-medium text-gray-700">Saïss, Fès, Morocco</span>
            </motion.div>
          </div>

          {/* RIGHT: Info panel — 35% width on desktop */}
          <div className="w-full lg:w-[35%] flex flex-col justify-between px-6 py-7 bg-white border-t lg:border-t-0 lg:border-l border-gray-100">

            <div className="space-y-5">

              {/* Google Rating */}
              <motion.div
                className="flex items-center gap-2 flex-wrap"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-1.5">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.6, delay: 0.9, ease: "easeInOut" }}
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                  <span className="text-sm font-bold text-gray-900">4.8</span>
                </div>
                <span className="text-sm text-gray-500 font-medium">Google rating</span>
                <span className="text-sm text-[#EB5E31] font-medium">(120 Reviews)</span>
              </motion.div>

              <Separator className="bg-gray-100" />

              {/* Opening Hours */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm font-bold text-gray-800">Opening hours</span>
                  <Badge
                    variant="outline"
                    className="text-[#EB5E31] border-[#EB5E31]/30 bg-[#EB5E31]/5 text-xs font-medium px-2 py-0 animate-pulse"
                  >
                    Open Now
                  </Badge>
                </div>

                <div className="space-y-2 pl-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">Mon – Fri</span>
                    <span className="text-xs font-semibold">
                      <span className="text-[#EB5E31]">8:00 AM</span>
                      <span className="text-gray-400 mx-1">–</span>
                      <span className="text-[#EB5E31]">10:00 PM</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">Sat – Sun</span>
                    <span className="text-xs font-semibold">
                      <span className="text-[#EB5E31]">9:00 AM</span>
                      <span className="text-gray-400 mx-1">–</span>
                      <span className="text-[#EB5E31]">11:00 PM</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              <Separator className="bg-gray-100" />
            </div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col gap-2.5 pt-5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
              >
                <Button className="w-full rounded-full bg-[#EB5E31] hover:bg-[#d4512a] text-white font-semibold gap-2 h-11 shadow-[0_4px_14px_-2px_rgba(235,94,49,0.38)] border-0">
                  <ShoppingBag className="w-4 h-4" />
                  Order Now
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
              >
                <Button
                  variant="outline"
                  className="w-full rounded-full border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 font-medium gap-2 h-11"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </Button>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}