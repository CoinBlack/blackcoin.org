# Dependencies Inventory

**Generated:** 2026-03-18
**Last Updated:** 2026-03-19
**Purpose**: Audit of all frontend dependencies (POST-CLEANUP)

---

## Currently Loaded Libraries

### JavaScript (Local Files)

| File | Version | Size | Status |
|------|---------|------|--------|
| `assets/js/jquery-3.7.1.min.js` | v3.7.1 | ~88KB | ✅ Updated (was v2.2.4) |
| `assets/js/jquery-migrate-3.4.1.min.js` | v3.4.1 | ~14KB | ✅ Added for compatibility |
| `assets/js/bootstrap.min.js` | v3.3.7 | ~23KB | ✅ Matches CSS (fixed from v4.4.1) |
| `assets/js/slick.min.js` | v1.9.0 | ~44KB | ✅ Updated (was v1.8.x) |
| `assets/js/jquery.parallax.js` | Unknown | ~5KB | ✅ Used |
| `assets/js/animDots.js` | Custom | ~4KB | ✅ Used (GSAP animation) |
| `assets/js/main.js` | Custom | ~4KB | ✅ Cleaned (was 832 → 153 lines) |

### JavaScript (CDN)

| Library | Version | CDN | Status |
|---------|---------|-----|--------|
| GSAP | v3.12.5 | cdnjs | ✅ Current (3.14.2 not on cdnjs) |
| WOW.js | v1.1.2 | cdnjs | ⚠️ Unmaintained (2015) |

### External Widgets

| Widget | Source | Status |
|--------|--------|--------|
| CoinGecko Ticker | widgets.coingecko.com | ✅ Active |
| Breaking News Ticker | `plugins/breakingnewsticker/` | ✅ Active |

### CSS (Local Files)

| File | Version | Status |
|------|---------|--------|
| `assets/styles/bootstrap.min.css` | v3.3.5 | ✅ Matches JS (v3.3.7) |
| `assets/styles/main.css` | Custom | ✅ Active |
| `assets/styles/responsive.css` | Custom | ✅ Active |
| `assets/styles/blackcoin.css` | Custom | ✅ Active (site-specific) |
| `assets/styles/slick.css` | v1.9.0 | ✅ Active (updated) |
| `assets/styles/animate.css` | Unknown | ✅ Active (WOW.js) |

### CSS (CDN)

| Library | Version | Status |
|---------|---------|--------|
| Font Awesome | v7.2.0 | ✅ Updated (was v6.5.1) |
| Font Awesome v4-shims | v7.2.0 | ✅ Compatibility shim (was v6.5.1) |

---

## HTML File Load Order

### index.html (Load Order)

```html
<!-- CSS -->
<link rel="stylesheet" href="assets/styles/bootstrap.min.css">
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.2.0/css/all.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.2.0/css/v4-shims.min.css">
<link rel="stylesheet" href="plugins/breakingnewsticker/css/breakingNews.css">
<link rel="stylesheet" href="assets/styles/main.css">
<link rel="stylesheet" href="assets/styles/responsive.css">
<link rel="stylesheet" href="assets/styles/blackcoin.css">

<!-- JS -->
<script src="assets/js/jquery-3.7.1.min.js"></script>
<script src="assets/js/jquery-migrate-3.4.1.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/jquery.parallax.js"></script>
<script src="assets/js/slick.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="assets/js/animDots.js"></script>
<script src="assets/js/main.js"></script>
<script src="plugins/breakingnewsticker/js/breakingNews.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
```

### faq/index.html, team/index.html (Same order with `../` prefix)

### maintenance.html (Subset - no parallax, no slick, no plugins)

---

## main.js Function → Library Mapping

### ACTIVELY USED Functions (Post-Cleanup)

| Function | Lines | Requires | HTML Trigger |
|----------|-------|----------|--------------|
| `initNavbar()` | 33-103 | jQuery | Always (nav element) |
| `initParallax()` | 112-121 | jQuery Parallax | `.testimonials-parallax` |
| `initSliders()` | 129-165 | Slick | `.clients-slider` |
| AnimDots | external | GSAP | Background animation |

**Note:** Dead code removed (original: 832 lines → cleaned: 153 lines, 82% reduction)

### REMOVED Functions (Dead Code - Deleted)

The following functions were REMOVED from main.js as they referenced libraries not loaded and had no HTML elements:

- `initCountCirc()`, `initCountCircMin()` - easyPieChart (not loaded)
- `initCountNbr()`, `initCountMin()` - CountUp/Waypoints (not loaded)
- 8 Slick slider configs (ft-slider, t-slider, etc.) - No HTML elements
- `initPortfolio()`, `initBlogMasonry()` - Isotope (not loaded)
- `initGallery()` - Magnific Popup (not loaded)
- `initVideoBg()` - YTPlayer (not loaded)
- `initKenburns()` - Kenburns (not loaded)
- `initCountdown()` - No element
- `initRangeSlider()` - No element
- Contact form validation - No `.form-ajax` element in HTML

### Libraries NOT Loaded (Removed from main.js)

These libraries were never loaded in HTML and are now completely removed from main.js:

| Library | Status |
|---------|--------|
| Isotope | 🔴 Removed from code |
| Magnific Popup | 🔴 Removed from code |
| CountUp.js | 🔴 Removed from code |
| Waypoints | 🔴 Removed from code |
| easyPieChart | 🔴 Removed from code |
| YTPlayer | 🔴 Removed from code |
| Kenburns | 🔴 Removed from code |

---

## Slick Carousel (Post-Cleanup)

Only ONE configuration remains (down from 9):

| Config | Lines | Element | Status |
|--------|-------|---------|--------|
| `.clients-slider` | 133-163 | Clients logo slider | ✅ **USED** |

---

## CSS Class Usage in HTML

### index.html Active Classes

```html
<!-- Parallax -->
<div class="testimonials-parallax">        <!-- USED -->

<!-- WOW.js Animations -->
class="wow fadeInLeft"                      <!-- USED (5 instances) -->
class="wow fadeInRight"                     <!-- USED -->
class="wow fadeInUp"                        <!-- USED -->
class="wow fadeIn"                          <!-- USED -->

<!-- Slick Carousel -->
<ul class="t-clients clients-slider">       <!-- USED -->

<!-- GSAP Animation -->
<div id="particles-js">                     <!-- animDots.js target -->
```

### Classes NOT Found in HTML

```html
<!-- NOT FOUND: Isotope/Portfolio -->
#pfolio, .pfolio-items, .portfolio-item, .p-item

<!-- NOT FOUND: Magnific Popup -->
.open-gallery, .gallery-widget-lightbox

<!-- NOT FOUND: Counters -->
#counters, #counters-min, #skillsCircles, #skillsCirclesMin

<!-- NOT FOUND: Video Backgrounds -->
.player, #fs-video-one-bg, #fw-video-one-bg, #section-video

<!-- NOT FOUND: Kenburns -->
.kenburn-hero, .kenburns

<!-- NOT FOUND: Other Slick sliders -->
.ft-slider, .t-slider, .single-img-slider, .centered-gallery,
.fs-slider, .fw-slider, .text-slider, .shop-p-slider

<!-- NOT FOUND: Countdown -->
#cs-timer

<!-- NOT FOUND: Range Slider -->
#shop-slider-range
```

---

## Version Mismatches

| Library | CSS Version | JS Version | Status |
|---------|-------------|------------|--------|
| Bootstrap | v3.4.1 | v3.3.7 | ✅ **FIXED** (matched versions) |

### Previous Issue (Resolved)

Bootstrap CSS v3.3.5 was mismatched with JS v4.4.1. Both now use v3.x series.

---

---

## CSS Class Usage in HTML

| Library | Function | Reason |
|---------|----------|--------|
| jQuery | Core | Required by Bootstrap, Slick, Parallax, main.js |
| Bootstrap | UI Components | Nav, grid, responsive |
| Slick | `.clients-slider` | Used in index.html |
| jQuery Parallax | Background parallax | Used in testimonials section |
| GSAP | animDots.js | Background dot animation |
| WOW.js | Scroll animations | 5 `wow` classes in HTML |
| Breaking News Ticker | News ticker | Used in index.html |
| Font Awesome | Icons | Used throughout |

---

## Recommended CDN Updates

| Library | Current | Latest | CDN URL Change |
|---------|---------|--------|----------------|
| Font Awesome | 7.2.0 | **7.2.0** | ✅ Current |
| GSAP | 3.12.5 | **3.14.2** | Update version in URL |
| Slick | 1.9.0 | **1.9.0** | ✅ Current |

**Note**: Font Awesome 7.x may have class prefix changes. Test all icons.

---

## Implementation Status

### Completed ✅

- [x] Remove dead code from main.js (832 → 153 lines, 82% reduction)
- [x] Remove contact form JavaScript (no `.form-ajax` in HTML)
- [x] Consolidate Slick to single config (.clients-slider only)
- [x] Verify functions match HTML elements
- [x] Fix initParallax() call (was missing from window.load)
- [x] Update DEPENDENCIES.md to reflect post-cleanup state
- [x] Fix Bootstrap CSS/JS version mismatch (v3.4.1 / v3.3.7)
- [x] Update Font Awesome CDN to v7.0.1
- [x] Update Slick Carousel to v1.9.0
- [x] Update Font Awesome CDN to v7.2.0
- [x] Upgrade jQuery from v2.2.4 to v3.7.1 + jQuery Migrate v3.4.1

### NOT Done (Vendor Files)

- [ ] ~~Remove contact form CSS (main.css, responsive.css)~~ — **REVERTED**
  - These are **Definity theme vendor files** — DO NOT EDIT
  - Only custom code in `main.js` should be modified
  - CSS overrides should go in `blackcoin.css`

### Deferred (Requires Testing)

- [ ] Update GSAP CDN to v3.14.2

---

## Files Modified

| File | Before | After | Change |
|------|--------|-------|--------|
| `assets/js/main.js` | 832 lines | 153 lines | -679 lines (82% reduction) |
| `assets/styles/main.css` | — | — | **NOT MODIFIED** (vendor file) |
| `assets/styles/responsive.css` | — | — | **NOT MODIFIED** (vendor file) |
| `DEPENDENCIES.md` | Created | Updated | Post-cleanup documentation |

---

## Line Number Reference (Post-Cleanup)

### main.js Structure (153 lines)

| Lines | Content |
|-------|---------|
| 1-13 | IIFE wrapper, document.ready |
| 14-26 | window.load (initParallax, initSliders) |
| 27-105 | `initNavbar()` function |
| 106-121 | `initParallax()` function |
| 122-165 | `initSliders()` function (.clients-slider only) |
| 166-169 | IIFE close |

**No dead code remaining.**