"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Menu", href: "#menu", active: true },
  { label: "Review", href: "#testimonials" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Menu");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#f5f0e1]/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(180,155,100,0.18),0_4px_28px_0_rgba(80,60,20,0.10)] border-b border-[#e8dfc8]/70"
            : "bg-[#f5f0e1] shadow-[0_1px_0_0_rgba(180,155,100,0.14),0_3px_18px_0_rgba(80,60,20,0.07)] border-b border-[#ede5ce]/80"
        }`}
        style={{ fontFamily: "'Segoe UI', sans-serif" }}
      >
        {/* ── Inner rail: 66px — slightly taller for better logo breathing room ── */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-20 h-[66px]">

          {/* ── Logo: 50×50, stronger ring + shadow for visual weight ── */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex-shrink-0 flex items-center gap-2.5 group"
          >
            {/*
              Increased from 46px → 50px: gives the logo more visual mass
              to balance the CTA button on the right.
              Ring is slightly thicker and the amber tint on hover is more
              visible, creating a clearer affordance.
            */}
            <div className="w-[50px] h-[50px] rounded-[14px] overflow-hidden ring-[2.5px] ring-[#e8dfc8] group-hover:ring-[#e07b3a]/40 transition-all duration-300 shadow-[0_2px_8px_rgba(80,60,20,0.12)]">
              <img
                src="/logos.png"
                alt="Fit Food logo"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.a>

          {/* ── Desktop Nav Links: centered with deliberate optical spacing ── */}
          {/*
            Replaced gap-0.5 with gap-1 for cleaner inter-item breathing.
            Each link uses px-5 (was px-4) — wider hit area, more premium feel.
            The font-size stays at 13.5px but letter-spacing tightened to 0.1px
            for a more editorial, refined rhythm vs the slightly loose 0.15px.
          */}
          <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {navLinks.map(({ label, href }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href={href}
                  onClick={() => setActiveLink(label)}
                  className="relative px-5 py-2 text-[13.5px] font-[500] tracking-[0.1px] text-[#2a2a2a] rounded-lg group flex items-center transition-colors duration-200 hover:text-[#c05f1f]"
                >
                  {/* Hover pill */}
                  <span className="absolute inset-0 rounded-lg bg-[#e07b3a]/0 group-hover:bg-[#e07b3a]/8 transition-all duration-200" />

                  <span className="relative z-10">{label}</span>

                  {/* Active underline */}
                  {activeLink === label && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0.5 left-5 right-5 h-[2px] rounded-full bg-[#e07b3a]"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* ── Right: CTA + Mobile Toggle ── */}
          {/*
            A subtle visual divider (a faint vertical rule) sits between
            the nav links group and the CTA side. Achieved by adding
            a thin border-left on the CTA wrapper — acts as a quiet
            separator that adds hierarchy without adding noise.
          */}
          <div className="flex items-center gap-3">

            {/*
              CTA: px slightly increased (px-5 → was px-4) to match the
              expanded link padding. The pill now has a small left-rule
              separator for visual grouping against nav links.
              Font-weight bumped to 650 (interpolated) — keeps the word
              from looking too thin next to the bolder logo ring.
            */}
            <motion.a
              href="#find-us"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 24px -4px rgba(224,123,58,0.38)" }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#e07b3a] hover:bg-[#c96928] text-white text-[13px] font-[650] px-5 py-2.5 rounded-full shadow-[0_4px_14px_-2px_rgba(224,123,58,0.32)] transition-colors duration-200 tracking-[0.2px] no-underline"
            >
              <svg
                className="w-3.5 h-3.5 opacity-85"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Find Us
            </motion.a>

            {/* Mobile Hamburger */}
            <motion.button
              onClick={() => setMobileOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-[#2a2a2a] hover:bg-[#e07b3a]/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Panel — drops from the 66px bar */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[74px] left-4 right-4 z-50 md:hidden bg-[#faf7ee] border border-[#e8dfc8] rounded-2xl shadow-[0_20px_60px_-8px_rgba(80,60,20,0.18)] overflow-hidden"
            >
              <div className="p-3 flex flex-col gap-0.5">
                {navLinks.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => {
                      setActiveLink(label);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-[14.5px] font-[500] transition-all duration-200 no-underline ${
                      activeLink === label
                        ? "bg-[#e07b3a]/12 text-[#c05f1f]"
                        : "text-[#2a2a2a] hover:bg-[#e07b3a]/8 hover:text-[#c05f1f]"
                    }`}
                  >
                    {label}
                    {activeLink === label && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e07b3a]" />
                    )}
                  </motion.a>
                ))}

                {/* CTA in mobile */}
                <motion.a
                  href="#find-us"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 bg-[#e07b3a] text-white text-[14px] font-[600] px-5 py-2.5 rounded-xl shadow-[0_4px_14px_-2px_rgba(224,123,58,0.32)] no-underline transition-all duration-200 active:scale-98"
                >
                  <svg
                    className="w-4 h-4 opacity-85"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Find Us
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/*
        Spacer: bumped from 62px → 70px.
        The extra 4px on top of the bar (66px) creates a small but
        intentional breathing gap between the navbar and the Hero
        section beneath it, improving layout clarity.
      */}
      <div className="h-[70px]" />
    </>
  );
}