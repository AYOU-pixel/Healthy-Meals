"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 55, damping: 18 };
  const imgX = useSpring(useTransform(mouseX, [-500, 500], [-14, 14]), springConfig);
  const imgY = useSpring(useTransform(mouseY, [-300, 300], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  type Dot = { top?: string; bottom?: string; right: string; size: number };

  const dots: Dot[] = [
    { top: "10%",    right: "7%",  size: 9 },
    { top: "20%",    right: "16%", size: 5 },
    { top: "6%",     right: "25%", size: 7 },
    { top: "32%",    right: "5%",  size: 4 },
    { top: "15%",    right: "31%", size: 4 },
    { bottom: "22%", right: "7%",  size: 8 },
    { bottom: "30%", right: "15%", size: 5 },
    { bottom: "16%", right: "23%", size: 4 },
  ];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[radial-gradient(38%_72%_at_94%_52%,_#FFA88C_0%,_#F47E58_28%,_#F27750_58%,_#EB5E31_100%)]"
      style={{
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* ════════════════ MOBILE LAYOUT ════════════════ */}
      <div className="flex flex-col items-center text-center px-6 pt-12 pb-0 md:hidden">

        <motion.h1
          {...fadeUp(0.08)}
          className="text-white font-extrabold tracking-tight"
          style={{
            fontSize: "clamp(32px, 8.5vw, 46px)",
            lineHeight: "1.22",
            letterSpacing: "-0.4px",
            marginBottom: "12px",
          }}
        >
          Personalized<br />
          Healthy Meals<br />
          for Your Lifestyle
        </motion.h1>

        <motion.p
          {...fadeUp(0.22)}
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "15.5px",
            fontWeight: 400,
            letterSpacing: "0.3px",
            marginBottom: "28px",
          }}
        >
          Make it your way.
        </motion.p>

        <motion.div {...fadeUp(0.36)} style={{ marginBottom: "36px" }}>
          <motion.button
            whileHover={{
              scale: 1.06,
              boxShadow: "0 12px 32px rgba(0,0,0,0.26), 0 4px 14px rgba(235,94,49,0.30)",
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
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
              boxShadow: "0 4px 18px rgba(0,0,0,0.14), 0 2px 8px rgba(235,94,49,0.18)",
            }}
          >
            Order Now
          </motion.button>
        </motion.div>

        {/* ── MOBILE IMAGE ── */}
        <motion.img
          src="/14.png"
          alt="Fresh healthy food bowl"
          initial={{ opacity: 0, scale: 0.88, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
          style={{
            position: "relative",
            width: "150vw", // Reduced from 200vw
            maxWidth: "750px", // Reduced from 1000px
            height: "auto",
            objectFit: "contain",
            display: "block",
            filter: "drop-shadow(0px 18px 36px rgba(0,0,0,0.14))",
            marginBottom: "-60px",
            marginLeft: "-50vw",
          }}
        />
      </div>

      {/* ════════════════ DESKTOP LAYOUT ════════════════ */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          minHeight: "520px",
          padding: "52px 72px 60px 80px",
          gap: "24px",
        }}
      >
        {/* ── Left column: copy ── */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <motion.h1
            {...fadeUp(0.08)}
            style={{
              color: "#fff",
              fontSize: "clamp(48px, 4.8vw, 72px)",
              fontWeight: "800",
              lineHeight: "1.18",
              margin: "0",
              letterSpacing: "-1px",
              maxWidth: "100%",
            }}
          >
            Personalized<br />
            Healthy<br />
            Meals for<br />
            Your Lifestyle
          </motion.h1>

          <motion.p
            {...fadeUp(0.24)}
            style={{
              color: "rgba(255,255,255,0.82)",
              fontSize: "16px",
              margin: "18px 0 32px 0",
              fontWeight: "400",
              letterSpacing: "0.35px",
            }}
          >
            Make it your way.
          </motion.p>

          <motion.div {...fadeUp(0.38)}>
            <motion.button
              whileHover={{
                scale: 1.06,
                boxShadow: "0 14px 36px rgba(0,0,0,0.24), 0 6px 18px rgba(235,94,49,0.26)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
              style={{
                backgroundColor: "#fff",
                color: "#EB5E31",
                border: "none",
                borderRadius: "32px",
                padding: "16px 46px",
                fontSize: "16px",
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

        {/* ── Right column: image ── */}
        <div
          style={{
            position: "absolute",
            right: "-40px", // Changed from -80px to bring image more to the left
            top: "50%",
            transform: "translateY(-50%)",
            width: "60vw", // Reduced from 75vw
            maxWidth: "1000px", // Reduced from 1300px
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <motion.img
            src="/14.png"
            alt="Fresh healthy food bowl"
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
              x: imgX,
              y: imgY,
              filter: "drop-shadow(0px 24px 48px rgba(0,0,0,0.18))",
            }}
          />
        </div>
      </div>

      {/* ── Bottom-left decorative circle ── */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-24px",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          backgroundColor: "#d4562e",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── Decorative dots (desktop only) ── */}
      <div className="hidden md:block" aria-hidden="true">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.3 + i * 0.055, ease: "backOut" }}
            style={{
              position: "absolute",
              top: dot.top,
              bottom: dot.bottom,
              right: dot.right,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.30)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        ))}
      </div>
    </section>
  );
}