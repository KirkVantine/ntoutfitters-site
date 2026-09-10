# N&T Outfitters Website (Astro)

Rebuild of [ntoutfitters.org](https://www.ntoutfitters.org/), currently hosted on Wix. Content,
photos, and copy were migrated from the live public site (no Wix login used). Same stack and
deploy pattern as the Dexter Lions Club site.

Owner: **Nathaniel TerBush** — 734-717-0773 — nterbush25@gmail.com

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
6. **Boat specs — REMOVED, awaiting new details.** He has a **new boat** as of Aug 2026.
   The old Nitro Z18 / Mercury 175 Pro XS specs were read off his earlier photos and are no
   longer true, so every reference was stripped from the About page, the home page feature
   card, and a trip blurb rather than left live. Restore the spec table in
   `src/pages/about.astro` once he sends make, model, power, and capacity. **The photos
   still show the old boat** and need replacing too.
7. **No testimonials yet.** Deliberately left out rather than invented. Real reviews are the
   single highest-value thing to add — even three or four with first names and a town.
8. **Photos — refreshed Sep 2026.** Nathaniel supplied ~65 originals (mostly iPhone HEIC).
   These were converted, resized and re-encoded; the raw uploads are **not** in the repo, and
   must never be committed (144 MB vs 6.4 MB after processing). Every trip photo was checked
   against the species it advertises. Remaining gap: **still no perch photo**, so the Perch
   trip shows sunrise from the deck rather than the wrong fish.

## Known gaps

- **Live booking & payments — blocked on plan choice.** Nathaniel has a Stripe account, but
  his Google account is a **free @gmail.com**, and paid appointment bookings in Google
  Calendar require a Google Workspace subscription. So the intended Google Calendar + Stripe
  path is not available as-is. Options: pay for Google Workspace Individual, or use Square
  Appointments' free tier (which supports deposits, buffers and lead times but replaces
  Stripe). Until one is chosen, every Book button stays a pre-filled `mailto:`. The plumbing
  is ready — set `booking.url` in `src/data/site.ts` and all ten buttons switch at once.

  His confirmed rules, for whichever tool is used: **$100 deposit**, **24-48h minimum notice**,
  **30 min buffer between trips**, **max 2 trips/day**, captain has final say on weather,
  deposit refundable if the captain cancels and forfeited if the customer cancels without
  justification.
- **Sponsorship form.** The live site has a Wix contact form; replaced with a `mailto:` button.
  [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) are the usual next
  step if a real form is wanted.
- **Old Wix photos retired.** The original 11 `gallery-*.jpg` plus `hero-1/2.jpg` showed the
  previous boat and were removed in favour of Nathaniel's own library. `captain.jpg` is kept
  because it is genuinely him, though the boat behind him is the old one — worth replacing with
  a current portrait when one exists.
- **Email is a free Gmail account, not Workspace.** As of Aug 2026 Nathaniel closed
  `nathanielterbush@ntoutfitters.org` — it was a paid Wix mailbox — and now uses
  `nterbush25@gmail.com`. Two consequences:
  - Moving `ntoutfitters.org` into Cloudflare no longer risks breaking his email, since
    nothing is delivered there any more. Earlier notes in this file said otherwise.
  - A `nathaniel@ntcharters.com` address would need **Cloudflare Email Routing** (free,
    forwards to his Gmail). A free Gmail account cannot host a custom domain by itself.

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

## Deploying (Cloudflare Workers static assets)

The repo is connected to a Cloudflare **Worker** — not Pages. Cloudflare's Git
integration routes new projects to Workers with static assets now. Every push to
`master` builds and deploys automatically and goes live in roughly two minutes.

- Project: `ntoutfitters-site`
- Preview URL: https://ntoutfitters-site.kirk-vantine.workers.dev
- Build command `npm run build`, output directory `dist`

The build is pure static output (no `_worker.js`), which matters for cost:
requests to static assets are free and unlimited on Cloudflare's free plan. Only
dynamic Worker invocations count against quota, and this site has none.

### Custom domain

Production domain is **ntcharters.com** (apex, no `www`). The `site` value in
`astro.config.mjs` must always match it — it drives canonical tags, `og:url`, and
the sitemap. If it points at the wrong domain, every page tells Google that the
*other* domain is authoritative, which suppresses this one.

To attach a domain already in the same Cloudflare account:
Workers & Pages -> ntoutfitters-site -> Settings -> Domains & Routes -> Add ->
Custom Domain. Cloudflare creates the DNS record and issues the TLS certificate.

### Still to do on the domain move

- Add `www.ntcharters.com` and redirect it to the apex so only one hostname is
  canonical.
- Move `ntoutfitters.org` into Cloudflare and 301 it to `ntcharters.com`. **Keep
  renewing it** — it is on business cards, the Instagram bio, and the FishingBooker
  listing. Capture every existing DNS record before changing nameservers: his email
  is Google Workspace and lives in those MX/SPF/DKIM records.
- Add `ntcharters.com` to Google Workspace as a domain alias so
  `nathaniel@ntcharters.com` works. Until then the site correctly shows the
  `@ntoutfitters.org` address.
- Update the Google Business Profile, Instagram bio, and FishingBooker listing to
  the new domain.
