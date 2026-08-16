# N&T Outfitters Website (Astro)

Rebuild of [ntoutfitters.org](https://www.ntoutfitters.org/), currently hosted on Wix. Content,
photos, and copy were migrated from the live public site (no Wix login used). Same stack and
deploy pattern as the Dexter Lions Club site.

Owner: **Nathaniel TerBush** — 734-717-0773 — nathanielterbush@ntoutfitters.org

## What's here

- `src/pages/` — Home, Charters, Gallery, About, Sponsorships, plus a 404 page. Same nav as the
  live site (`HOME`, `CHARTERS`, `GALLERY`, `ABOUT`, `SPONSORSHIPS`).
- `src/data/site.ts` — **single source of truth** for phone, email, Instagram, and the
  `mailto:` builders. Change a phone number here and it updates everywhere.
- `src/data/trips.ts` — the charter list. Names, durations, and prices came from the live
  "Book Online" service list; water, target species, and blurbs are new.
- `src/components/TripCard.astro` — the shared trip card used on Home and Charters.
- `src/layouts/Layout.astro` — header, hamburger nav, footer, SEO tags, `LocalBusiness`
  JSON-LD, and the phone-only sticky action bar.
- `src/styles/global.css` — the whole design system, ~1000 lines, one file.
- `public/images/` — logo, hero photos, captain photo, and 11 gallery photos, downloaded from
  the live site's public CDN and re-encoded to web-friendly sizes.
- `public/fonts/` — Barlow Condensed + Inter, self-hosted (93 KB). No third-party requests.

## Design notes

- **The brand color is forest green `#14431F`**, sampled directly from the logo mark. The
  earlier scaffold assumed an orange-and-blue palette, which was wrong. Everything now builds
  off the green, with lake blue for secondary accents and a warm amber reserved for calls to
  action — so on any page, the amber button is the thing to click.
- **Mobile first.** Trip cards go single column, the nav collapses to a hamburger, and a sticky
  Call / Book bar sits within thumb reach on every page below 900px wide. Charter inquiries
  mostly start with a phone call, so the number is a tap away everywhere.
- **Progressive enhancement.** The nav is fully expanded until JavaScript collapses it, and the
  gallery is a working photo grid before the lightbox script loads. If a script fails, nothing
  becomes unusable.
- **Favicons** are generated from the logo mark rendered white on a green tile, because the raw
  logo is dark-green-on-transparent and disappears at 16px on a dark browser tab. Regenerate
  them with the script in the commit history if the logo ever changes.

## Before this goes live — things only Nathaniel can confirm

The copy is new, so a few operational claims need his sign-off. They're marked with
`TODO(nathaniel)` comments in the source.

1. **Trip prices and durations.** Carried over from Wix as-is. These move season to season.
2. **What's included** (`src/pages/charters.astro`). The site currently says rods, reels,
   tackle, life jackets, and fish-handling help are provided. Standard for guided bass trips,
   but confirm it matches how he actually runs a day.
3. **Home page "Rods & Tackle On Board"** feature card — same question.
4. **Licensing/insurance.** Deliberately *not* claimed anywhere, since it couldn't be verified
   from the live site. If he holds a USCG license and liability insurance, say so — it is one
   of the strongest trust signals a charter site can have.
5. **Sponsorship season year.** The tier copy is year-neutral now; the live site said "2025".
6. **Boat specs** (`src/pages/about.astro`) were read off his own photos — Nitro Z18, Mercury
   175 Pro XS OptiMax, Minn Kota Raptor anchors, Garmin electronics. Worth a glance.
7. **No testimonials yet.** Deliberately left out rather than invented. Real reviews are the
   single highest-value thing to add — even three or four with first names and a town.

## Known gaps

- **Live booking & payments.** The Wix site uses **Wix Bookings** (per-trip calendars, deposits,
  "Request to Book") and a cart/checkout. A static site can't replicate real-time scheduling.
  Every booking button here is a `mailto:` pre-filled with the trip name and the questions he
  always ends up asking (dates, party size, experience level), plus click-to-call everywhere.
  Before launch, decide whether to:
  - keep the call/email flow permanently (simplest, no fees, and how a lot of charter captains
    actually operate), or
  - integrate a real scheduler (Acuity, FareHarbor, or Calendly + Stripe) to restore self-serve
    booking with deposits.
- **Sponsorship form.** The live site has a Wix contact form; replaced with a `mailto:` button.
  [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) are the usual next
  step if a real form is wanted.
- **One gallery photo missing.** 12 photos are on the live Gallery page; one
  (`IMG_20220529_211717_452_Original.jpg`) returned `403 Forbidden` from Wix's CDN at every size
  tried. The other 11 are in `public/images/gallery-*.jpg`. Re-export it from the Wix media
  library once you have account access.
- **Email stays on Google Workspace.** MX records for `ntoutfitters.org` point to Google,
  separate from Wix hosting. Don't touch MX/SPF records when moving DNS — only the
  A/nameserver records need to change.

## Running locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`dev` serves on http://localhost:4321; `build` outputs static files to `dist/`.

## Deploying (Cloudflare Pages, free tier — same pattern as Dexter Lions)

1. Push this repo to GitHub.
2. In Cloudflare: Workers & Pages → Create → Pages → Connect to Git → pick the repo.
   Build command `npm run build`, build output directory `dist`.
3. Once the deploy looks right, point `ntoutfitters.org`'s DNS at Cloudflare and cancel the Wix
   plan. The registrar is Tucows/OpenSRS (not Wix) — Nathaniel will need his registrar login
   (check purchase/renewal receipts) and will have to clear the `clientTransferProhibited` /
   `clientUpdateProhibited` locks before any transfer or nameserver change.
