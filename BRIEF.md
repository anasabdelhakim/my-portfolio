# Full-Stack Portfolio — Creative Direction Document v1.0

Stack: Next.js 15 App Router · Tailwind CSS v4 · Framer Motion 11 · Shadcn UI · Aceternity UI

---

## 01 · Visual Identity System

### Design Verdict
The aesthetic is "Precision Dark" — a near-black surface system that reads like 
engineering tooling. Signature element: a razor-thin violet grid in the hero that 
parallax-scrolls at 0.4× page speed. Single high-saturation accent used exactly 
twice per screen.

### Color Tokens
--bg-base:      #09090B
--bg-surface:   #111113
--bg-elevated:  #1C1C1F
--border-sub:   #2A2A2E
--accent:       #7C3AED
--accent-hi:    #A78BFA
--text-pri:     #FAFAFA
--text-sec:     #71717A
--text-dim:     #3F3F46

Rule: --accent never appears on more than 15% of any viewport.
Define all tokens in globals.css as CSS custom properties via @theme blocks.

---

## 02 · Typography Architecture

### Type Pairing
--font-display:  Geist · 300 weight · -4% tracking · section headings
--font-hero:     Geist · 500 weight · -2% tracking · hero h1
--font-body:     Geist Mono · 400 · +1% tracking · all prose
--font-label:    Geist · 500 · ALL CAPS · +10% tracking · metadata
--font-code:     JetBrains Mono · tech stack tags, metrics

Load via next/font/google with display: 'swap' and preload: true.

### Type Scale
--text-hero:  clamp(64px, 10vw, 120px)   — 1 use: hero h1
--text-xl:    clamp(40px, 5vw, 64px)     — section headings
--text-lg:    clamp(24px, 3vw, 36px)     — card titles
--text-base:  16px                        — body copy
--text-sm:    14px                        — secondary body
--text-xs:    12px                        — labels, captions
--text-xxs:   11px                        — all-caps metadata

---

## 03 · Layout Philosophy

### The Grid Contract
Named-area CSS grid defined per-section. No element ever starts at 
the horizontal center.

### Hero Layout (Asymmetric Split)
- Left 55%: kinetic typographic reveal — name + role
- Right 45%: Aceternity BackgroundBeams + floating terminal card
- Nav: fixed · blurred bg · 80px high · wordmark left · 3 links right
- Bottom edge: horizontal tech stack marquee

### Philosophy Layout (Off-axis)
- Full-width manifesto in display type — left-aligned — max 2 lines
- Three principle cards stacked in right column (30% offset)

### Projects Layout (Bento Mosaic)
- Featured project: full width · large thumbnail · 3 metrics
- Remaining: mosaic grid — half / half / quarter / three-quarter
- Each card: Aceternity CardSpotlight (cursor radial glow on hover)

---

## 04 · Page-by-Page Structure

### / · Hero + Identity
- app/page.tsx
- Split-screen asymmetric layout
- Left: character-stagger h1 animation (Framer Motion spring)
- Right: Aceternity BackgroundBeams + floating terminal status card
  (timezone, open-to-work state, last-deploy from GitHub API)
- Bottom: InfiniteMovingCards tech stack marquee
- Components: BackgroundBeams, InfiniteMovingCards

### #philosophy · Engineering Philosophy
- components/PhilosophySection.tsx
- Full-width manifesto — clip-path scroll reveal
- Three numbered principle cards (Shadcn Card dark variant)
- Each card hover reveals a code snippet illustrating the principle
- Layout: manifesto 70% width left, principles grid 30% offset right

### #projects · Project Deep-Dives
- components/ProjectsSection.tsx
- app/projects/[slug]/page.tsx
- Bento grid 4-6 projects
- Featured: full width + Aceternity NumberTicker metrics
- Cards: Aceternity CardSpotlight
- Deep-dive: two-column — problem/solution left, architecture right
- generateStaticParams for all slugs

### #arsenal · Technical Arsenal
- components/ArsenalSection.tsx
- Aceternity InfiniteMovingCards — auto-scrolling tech row
- Filterable grid by domain: Frontend / Backend / Infrastructure / Tooling
- Shadcn Tabs with Framer Motion sliding indicator
- Each tool: SVG icon + proficiency bar + "used to build X" context
- No star ratings. No circular progress bars.

### #writing · Selected Writing (optional)
- components/WritingSection.tsx
- Narrow editorial column of 3-5 articles
- Date (monospaced) + title (display type) + reading time
- Hover: smooth height expand + excerpt reveal
- Aceternity TextRevealCard for section heading

### #contact · Contact + Availability
- components/ContactSection.tsx
- Aceternity FlipWords cycling: "Build something." / "Lead a team." / 
  "Architect a system."
- Animated availability badge: green dot + status text (Framer pulse)
- Two action cards: Email (copy to clipboard + Shadcn Toast) + 
  Schedule (Cal.com link)
- Minimal social row below

---

## 05 · Animation Strategy

Rules:
1. transform/opacity only — never animate layout properties
2. All scroll triggers via Framer Motion useInView (not IntersectionObserver)
3. Every animation respects prefers-reduced-motion via useReducedMotion()

### 01 · Hero Character Stagger
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.3 }
  }
}
const char = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
}
— Fire on mount, not scroll.

### 02 · Scroll-Triggered Section Reveal
export const revealVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}
const ref = useRef(null)
const inView = useInView(ref, { once: true, margin: "-100px" })
— Use once: true so reveals don't repeat on scroll-back.

### 03 · Bento Grid Stagger
const bentoContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
const bentoItem = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 260, damping: 25 }
  }
}

### 04 · Parallax Hero Grid
const { scrollY } = useScroll()
const gridY = useTransform(scrollY, [0, 800], [0, -320])
const gridOpacity = useTransform(scrollY, [0, 600], [1, 0])
— Background grid scrolls at 0.4× speed, fades out on scroll.

### 05 · Page Transition
initial={{ opacity: 0, y: 8 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -8 }}
transition={{ duration: 0.25, ease: "easeInOut" }}
— 250ms max. Wrap main content only, not nav.

### 06 · Cursor Magnetic Effect
export function useMagnetic(strength = 0.4) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })
  — Apply to primary CTA and nav links only.
}

---

## 06 · Component Mapping

Hero background depth       → Aceternity · BackgroundBeams / GridPattern
Metrics counter animation   → Aceternity · NumberTicker
Project card hover glow     → Aceternity · CardSpotlight
Tech stack marquee          → Aceternity · InfiniteMovingCards
Contact CTA heading         → Aceternity · FlipWords
Section reveal text         → Aceternity · TextRevealCard
Arsenal filter tabs         → Shadcn · Tabs + custom dark variant
Copy email feedback         → Shadcn · Toast (Sonner variant)
Philosophy cards            → Shadcn · Card + CardContent
Project case study sidebar  → Shadcn · Separator + Badge
All motion + physics        → Framer · motion.*, useScroll, 
                               useTransform, useSpring

---

## 07 · Performance Architecture

- Server-First RSC Split: only Aceternity + motion components are 
  'use client'. All text/layout shells are RSC.
- Dynamic Import: wrap heavy Aceternity components in next/dynamic 
  with ssr:false. BackgroundBeams must not block hero paint.
- Images: all project thumbnails via next/image with sizes prop 
  tuned to bento grid breakpoints. priority only on hero image.
- CSS Containment: contain: layout style paint on each section.
- will-change: only during active animation. Let Framer manage it.
- Tailwind v4: define motion variants as CSS custom properties in 
  @theme. Avoid @apply in hot paths.

Targets: LCP < 1.2s · CLS = 0 · INP < 100ms
Run Lighthouse CI in GitHub Actions on every PR.

---

## 08 · Implementation Roadmap

### Phase 1 · Foundation (Days 1-3) ✓ COMPLETE
- Geist + JetBrains Mono via next/font
- Full token system in globals.css (@theme block)
- useReveal(), useMagnetic(), useReducedMotion() hooks
- PageTransition wrapper in app/layout.tsx
- Dark-mode-first Tailwind config

### Phase 2 · Hero + Nav (Days 4-6)
- Asymmetric hero with CSS grid-template-areas
- Character-stagger animation on h1
- Aceternity BackgroundBeams (dynamic import, ssr:false)
- Parallax scroll transform on grid overlay
- Floating terminal-style status card
- Tech stack marquee (InfiniteMovingCards)

### Phase 3 · Core Sections (Days 7-12)
- PhilosophySection — manifesto + 3-card layout
- ProjectsSection — bento grid + CardSpotlight
- ArsenalSection — InfiniteMovingCards + filtered grid
- ContactSection — FlipWords + availability badge
- All scroll-triggered reveals via useReveal hook

### Phase 4 · Deep Dives + Polish (Days 13-16)
- /projects/[slug] — two-column case study layout
- generateStaticParams for all project slugs
- WritingSection
- Magnetic effect on nav links + primary CTAs
- Lighthouse CI baseline
- OG image generation via next/og for all routes

---

## Key Design Principle

The portfolio needs one moment that stops someone mid-scroll. 
That moment is the hero character stagger + parallax grid. 
Build the hero to 100% spec before touching any other section.