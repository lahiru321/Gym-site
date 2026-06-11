# SIMHA — Strength Club 🦁

A unique, Sri Lankan gym landing site (frontend showcase only) built with **HTML + CSS + GSAP**.
Brand concept: *Simha* = "lion" (Sri Lankan flag), based in Colombo, prices in LKR.

## Run it
No build step. Just open `index.html` in a browser, or serve it:

```powershell
# Option A — double click index.html

# Option B — local server (better for fonts/scroll)
python -m http.server 5500
# then visit http://localhost:5500
```

## Stack
- Pure HTML/CSS — no framework, no bundler
- [GSAP 3.12](https://gsap.com/) + ScrollTrigger (loaded via CDN) for animations
- Google Fonts: Anton, Bebas Neue, Sora

## Color palette (strict — only these are used)
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0C0C0E` | background |
| `--charcoal` | `#16161B` | cards / surfaces |
| `--slate` | `#20202A` | borders |
| `--maroon` | `#7A1D2B` | deep accent (SL flag maroon) |
| `--crimson` | `#C8102E` | energy highlight |
| `--gold` | `#E8B23A` | primary accent (lion gold) |
| `--gold-soft` | `#F5D27A` | gradients / glow |
| `--cream` | `#F4F1E9` | text |
| `--muted` | `#9A958A` | secondary text |

## Sections
Preloader · Nav · Hero · Marquee · Stats (animated counters) · About · Programs ·
Quote/parallax · Coaches · Membership (Cub / Lion / Apex) · Schedule · CTA · Footer/Contact.

## Notes
- Photos hotlink from Unsplash. With no internet they degrade gracefully to dark/gradient backgrounds — swap the `url(...)` values in `css/style.css` for local images in an `/img` folder for a fully offline build.
- Custom cursor + reduced-motion fallbacks included.
