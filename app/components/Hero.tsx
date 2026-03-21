"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 60, damping: 20 };
  const imgX = useSpring(useTransform(mouseX, [-500, 500], [-10, 10]), springConfig);
  const imgY = useSpring(useTransform(mouseY, [-300, 300], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const dots = [
    { top: "10%", right: "7%",  size: 8 },
    { top: "20%", right: "15%", size: 5 },
    { top: "6%",  right: "24%", size: 6 },
    { top: "30%", right: "5%",  size: 4 },
    { top: "14%", right: "30%", size: 4 },
    { bottom: "20%", right: "6%",  size: 7 },
    { bottom: "28%", right: "14%", size: 5 },
    { bottom: "15%", right: "22%", size: 4 },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[radial-gradient(30.09%_33.05%_at_69.91%_56.31%,_#FFA88C_13.94%,_#F47E58_36.16%,_#F27750_60.66%,_#EB5E31_100%)]"
      style={{
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* ── MOBILE layout ── */}
      <div className="flex flex-col items-center text-center px-7 pt-11 pb-0 md:hidden">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-extrabold tracking-tight mb-3"
          style={{
            fontSize: "clamp(30px, 7.8vw, 44px)",
            lineHeight: "1.17",
            letterSpacing: "-0.5px",
          }}
        >
          Personalized<br />
          Healthy Meals<br />
          for Your Lifestyle
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
          style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: "15px",
            fontWeight: 400,
            letterSpacing: "0.3px",
          }}
        >
          Make it your way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 28px rgba(0,0,0,0.22)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              backgroundColor: "#fff",
              color: "#EB5E31",
              border: "none",
              borderRadius: "32px",
              padding: "14px 38px",
              fontSize: "15.5px",
              fontWeight: "700",
              cursor: "pointer",
              letterSpacing: "0.1px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.14), 0 2px 8px rgba(235,94,49,0.18)",
            }}
          >
            Order Now
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
          style={{
            width: "min(62vw, 250px)",
            height: "min(62vw, 250px)",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 22px 60px -8px rgba(160,60,10,0.34), 0 0 0 6px rgba(255,255,255,0.10)",
          }}
        >
          <img
            src="/14.png"
            alt="Hero"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0) 55%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>

      {/* ── DESKTOP layout ── */}
      <div
        className="hidden md:flex items-center"
        style={{ minHeight: "340px", padding: "44px 80px 56px 80px" }}
      >
        <div style={{ position: "relative", zIndex: 2, maxWidth: "310px" }}>

          {/* Headline: 40px, lineHeight 1.22, margin reset to 0 —
              all spacing flows from paragraph's margin-top for one
              clean rhythm source. */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: "#fff",
              fontSize: "40px",
              fontWeight: "800",
              lineHeight: "1.22",
              margin: "0",
              letterSpacing: "-0.5px",
            }}
          >
            Personalized<br />
            Healthy<br />
            Meals for<br />
            Your lifestyle
          </motion.h1>

          {/* Subheading: quieter opacity (0.78) creates clear hierarchy step.
              Wider letter-spacing (0.35px) gives a refined, editorial quality
              that contrasts with the tight headline tracking. */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: "rgba(255,255,255,0.78)",
              fontSize: "15px",
              margin: "14px 0 26px 0",
              fontWeight: "400",
              letterSpacing: "0.35px",
            }}
          >
            Make it your way.
          </motion.p>

          {/* CTA: substantially larger (15px 42px padding, 15.5px font).
              Warm brand-tinted shadow makes it glow against the gradient
              without looking disconnected from the palette. */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 32px rgba(0,0,0,0.22), 0 4px 14px rgba(235,94,49,0.22)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{
                backgroundColor: "#fff",
                color: "#EB5E31",
                border: "none",
                borderRadius: "32px",
                padding: "15px 42px",
                fontSize: "15.5px",
                fontWeight: "700",
                cursor: "pointer",
                letterSpacing: "0.1px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.14), 0 2px 10px rgba(235,94,49,0.20)",
              }}
            >
              Order Now
            </motion.button>
          </motion.div>
        </div>

        {/* Image: 350px — firmly supportive, not dominant.
            Thicker white ring (8px, 0.12 opacity) adds a premium
            "plated dish" quality. right: 90px centres it in the
            right half within the updated padding. */}
        <motion.div
          style={{
            position: "absolute",
            right: "90px",
            top: "50%",
            translateY: "-50%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            overflow: "hidden",
            zIndex: 1,
            x: imgX,
            y: imgY,
            boxShadow: "0 22px 60px -8px rgba(160,60,10,0.34), 0 0 0 8px rgba(255,255,255,0.12)",
          }}
          initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/14.png"
            alt="Hero"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0) 55%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>

      {/* Bottom-left circle — unchanged */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          bottom: "-55px",
          left: "-22px",
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          backgroundColor: "#d4562e",
          zIndex: 0,
        }}
      />

      {/* Dots — desktop only */}
      <div className="hidden md:block">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.05, ease: "backOut" }}
            style={{
              position: "absolute",
              top: dot.top,
              bottom: (dot as any).bottom,
              right: dot.right,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.28)",
              zIndex: 1,
            }}
          />
        ))}
      </div>
    </section>
  );
}