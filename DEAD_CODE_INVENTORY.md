# Dead Code Inventory

**Generated:** 2026-03-19
**Purpose**: Comprehensive dead code analysis for blackcoin.org
**Updated:** 2026-03-19 - Cleanup completed

---

## Executive Summary

| Category | Items Found | Action Taken |
|----------|-------------|--------------|
| Unused Images | 55 files | Moved to `_archive/unused-assets/images/` |
| Unused CSS Selectors | 2 selectors | **REMOVED** from `blackcoin.css` |
| Duplicate jQuery | 1 file | Moved to `_archive/unused-assets/plugins/` |
| Duplicate Images | 2 files | Moved to archive |

---

## 1. Unused Images (Archived)

### Moved to `_archive/unused-assets/images/`:

#### Exchange/Wallet Logos (Legacy)
- `aex.png`, `aex_logo.png` - AEX exchange (defunct)
- `btc38.png`, `blk38.png` - BTC38 exchange (defunct)
- `bit-z.png` - Bit-Z exchange
- `bittrex.png` - Bittrex (no longer lists BLK)
- `coinegg.png`, `vinex.png`, `godex.png`, `shapeshift.png`
- `anycoindirect.png`, `anycoinnew.png`, `bitladon.png`, `bittylicious.png`
- `litebit.PNG`, `litebit.svg`

#### Wallet/Merchant Images (Legacy)
- `blackhalo.png`, `blacksight.png`, `blacksight2.png` (blackhalo2.png IS used)
- `payblk.png`, `payblk2.png`
- `openbazaar.jpg`, `overstock.jpg`, `sheldonstore.jpg`, `fudmart.jpg`
- `toys4sex.jpg`, `cjs-cdkeys.jpg`, `torguard.jpg`, `redcedar.jpg`

#### App Store/OS Icons
- `app-store.png`, `google-play.png`
- `winicon.png`, `macicon.png`, `linuxicon.png`
- `fedoraicon.png`, `fedoraicon2.png`

#### Social Icons (Replaced versions)
- `twitter.png`, `telegram.png`, `gitter.png`, `slack.png`
- (Note: `twitterORG.png`, `twitterNL.png`, `telegramORG.png`, `telegramNL.png` ARE used)

#### Other Unused
- `e1.png`, `e2.png`, `e4.png`, `e5.png`, `e6.png` (e3.png IS used)
- `mwallets.png`, `more.png`, `lore.png`, `iris.png`, `original.png`
- `blk_twit_bckg3.gif`, `joingitter.jpg`, `joinslack.jpg`
- `abra-logo-white.svg`

---

## 2. Images KEPT (Actively Used in index.html)

The following were initially flagged as unused but ARE used on the live site:

| File | Location in HTML |
|------|------------------|
| `bitcointalk.png` | Community social links |
| `discord.png` | Community social links |
| `facebook.png` | Community social links |
| `irc.png` | Community social links |
| `keybase.png` | Community social links |
| `twitterORG.png`, `twitterNL.png` | Community social links |
| `telegramORG.png`, `telegramNL.png` | Community social links |
| `electrum.png` | Downloads section |
| `blackhalo2.png` | Downloads section |
| `coinomi-logo.png` | Downloads section |
| `komodo-wallet-light.svg` | Downloads & Exchanges |
| `xeggex.png` | Exchanges section |
| `freixlite.png`, `freiexchange.png` | Exchanges section |
| `e3.png` | Exchanges section (HolyTransaction) |

---

## 3. CSS Selectors Removed

From `assets/styles/blackcoin.css`:

```css
/* REMOVED - Not found in any HTML/JS */
.pd-15px { padding-top: 15px; }

/* REMOVED - Not found in any HTML/JS */
#donation-link { font-size: 4rem; }
```

---

## 4. Plugin Files Archived

### plugins/breakingnewsticker/
- `js/jQuery.js` - Duplicate jQuery v2.1.1 (site uses jQuery v2.2.4 from assets/)
- `img/text.txt` - Placeholder file

**Archived to:** `_archive/unused-assets/plugins/`

---

## 5. Bootstrap Version Fix

### Issue
- **CSS:** Bootstrap v3.3.5
- **JS:** Bootstrap v4.4.1 (MISMATCH!)

### Resolution
Replaced `assets/js/bootstrap.min.js` with Bootstrap v3.3.7 JS to match CSS version.

**Backup:** `_archive/unused-assets/bootstrap-4.4.1.min.js.backup`

---

## 6. Library Updates Applied

| Library | Before | After | Notes |
|---------|--------|-------|-------|
| Bootstrap JS | v4.4.1 | v3.3.7 | Fixed version mismatch |
| Font Awesome | v6.5.1 | v7.0.1 | Updated CDN URLs |
| GSAP | v3.12.5 | v3.12.5 | No update available (3.14.2 not on cdnjs) |

---

## 7. JavaScript Dead Code

### Already Cleaned (Previous Session)

The following were removed from `main.js`:
- 20 dead functions (libraries not loaded)
- 9 unused Slick slider configs (reduced to 1)
- 582 lines of dead code removed (70% reduction)

### Remaining Potential Issues

| File | Issue | Status |
|------|-------|--------|
| `animDots.js` | Animation only runs on screens > 700px | BY DESIGN |
| `breakingNews.js` | RSS functions only used if feed param set | CONDITIONAL |

**No action needed** - remaining JS is actively used.

---

## 8. CSS Template Overhead

### main.css (14,487 lines)

This is a multipurpose template file with many unused selectors. This is expected overhead from the Definity template.

**Options**:
1. Keep as-is (simpler maintenance) - **RECOMMENDED**
2. Use CSS purger tool (smaller file size)
3. Manually extract only used selectors (labor intensive)

### bootstrap.min.css

Contains many Bootstrap classes not used by the site.

**Status:** Keep as-is (standard Bootstrap inclusion)

---

## Summary

### Actions Completed:

1. ✅ **55 unused images** archived to `_archive/unused-assets/images/`
   - Note: `ag2-logo.png` restored to `assets/images/hero/` (referenced in index.html)
2. ✅ **2 unused CSS selectors** removed from `blackcoin.css`
3. ✅ **Duplicate jQuery** archived
4. ✅ **Bootstrap JS version** fixed (v4.4.1 → v3.3.7)
5. ✅ **Font Awesome** updated (v6.5.1 → v7.0.1)
6. ✅ **5 unused CSS files** archived
7. ✅ **1 unused JS file** archived (isotope.min.js)

### Files Modified:

```
assets/styles/blackcoin.css    # Removed 2 unused selectors, ~6 lines
assets/js/bootstrap.min.js     # Replaced with v3.3.7
index.html                      # Updated Font Awesome CDN URLs
```

### Files Created/Archived:

```
_archive/unused-assets/
├── images/          # 56 unused images
├── plugins/         # jQuery.js, text.txt
└── bootstrap-4.4.1.min.js.backup
```

### Estimated Savings:

- **Images:** ~2-5MB from archived files
- **CSS:** ~100 bytes from removed selectors
- **JS:** No size change (version fix)

### Risk Level: LOW

All changes are isolated to unused assets with no references in active HTML files. The Bootstrap JS fix resolves a version compatibility issue. Font Awesome CDN update maintains backward compatibility with v4-shims.

---

## 5. Unused CSS Files (Archived)

### Styles NOT referenced in any HTML:

| File | Status |
|------|--------|
| `assets/styles/jquery.mb.YTPlayer.min.css` | Archived - YTPlayer not loaded |
| `assets/styles/template-picker.css` | Archived - Template picker not used |
| `assets/styles/jquery-ui.min.css` | Archived - jQuery UI not loaded |
| `assets/styles/jquery-ui.structure.min.css` | Archived - jQuery UI not loaded |
| `assets/styles/animated-heading.css` | Archived - Animated heading not used |

---

## 6. Unused JS Files (Archived)

| File | Status |
|------|--------|
| `assets/js/isotope.min.js` | Archived - Isotope not used (grid filtering removed in earlier cleanup) |

---

## Verification Checklist

- [x] No broken image references in index.html
- [x] No broken image references in team/index.html
- [x] No broken image references in faq/index.html
- [x] CSS selectors not found in any HTML/JS
- [x] Bootstrap JS version matches CSS (v3.x)
- [x] Font Awesome CDN URL updated correctly
- [x] Unused CSS files archived (5 files)
- [x] Unused JS files archived (1 file)