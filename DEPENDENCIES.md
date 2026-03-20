# Dependencies Inventory

**Generated:** 2026-03-20
**Purpose:** Current state of all frontend dependencies (post-cleanup)

---

## Summary

| Category | Count | Notes |
|----------|-------|-------|
| JS Libraries (Local) | 8 | All local, no CDN |
| CSS Libraries (Local) | 8 | All local, no CDN |
| External Widgets | 1 | CoinGecko only |
| Tracking Removed | 3 | GTM, Twitter, YQL |

**All dependencies are LOCAL** — no external CDN dependencies except CoinGecko widget.

---

## JavaScript Libraries

| Library | Version | Size | Status |
|---------|---------|------|--------|
| jQuery | v3.7.1 | ~88KB | ✅ Local |
| jQuery Migrate | v3.4.1 | ~14KB | ✅ Local (compatibility) |
| Bootstrap | v3.4.1 | ~23KB | ✅ Local |
| Slick Carousel | v1.9.0 | ~44KB | ✅ Local |
| GSAP | v3.14.2 | ~73KB | ✅ Local |
| jQuery Parallax | v1.1.3 | ~2KB | ✅ Local (Ian Lunn, archived) |
| WOW.js | v1.1.2 | ~8KB | ✅ Local |
| main.js | Custom | ~4KB | ✅ Cleaned (174 lines) |
| animDots.js | Custom | ~4KB | ✅ Local (GSAP animation) |
| breakingNews.js | Custom | ~4KB | ✅ Cleaned (185 lines, no tracking) |

### Location

All JS files in: `assets/js/` and `assets/js/vendor/` and `plugins/breakingnewsticker/`

---

## CSS Libraries

| Library | Version | Status |
|---------|---------|--------|
| Bootstrap | v3.4.1 | ✅ Local |
| Font Awesome | v7.0.1 | ✅ Local |
| Font Awesome v4-shims | v7.0.1 | ✅ Local |
| Slick | v1.9.0 | ✅ Local |
| animate.css | Unknown | ✅ Local (WOW.js) |
| main.css | Definity v1.6 | ✅ Local (VENDOR - DO NOT EDIT) |
| responsive.css | Definity v1.6 | ✅ Local (VENDOR - DO NOT EDIT) |
| blackcoin.css | Custom | ✅ Local (site-specific overrides) |

### Location

All CSS files in: `assets/styles/` and `assets/styles/fontawesome/`

---

## Font Files

| Font | Location | Purpose |
|------|----------|---------|
| Font Awesome webfonts | `assets/styles/webfonts/` | Icon fonts (woff2) |

---

## External Widgets

| Widget | Source | Tracking | Status |
|--------|--------|----------|--------|
| CoinGecko Ticker | `widgets.coingecko.com` | ⚠️ Yes | Kept per user request |

---

## Removed Tracking

| Item | Date | Reason |
|------|------|--------|
| Google Tag Manager (GTM) | 2026-03-20 | User request - privacy |
| Twitter/X Widget | 2026-03-20 | Rate limiting (429 errors), privacy |
| Yahoo YQL API (breakingNews.js) | 2026-03-20 | Dead API (shut down 2019) |

---

## HTML Load Order

### index.html

```html
<!-- CSS -->
<link rel="stylesheet" href="assets/styles/bootstrap.min.css">
<link rel="stylesheet" href="assets/styles/fontawesome/all.min.css">
<link rel="stylesheet" href="assets/styles/fontawesome/v4-shims.min.css">
<link rel="stylesheet" href="plugins/breakingnewsticker/css/breakingNews.css">
<link rel="stylesheet" href="assets/styles/slick.css">
<link rel="stylesheet" href="assets/styles/animate.css">
<link rel="stylesheet" href="assets/styles/main.css">
<link rel="stylesheet" href="assets/styles/responsive.css">
<link rel="stylesheet" href="assets/styles/blackcoin.css">

<!-- JS -->
<script src="assets/js/jquery-3.7.1.min.js"></script>
<script src="assets/js/jquery-migrate-3.4.1.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/jquery.parallax.js"></script>
<script src="assets/js/slick.min.js"></script>
<script src="assets/js/gsap.min.js"></script>
<script src="assets/js/animDots.js"></script>
<script src="assets/js/main.js"></script>
<script src="plugins/breakingnewsticker/js/breakingNews.js"></script>
<script src="assets/js/vendor/wow.min.js"></script>

<!-- External Widget -->
<script src="https://widgets.coingecko.com/gecko-coin-ticker-widget.js"></script>
```

### faq/index.html, team/index.html

Same load order with `../` prefix for assets.

### maintenance.html

Minimal subset: jQuery, Bootstrap, main.js only.

---

## main.js Functions

| Function | Lines | Requires | Status |
|----------|-------|----------|--------|
| `initNavbar()` | 35-90 | jQuery | ✅ Active |
| `initMobileHover()` | 159-172 | jQuery | ✅ Active |
| `initParallax()` | 99-108 | jQuery Parallax | ✅ Active |
| `initSliders()` | 116-152 | Slick | ✅ Active |

**Original:** 832 lines → **Cleaned:** 174 lines (79% reduction)

---

## Vendor Files (DO NOT EDIT)

These files are from commercial/external sources:

| File | Source | Notes |
|------|--------|-------|
| `main.css` | Definity v1.6 | Theme CSS |
| `responsive.css` | Definity v1.6 | Theme CSS |
| `bootstrap.min.*` | Bootstrap | Framework |
| `slick.min.*` | Slick | Carousel |
| `gsap.min.js` | GSAP | Animation |
| `fontawesome/*` | Font Awesome | Icons |

**Override CSS in:** `blackcoin.css`

---

## Archived Files

Located in `_archive/unused-assets/`:

| File | Reason |
|------|--------|
| `jQuery.js` | Duplicate (capital Q filename) |
| `jquery-2.2.4.backup.js` | Backup from jQuery upgrade |
| `core.min.js` | Unused jQuery UI bundle |
| `position.min.js` | Unused jQuery UI bundle |
| 55 image files | Unused legacy images |
| 6 CSS files | Unused vendor CSS |
| 1 JS file | Unused isotope.min.js |

---

## Dependency History

| Date | Change |
|------|--------|
| 2026-03-18 | Upgraded jQuery v2.2.4 → v3.7.1 + Migrate |
| 2026-03-18 | Updated Slick v1.8.x → v1.9.0 |
| 2026-03-18 | Updated Font Awesome v6.5.1 → v7.0.1 |
| 2026-03-19 | Downloaded GSAP v3.14.2 locally (was CDN) |
| 2026-03-19 | Downloaded Font Awesome locally (was CDN) |
| 2026-03-19 | Downloaded WOW.js locally (was CDN) |
| 2026-03-20 | Removed Google Tag Manager |
| 2026-03-20 | Removed Twitter/X widget |
| 2026-03-20 | Cleaned breakingNews.js (removed YQL tracking) |
| 2026-03-20 | Archived unused jQuery/jQuery UI files |

---

## Security Status

### Bootstrap 3.4.1 (EOL July 2019)

**Status:** End of Life — no official security patches since July 24, 2019

#### CVEs Affecting Bootstrap 3.4.1

| CVE | Severity | Component | Status |
|-----|----------|-----------|--------|
| CVE-2025-1647 | Medium (5.4) | Tooltip/Popover XSS | ❌ Unpatched |
| CVE-2024-6485 | Medium (6.4) | Button data-loading-text XSS | ❌ Unpatched |
| CVE-2019-8331 | Medium (6.1) | Tooltip data-template XSS | ✅ Fixed in 3.4.1 |
| CVE-2018-14040 | Medium | Collapse data-parent XSS | ✅ Fixed in 3.4.0 |
| CVE-2018-14042 | Medium | Tooltip data-container XSS | ✅ Fixed in 3.4.0 |
| CVE-2016-10735 | Medium | data-target XSS | ✅ Fixed in 3.4.0 |

#### Components Used on This Site

| Component | Used | CVE Status |
|-----------|------|------------|
| `data-toggle="collapse"` | ✅ Yes | CVE-2018-14040 FIXED in 3.4.0 |
| `data-toggle="dropdown"` | ✅ Yes | No known CVE |
| `data-spy="scroll"` | ✅ Yes | No known CVE |
| `data-toggle="tooltip"` | ❌ No | N/A |
| `data-toggle="popover"` | ❌ No | N/A |
| `data-toggle="carousel"` | ❌ No | N/A |
| Button `data-loading-text` | ❌ No | N/A |

#### Risk Assessment: **LOW**

- Static site, no user input, vulnerable components NOT used
- Unpatched CVEs require tooltip/popover/button-loading — none used on site
- HeroDevs NES commercial support available (~$500-2000/year) if compliance required

---

### jQuery 3.7.1

**Status:** Current and secure

| CVE | Severity | Status |
|-----|----------|--------|
| CVE-2020-11022 | Medium (6.9) | ✅ Fixed in 3.5.0+ |
| CVE-2020-11023 | Medium (4.3) | ✅ Fixed in 3.5.0+ |
| CVE-2019-5428 | Medium (5.3) | ✅ Fixed in 3.4.0+ |
| CVE-2015-9251 | Medium (6.1) | ✅ Fixed in 3.4.0+ |

jQuery 4.0.0 released January 2026. Migration optional but not urgent.

---

### Slick Carousel 1.9.0

**Status:** Unofficial version, project abandoned

#### Version Warning

⚠️ **Version 1.9.0 is NOT an official release.** 

- Official versions: 1.8.0 (stable), 1.8.1 (latest, Sep 2017)
- 1.9.0 appears only on cdnjs, not from maintainers
- May be unofficial fork or cdnjs-specific build

#### Project Status

| Metric | Value |
|--------|-------|
| Last Release | 1.8.1 (September 2017) |
| Open Issues | 1,169 (unaddressed) |
| Maintenance | **ABANDONED** (8 years inactive) |

#### CVEs

**No known CVEs** for slick.js core library.

Related CVEs exist for WordPress/slick themes — NOT applicable.

#### Usage on This Site

- `.clients-slider` carousel only
- No user input, static content
- No known XSS vectors

#### Risk Assessment: **LOW**

- No CVEs despite 8-year abandonement
- Static site, no dynamic content
- Performance concerns (scroll blocking) are greater risk than security

#### Recommendation

Stay on current version. Consider migration to Swiper (actively maintained) for future.

---

### GSAP 3.14.2

**Status:** Current and actively maintained

#### CVEs

| CVE | Severity | Status |
|-----|----------|--------|
| CVE-2020-28478 | Medium (5.3) | ✅ Fixed in 3.6.0+ |

#### Project Status

| Metric | Value |
|--------|-------|
| Latest Version | 3.12.5 (actively developed) |
| Maintenance | **ACTIVE** (continuous updates) |
| License | Proprietary (free for most uses) |

#### Usage on This Site

- `animDots.js` background animation
- GreenSock license covers static website usage

#### Risk Assessment: **NEGLIGIBLE**

- CVE-2020-28478 (prototype pollution) patched in versions > 3.6.0
- Site uses 3.14.2 — well beyond affected version
- Actively maintained by GreenSock

---

### WOW.js 1.1.2

**Status:** Abandoned

#### Project Status

| Metric | Value |
|--------|-------|
| Last Commit | March 2019 |
| Last Release | 1.1.2 (May 2016) |
| Open Issues | 169 (unaddressed) |
| Maintenance | **ABANDONED** (7+ years) |

#### CVEs

**No direct CVEs** for WOW.js library.

WordPress plugin "WOW Portfolio" has unrelated CVEs.

#### Usage on This Site

- Scroll reveal animations: `wow fadeInLeft`, `wow fadeInRight`, `wow fadeInUp`, `wow fadeIn`
- Requires animate.css (bundled)
- No user input, static content

#### Risk Assessment: **LOW**

- No known security vulnerabilities
- Abandonment risk: may break with future jQuery updates
- Performance risk: uses deprecated scroll detection pattern

#### Alternatives

- AOS.js (Animate On Scroll) — actively maintained
- Trig.js — lightweight alternative
- CSS scroll-driven animations (no JS, modern browsers)

---

### Font Awesome 7.0.1

**Status:** Current (self-hosted)

#### Project Status

| Metric | Value |
|--------|-------|
| Latest Version | 7.2.0 (February 2026) |
| Maintenance | **ACTIVE** |

#### CVEs

**No direct CVEs** for Font Awesome core library.

WordPress plugin "Font Awesome" has unrelated CVEs — NOT applicable.

#### Security Benefits of Self-Hosting

- ✅ No external CDN tracking
- ✅ No SRI hash needed (local file)
- ✅ No version leakage via CDN URLs
- ✅ Offline capability

#### Risk Assessment: **NEGLIGIBLE**

- Core library has no vulnerabilities
- Self-hosted eliminates CDN risks
- Icon fonts have minimal attack surface

---

### jQuery Parallax 1.1.3

**Status:** Archived (Ian Lunn jQuery-Parallax)

#### Source

**IanLunn/jQuery-Parallax** — Version 1.1.3 (May 2016)

| Metric | Value |
|--------|-------|
| Repository | https://github.com/IanLunn/jQuery-Parallax |
| Stars | 1,513 |
| Status | 🔒 **ARCHIVED** (July 27, 2020) |
| Last Commit | 2016 |
| Explicit Warning | "NO LONGER MAINTAINED" |

#### CVEs

**No known CVEs** for jquery.parallax.js core library.

WordPress parallax plugins have unrelated CVEs (CVE-2025-58830, CVE-2024-9898, CVE-2024-11224).

#### Code Security Analysis

| Pattern | Status |
|---------|--------|
| `innerHTML` usage | ❌ Not present |
| `document.write()` | ❌ Not present |
| `eval()` | ❌ Not present |
| `.bind()` usage | ⚠️ Deprecated (use `.on()` instead) |
| `.css()` | ✅ Safe (jQuery sanitizes) |

Code uses: `.bind('scroll')` (deprecated), `.css('backgroundPosition')` (safe)

#### Usage on This Site

- `initParallax()` in main.js line 99
- Scroll-based parallax for `.testimonials-parallax`
- No user input processing

#### Risk Assessment: **LOW**

- No direct XSS vectors in plugin code
- Archived (no future updates possible)
- Uses deprecated `.bind()` — should migrate to `.on()`
- jQuery 3.7.1 provides protection

#### Recommendation

Functional and safe. Consider CSS-only parallax for future (zero dependencies, GPU-accelerated).

---

## Security Summary

| Dependency | CVEs | Maintenance | Risk |
|------------|------|-------------|------|
| Bootstrap 3.4.1 | 2 unpatched (NOT used) | EOL | LOW ✅ |
| jQuery 3.7.1 | None | Active | NEGLIGIBLE ✅ |
| Slick 1.9.0 | None | Abandoned | LOW ✅ |
| GSAP 3.14.2 | None (patched) | Active | NEGLIGIBLE ✅ |
| WOW.js 1.1.2 | None | Abandoned | LOW ✅ |
| Font Awesome 7.0.1 | None | Active | NEGLIGIBLE ✅ |
| jQuery Parallax 1.1.3 | None | Archived | LOW ✅ |

**Overall Security Status: GOOD** — No active vulnerabilities. All abandoned dependencies have no known CVEs.

---

## Recommendations

1. **Bootstrap 3:** Stay on v3.4.1/v3.3.7 - migration effort disproportionate to benefit
2. **WOW.js:** Keep - no security issues, works fine
3. **jQuery Parallax:** Keep - no security issues, only ~2KB
4. **CoinGecko widget:** Consider replacing with static price display if privacy is priority