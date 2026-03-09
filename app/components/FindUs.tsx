"use client";

import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Phone, ShoppingBag, Star, Clock } from "lucide-react";

export default function FindUs() {
  return (
    <section id="find-us" className="w-full bg-white py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-lg mx-auto">

        {/* Title */}
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

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="rounded-2xl border border-gray-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] overflow-hidden">

            {/* Top accent strip */}
            <div className="h-1 w-full bg-gradient-to-r from-[#EB5E31]/60 via-[#EB5E31] to-[#EB5E31]/60" />

            <CardContent className="px-5 sm:px-6 pt-6 pb-8 space-y-5">

              {/* Google Rating */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-sm font-semibold text-gray-800">Google rating</span>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, delay: 0.9, ease: "easeInOut" }}
                >
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </motion.div>
                <span className="text-sm font-bold text-gray-800">4.8</span>
                <span className="text-sm text-[#EB5E31] font-medium">(120 Reviews)</span>
              </motion.div>

              {/* Map Embed */}
              <motion.div
                className="w-full h-48 sm:h-52 rounded-xl overflow-hidden border border-gray-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)]"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <iframe
                  title="Restaurant Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.3!2d-5.15!3d33.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda44fb0d5f5a931%3A0x5f0f48e6b0e8e0e!2sSa%C3%AFss!5e0!3m2!1sen!2sma!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>

              <Separator className="bg-gray-100" />

              {/* Opening Hours */}
              <motion.div
                className="space-y-2.5"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm font-bold text-gray-800">Opening hours</span>
                  <Badge
                    variant="outline"
                    className="text-[#EB5E31] border-[#EB5E31]/30 bg-[#EB5E31]/5 text-xs font-medium px-2 py-0 animate-pulse"
                  >
                    Open Now
                  </Badge>
                </div>

                <div className="pl-6 space-y-1.5">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Mon – Fri: </span>
                    <span className="text-[#EB5E31] font-semibold">8:00 AM</span>
                    <span className="text-gray-400"> – </span>
                    <span className="text-[#EB5E31] font-semibold">10:00 PM</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Sat – Sun: </span>
                    <span className="text-[#EB5E31] font-semibold">9:00 AM</span>
                    <span className="text-gray-400"> – </span>
                    <span className="text-[#EB5E31] font-semibold">11:00 PM</span>
                  </p>
                </div>
              </motion.div>

              <Separator className="bg-gray-100" />

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 pt-1"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-[#4a7c3f] text-[#4a7c3f] hover:bg-[#4a7c3f]/5 hover:text-[#4a7c3f] font-medium gap-2 h-11"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us
                  </Button>
                </motion.div>

                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  <Button
                    className="w-full rounded-full bg-white border border-[#EB5E31] text-[#EB5E31] hover:bg-[#EB5E31]/5 font-medium gap-2 shadow-none h-11"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Order Now
                  </Button>
                </motion.div>
              </motion.div>

            </CardContent>
          </Card>
        </motion.div>

      </div>
    </section>
  );
}