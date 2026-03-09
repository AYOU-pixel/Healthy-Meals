"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Separator } from "./ui/separator";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

const socialLinks = [
  { icon: <Instagram className="w-4 h-4 text-white" />, href: "#" },
  { icon: <Facebook  className="w-4 h-4 text-white" />, href: "#" },
  { icon: <TikTokIcon />,                               href: "#" },
  { icon: <Linkedin  className="w-4 h-4 text-white" />, href: "#" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const colVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const socialContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const socialItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export default function Footer() {
  return (
    <footer
      id="contact"
      className="w-full text-white"
      style={{ backgroundColor: "#4a7c3f" }}
    >
      {/* Top bar */}
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-4 text-center sm:text-left"
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-sm text-white/80 leading-tight hidden sm:block">
          More<br />Informations?
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Contact US
        </h2>

        <motion.a
          href="tel:+212648921735"
          className="text-sm font-semibold text-[#EB5E31] hover:underline transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          +212 6 48 92 17 35
        </motion.a>
      </motion.div>

      <Separator className="bg-white/20" />

      {/* Main footer content */}
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={containerVariants}
      >
        {/* Key pages */}
        <motion.div className="space-y-3" variants={colVariants}>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">
            Key pages
          </h4>
          <ul className="space-y-2 text-sm text-white/85">
            {[
              { label: "Menu",       href: "#menu"         },
              { label: "Reviews",    href: "#testimonials" },
              { label: "Contact us", href: "#contact"      },
            ].map(({ label, href }) => (
              <li key={label}>
                <motion.a
                  href={href}
                  className="inline-block hover:text-white transition-colors"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {label}
                </motion.a>
              </li>
            ))}
            <li>
              <motion.a
                href="#find-us"
                className="inline-flex items-center gap-1 border border-white/60 rounded-md px-2 py-0.5 text-xs font-medium hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Find us ↗
              </motion.a>
            </li>
          </ul>
        </motion.div>

        {/* Address */}
        <motion.div className="space-y-3" variants={colVariants}>
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">
            Fes, Morocco
          </h4>
          <div className="text-sm text-white/85 space-y-1">
            <p>Boulevard</p>
            <p>Mohammed VI, Fes</p>
            <p className="font-semibold text-white">+212 6 48 92 17 35</p>
          </div>
          <motion.a
            href="#"
            className="inline-flex items-center gap-1 text-sm text-white underline underline-offset-2 hover:text-white/80 transition-colors"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            See on map ↗
          </motion.a>
        </motion.div>

        {/* Newsletter + Social — full width on mobile when 2-col, full col on md+ */}
        <motion.div
          className="space-y-4 sm:col-span-2 md:col-span-1"
          variants={colVariants}
        >
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-2">
              Want to be close to us?
            </h4>
            <motion.a
              href="#"
              className="inline-flex items-center gap-1 text-sm text-white underline underline-offset-2 hover:text-white/80 transition-colors"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Sign up for our newsletter →
            </motion.a>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">
              Follow Us
            </h4>
            <motion.div
              className="flex items-center gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={socialContainerVariants}
            >
              {socialLinks.map(({ icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  variants={socialItemVariants}
                  whileHover={{ scale: 1.18, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="bg-black rounded-full p-1.5 transition-colors"
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <Separator className="bg-white/20" />

      {/* Bottom copyright */}
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-8 py-4 flex justify-center sm:justify-end"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-xs text-white/70">© 2026 Fit Food</p>
      </motion.div>
    </footer>
  );
}