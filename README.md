# 🥗 Fit Food — Healthy Meals Landing Page

A modern, fully responsive restaurant landing page built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and **shadcn/ui**. Designed for a healthy food brand offering personalized meals delivered to your door.

---

## ✨ Features

- **Fully responsive** — mobile, tablet, and desktop layouts
- **Smooth animations** — scroll-triggered reveals, staggered cards, parallax hero
- **Component-based** — clean separation of sections as reusable components
- **shadcn/ui** — accessible UI primitives (Card, Badge, Button, ScrollArea, etc.)
- **Next.js Image** — optimized image loading with correct aspect ratios throughout
- **Framer Motion** — professional micro-interactions on every section

---

## 🗂️ Project Structure

```
├── app/
│   ├── page.tsx               # Main page — composes all sections
│   ├── globals.css            # Global styles, brand tokens, base resets
│   └── components/
│       ├── Navbar.tsx         # Fixed top nav with scroll-aware glass effect
│       ├── Hero.tsx           # Full-width hero with parallax image
│       ├── MenuSection.tsx    # Reusable menu section (Breakfast / Lunch)
│       ├── MenuCard.tsx       # Individual food card with hover animation
│       ├── JuiceSection.tsx   # Dedicated juice/smoothie section
│       ├── Testimonials.tsx   # 3-column customer review cards
│       ├── FindUs.tsx         # Location card with embedded Google Map
│       ├── Gallery.tsx        # Bento-style photo gallery grid
│       ├── Footer.tsx         # Multi-column footer with social links
│       └── ui/                # shadcn/ui primitives
│           ├── badge.tsx
│           ├── button.tsx
│           ├── card.tsx
│           ├── scroll-area.tsx
│           └── separator.tsx
├── public/                    # Static assets
│   ├── logo.png
│   ├── 14.png                 # Hero food image
│   ├── 1.jpg – 19.jpg         # Menu item images
│   ├── g1.jpg – g5.jpg        # Gallery images
│   └── img1.jpg – img3.jpg    # Testimonial avatars
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🧩 Sections

| Section | Component | Description |
|---|---|---|
| Navigation | `Navbar.tsx` | Fixed navbar, scroll glass effect, mobile drawer |
| Hero | `Hero.tsx` | Gradient hero, circular food image, mouse parallax |
| Menu | `MenuSection.tsx` | Breakfast & Lunch — 2-col mobile, scroll tablet, 5-col desktop |
| Juice | `JuiceSection.tsx` | Smoothies — same responsive layout as MenuSection |
| Testimonials | `Testimonials.tsx` | 3 review cards with star ratings, staggered entrance |
| Find Us | `FindUs.tsx` | Google Map embed, opening hours, call/order buttons |
| Gallery | `Gallery.tsx` | Bento grid desktop, 2-col mobile |
| Footer | `Footer.tsx` | Links, address, newsletter, social icons |

---

## 🎨 Design System

### Brand Colors

| Token | Value | Usage |
|---|---|---|
| `#EB5E31` | Orange | Primary accent — headings, stars, badges |
| `#e07b3a` | Soft orange | Lunch & Juice section accents |
| `#4a7c3f` | Green | Brand green — navbar CTA, footer background |
| `#eef3e8` | Light green | Breakfast section background |
| `#f5d9cf` | Light peach | Lunch section background |
| `#fde8ef` | Light pink | Juice section background |

### Typography
- **Font:** `'Segoe UI', sans-serif` (set globally in `globals.css`)
- Headings: `font-bold` / `font-semibold` with `tracking-wide` or `tracking-tight`
- Body: `text-sm` / `text-base` with `leading-relaxed`

### Responsive Breakpoints

| Breakpoint | Width | Layout behavior |
|---|---|---|
| Mobile | `< 640px` | Stacked layouts, 2-col card grids |
| Tablet | `sm` 640px+ | Horizontal scroll for cards, 2-col footer |
| Desktop | `lg` 1024px+ | 5-col card grids, full side-by-side layouts |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fit-food.git
cd fit-food

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 14+ | React framework |
| `react` | 18+ | UI library |
| `framer-motion` | latest | Animations & micro-interactions |
| `tailwindcss` | 4+ | Utility-first CSS |
| `tw-animate-css` | latest | Tailwind animation utilities |
| `lucide-react` | latest | Icon library |
| `shadcn/ui` | latest | Accessible UI components |

---

## 🖼️ Image Setup

All images are served from the `/public` directory and use Next.js `<Image>` with `fill` + `object-cover` for consistent aspect ratios.

| Image | File | Used in |
|---|---|---|
| Logo | `/logo.png` | Navbar |
| Hero dish | `/14.png` | Hero section |
| Breakfast items | `/1.jpg`, `/3.jpg`, `/8.jpg`, `/10.jpg`, `/15.jpg` | Breakfast menu |
| Lunch items | `/2.jpg`, `/9.jpg`, `/11.jpg`, `/13.jpg`, `/16.jpg` | Lunch menu |
| Smoothies | `/6.jpg`, `/7.jpg`, `/17.jpg`, `/18.jpg`, `/19.jpg` | Juice section |
| Gallery | `/g1.jpg` – `/g5.jpg` | Gallery section |
| Avatars | `/img1.jpg` – `/img3.jpg` | Testimonials |

---

## 📍 Google Maps

The **Find Us** section embeds a Google Maps iframe pointing to the Saïss area in Fes, Morocco. To update the location, replace the `src` URL in `FindUs.tsx`:

```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
  ...
/>
```

Generate your embed URL at [Google Maps → Share → Embed a map](https://maps.google.com).

---

## 📱 Responsive Strategy

Each section uses a three-tier responsive approach:

```
Mobile  (< sm)  → grid-cols-2, stacked layouts, full-width elements
Tablet  (sm–lg) → ScrollArea horizontal rows, 2-col grids
Desktop (lg+)   → grid-cols-5 cards, side-by-side hero, 3-col footer
```

The `Navbar` uses a mobile drawer (`AnimatePresence` + Framer Motion) that replaces the desktop horizontal link row below `md`.

---

## 🎬 Animation Summary

| Component | Animation |
|---|---|
| Navbar | Slide down on mount, glass blur on scroll, active link indicator |
| Hero | Staggered text entrance, image scale-in, mouse parallax |
| Menu cards | Scroll-triggered stagger, hover lift + image zoom |
| Testimonials | Staggered card entrance, avatar hover scale |
| Find Us | Section fade-in, map scale-in, button spring hover |
| Gallery | Staggered grid reveal, image zoom on hover |
| Footer | Column stagger, social icon pop-in, link nudge on hover |

---

## 📄 License

MIT — free to use for personal and commercial projects.

---

> Built with ❤️ for **Fit Food** — *Personalized Healthy Meals for Your Lifestyle*
