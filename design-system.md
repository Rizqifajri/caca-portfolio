# Design System — Calu / Cantika Fitriani Portfolio (2026)

Dokumentasi identitas visual, token warna, tipografi, grid system, dan komponen interaksi yang digunakan di seluruh portfolio.

---

## 1. Brand Essence & Theme
- **Vibe**: Creative Editorial, Scrapbook Minimalist, tactile, warmth, playful yet high-fashion aesthetic.
- **Audience**: Creative agencies, brand collaborators, visual directors looking for professional video editing & storytelling.

---

## 2. Color Palette (Tokens)

### Primary Colors
- **Maroon / Crimson Red**: `#a82525` (Utama), `#851b1b` (Deep Maroon), `#5e1010` (Dark Maroon / Black Hole Base), `#C80000` (`--color-crimson-red`).
  - *Usage*: Judul signature cursive, badge aktif, aksen penting, background intro black hole.
- **Forest Green**: `#014421` (`--color-forest-green`), `#005a00` (Hover), `#008000` (Accent green).
  - *Usage*: Body text sekunder, sub-headings, nav items, divider garis aksen.
- **Ivory Mist**: `#FAF9F6` (`--color-ivory-mist`, `--background`).
  - *Usage*: Background kanvas utama seluruh halaman.

### Supporting / Pastel & Neutral Tones
- **Warm Blush / Soft Rose**: `#EFD3E1`, `#FFF0F4` (Card backgrounds)
- **Soft Butter Yellow**: `#fce5b6`, `#facc15` (Yellow button, sunflower)
- **Charcoal / Neutral Dark**: `#222222`, `#333333`, `#111111`
- **Muted Gray**: `#71717a`, `#9ca3af`, `#e5e5e5`

---

## 3. Typography

| Role | Font Family | Weight / Style | Tailwind Utility | Example Usage |
|------|-------------|----------------|------------------|---------------|
| **Signature / Display** | `IvyPresto Display` (`--font-ivypresto`) | SemiBold Italic | `font-cursive italic` | "Cantika Fitriani", "Projectsº", "Galleryº" |
| **Primary Sans** | `Poppins` (`--font-poppins`) | 400, 500, 600, 700 | `font-sans` | Body text, section titles, filter buttons |
| **Technical / Monospace** | Monospace (`font-mono`) | 400 | `font-mono` | Counter persentase, metadata stamp, "2026" |

---

## 4. UI Components & Patterns

1. **Floating Bottom-Right Pill Navigation**:
   - Background pill putih/ivory semi-transparan dengan border lembut & blur.
   - Indeks angka merah maroon (`01`, `02`, `03`, `04`) + label (`Home`, `Project`, `Gallery`, `Contact`).
2. **Editorial Scrapbook Items**:
   - Elemen taktil interaktif (Draggable GSAP): Yellow button, Red star, Teratai, Cookies, Camera, Tomato, Sunflower, Film strip, Alphabet pins (`C-A-L-U`).
3. **Capture Viewfinder Marks**:
   - Sudut bidik kamera siku L pada container (`border-t-2 border-l-2 border-[#a82525]/50`).
4. **Transition & Intro**:
   - **Black Hole Gravitational Warp Transition**:
     - Background dominan: Deep Maroon (`#5e1010` ke `#2a0606`).
     - Lensa gravitasi: Radial distortion / circular portal vortex (`clip-path: circle(...)`) yang menarik elemen ke tengah lalu meledak/expand halus membuka Hero Section.
     - Loading counter: 0% → 100% dengan progress ring / line aksen ivory & maroon.
