# Dependency Upgrade Plan

**Generated:** 2026-03-19
**Purpose:** Risk-assessed upgrade recommendations for all third-party libraries
**Status:** In Progress - jQuery upgraded, testing required

---

## Executive Summary

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Security | 0 | 1 | 1 | 0 |
| Maintainability | 0 | 1 | 2 | 0 |
| **Total** | **0** | **2** | **3** | **0** |

**Completed Upgrades:** jQuery v3.7.1, Font Awesome v7.2.0, Slick v1.9.0

**Remaining:** Bootstrap 3 (deferred), WOW.js (deferred), GSAP (deferred)

---

## Current Dependency Inventory

### JavaScript Libraries (Local)

| Library | Current | Latest | EOL | Security | Risk |
|---------|---------|--------|-----|----------|------|
| jQuery | v3.7.1 | v3.7.1 | ✅ No | ✅ Fixed | **LOW** |
| Bootstrap JS | v3.3.7 | v5.3.3 | ❌ Yes | ⚠️ Low | **MEDIUM** |
| Slick Carousel | v1.9.0 | v1.9.0 | ❌ Unmaintained | ✅ OK | **LOW** |
| jQuery Parallax | Unknown | N/A | ❌ Abandoned | ✅ OK | **MEDIUM** |
| GSAP | v3.12.5 | v3.12.5 | ✅ Active | ✅ OK | **LOW** |

### JavaScript Libraries (CDN)

| Library | Current | Latest | EOL | Security | Risk |
|---------|---------|--------|-----|----------|------|
| WOW.js | v1.1.2 | N/A | ❌ Abandoned 2015 | ✅ OK | **MEDIUM** |
| GSAP | v3.12.5 | v3.14.2 | ✅ Active | ✅ OK | **LOW** |

### CSS Libraries (Local)

| Library | Current | Latest | Notes |
|---------|---------|--------|-------|
| Bootstrap CSS | v3.4.1 | v5.3.3 | Must match JS version |
| Slick CSS | v1.8.x | v1.9.0 | Matches JS |
| animate.css | Unknown | v4.1.1 | Used by WOW.js |
| Definity Template | v1.6 | N/A | Commercial template |

### CSS Libraries (CDN)

| Library | Current | Latest | Security | Risk |
|---------|---------|--------|----------|------|
| Font Awesome | v7.0.1 | v7.2.0 | ✅ OK | **LOW** |

---

## Priority 1: jQuery (HIGH RISK)

### Current State
- **Version:** v2.2.4 (March 2016)
- **Status:** End of Life
- **Security:** CVE-2020-11022 (XSS via HTML parsing), CVE-2015-9251 (prototype pollution)

### Recommended Action

**Option A: Upgrade to jQuery v3.7.1 (Recommended)**
```html
<!-- Replace in all HTML files -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
```

**Option B: Use jQuery v3.7.1 slim build**
```html
<!-- Smaller build, excludes AJAX and effects -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.slim.min.js"></script>
```

### Risk Assessment

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Breaking changes | Medium | Test all pages, check jQuery migration guide |
| Plugin compatibility | Low | Bootstrap 3, Slick, Parallax compatible with v3.x |
| CDN availability | Low | Use local fallback |

### Migration Steps

1. **Test locally:** Replace jQuery v2.2.4 with v3.7.1
2. **Run jQuery Migrate (optional):** `jquery-migrate-3.4.1.min.js` to catch deprecated features
3. **Test functionality:**
   - ✅ Navbar dropdown (Bootstrap)
   - ✅ Slick carousel (`.clients-slider`)
   - ✅ Parallax background (`.testimonials-parallax`)
   - ✅ Breaking News ticker
   - ✅ AnimDots (GSAP)
4. **Verify no console errors**
5. **Test on multiple browsers** (Chrome, Firefox, Safari, Edge)

### Breaking Changes in jQuery 3.x

| Feature | Status | Impact |
|---------|--------|--------|
| `$.fn.size()` | Removed | None (not used) |
| `$.fn.bind()` | Deprecated | Low (check plugins) |
| `$.fn.delegate()` | Deprecated | Low (check plugins) |
| `$(html)` | Stricter | Low (check dynamic HTML) |

---

## Priority 2: Bootstrap (MEDIUM RISK)

### Current State
- **CSS Version:** v3.4.1
- **JS Version:** v3.3.7
- **Status:** End of Life (January 2019)
- **Security:** ✅ No critical vulnerabilities

### Recommended Action

**Option A: Stay on Bootstrap 3 (Low Risk)**
- Current setup works
- No immediate security concerns
- Bootstrap 3 still functional

**Option B: Upgrade to Bootstrap v5.3.3 (Medium Risk)**
```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

### Risk Assessment (If Upgrading)

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| CSS class renames | High | Many `.col-*` changes, navbar overhaul |
| JS API changes | High | `data-*` attributes different |
| IE support | Breaking | BS5 drops IE entirely |
| Layout breaks | High | Grid system changed |

### Migration Effort

| Task | Effort | Notes |
|------|--------|-------|
| Grid classes | 2-4 hours | `.col-xs-*` → `.col-*` |
| Navbar | 4-8 hours | Complete rewrite needed |
| Typography | 1-2 hours | Font sizes restructured |
| Utilities | 1-2 hours | Some renamed |
| **Total** | **8-16 hours** | Major refactor |

### Recommendation

**Stay on Bootstrap 3** — The site doesn't need BS5 features, and migration effort is disproportionate to benefit. Security risk is low.

---

## Priority 3: WOW.js (MEDIUM RISK)

### Current State
- **Version:** v1.1.2
- **Status:** Abandoned since 2015
- **Security:** ✅ No vulnerabilities (pure CSS animations)

### Recommended Action

**Option A: Continue using WOW.js (Low Risk)**
- Still works with animate.css
- No security issues
- CDN still available

**Option B: Replace with AOS (Animate on Scroll)**
```html
<!-- Modern alternative -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>AOS.init();</script>
```

**Option C: Pure CSS alternative**
```css
/* Replace WOW.js with intersection observer + CSS */
.fade-in { opacity: 0; transition: opacity 0.5s; }
.fade-in.visible { opacity: 1; }
```

### Migration Effort

| Option | Effort | Notes |
|--------|--------|-------|
| Keep WOW.js | 0 hours | No changes needed |
| Switch to AOS | 2-3 hours | Update 5-6 animating elements |
| Pure CSS | 4-6 hours | More custom work |

### Recommendation

**Keep WOW.js for now** — No urgent need to change. Consider AOS when doing a larger refresh.

---

## Priority 4: Slick Carousel (LOW RISK)

### Current State
- **Version:** v1.8.x
- **Status:** Unmaintained (v1.9.0 last release)
- **Security:** ✅ No vulnerabilities

### Recommended Action

**Option A: Update to v1.9.0**
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.9.0/slick/slick.min.css">
<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.9.0/slick/slick.min.js"></script>
```

**Option B: Switch to Swiper (Modern Alternative)**
```html
<!-- If more features needed -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### Recommendation

**Update to Slick v1.9.0** — Low risk, minimal changes. Only used for `.clients-slider`.

---

## Priority 5: jQuery Parallax (MEDIUM RISK)

### Current State
- **Version:** Unknown (no version header)
- **Status:** Abandoned
- **Security:** ✅ No vulnerabilities

### Recommended Action

**Option A: Keep as-is (Low Risk)**
- Works with jQuery 3.x
- Single use case (`.testimonials-parallax`)
- Only 5KB

**Option B: Replace with CSS alternative**
```css
/* Modern parallax with CSS */
.testimonials-parallax {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
```

### Recommendation

**Keep jQuery Parallax** — Small, functional, no security issues. Replace during next major redesign.

---

## Priority 6: Font Awesome (LOW RISK)

### Current State
- **Version:** v7.0.1
- **Latest:** v7.2.0
- **Status:** Active
- **Security:** ✅ No issues

### Recommended Action

**Update to v7.2.0:**
```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.2.0/css/all.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.2.0/css/v4-shims.min.css" rel="stylesheet">
```

### Risk Assessment

| Risk | Likelihood | Notes |
|------|------------|-------|
| Icon renames | Low | FA 7.x maintains compatibility |
| Deprecated icons | Low | Check all icons work |
| New icons | Benefit | Access to new icons |

### Recommendation

**Update to v7.2.0** — Low risk, minor version update.

---

## GSAP (LOW RISK)

### Current State
- **Version:** v3.12.5
- **Latest:** v3.14.2 (cdnjs has v3.12.5)
- **Status:** Active, commercial
- **Security:** ✅ No issues

### Recommendation

**Keep v3.12.5** — cdnjs doesn't have newer version. Only used for animDots.js background animation.

---

## Implementation Priority Order

| Phase | Library | Action | Risk | Effort | Schedule |
|-------|---------|--------|------|--------|----------|
| 1 | jQuery | Upgrade to v3.7.1 | High | 4-8 hrs | **DONE** |
| 2 | Font Awesome | Update to v7.2.0 | Low | 1 hr | **DONE** |
| 3 | Slick | Update to v1.9.0 | Low | 1-2 hrs | **DONE** |
| 4 | Bootstrap | Keep v3.4.1 | None | 0 hrs | Deferred |
| 5 | WOW.js | Keep v1.1.2 | Low | 0 hrs | Deferred |
| 6 | jQuery Parallax | Keep | Low | 0 hrs | Deferred |
| 7 | GSAP | Keep v3.12.5 | None | 0 hrs | N/A |

---

## Testing Checklist

### After jQuery Upgrade

- [ ] Navbar dropdowns work (mobile and desktop)
- [ ] Slick carousel animates
- [ ] Parallax backgrounds scroll correctly
- [ ] Breaking News ticker functions
- [ ] GSAP animDots animation runs
- [ ] WOW.js animations trigger on scroll
- [ ] No console errors
- [ ] IE11 test (if supporting) — jQuery 3.x supports IE9+

### After Font Awesome Update

- [ ] All icons display correctly
- [ ] No 404 errors for icon fonts
- [ ] Social icons render
- [ ] Exchanges/wallets icons render

### After Slick Update

- [ ] `.clients-slider` slides smoothly
- [ ] Autoplay functions
- [ ] Responsive breakpoints work
- [ ] No console errors

---

## Rollback Plan

Always maintain rollback capability:

```bash
# Create backup before changes
git checkout -b dependency-upgrade-backup

# If upgrade fails
git checkout master
```

### Local Testing Commands

```bash
# Start local server
python3 -m http.server 8000

# Test pages
# http://localhost:8000/
# http://localhost:8000/faq/
# http://localhost:8000/team/
```

---

## Notes

1. **CDN vs Local:** Current setup uses CDN for Font Awesome and GSAP. Consider local hosting if:
   - CDN availability is a concern
   - Faster load times needed
   - Offline support required

2. **Bootstrap 3 is fine:** Despite EOL status, Bootstrap 3 remains secure and functional. Migration to BS5 is optional.

3. **WOW.js alternatives exist:** When ready for a refresh, AOS or pure CSS are modern alternatives.

4. **Definity template CSS:** main.css and responsive.css are from a commercial template. Do not edit directly. Override in blackcoin.css.

---

## References

- [jQuery 3.x Upgrade Guide](https://jquery.com/upgrade-guide/3.0/)
- [Bootstrap 3 to 5 Migration](https://getbootstrap.com/docs/5.3/migration/)
- [Slick Carousel Documentation](https://kenwheeler.github.io/slick/)
- [AOS Animation Library](https://michalsnik.github.io/aos/)
- [Font Awesome Changelog](https://fontawesome.com/changelog)