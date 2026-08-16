# N&T Outfitters Website (Astro)

Rebuild of [ntoutfitters.org](https://www.ntoutfitters.org/), currently hosted on Wix. Content,
photos, and copy were migrated from the live public site (no Wix login used).

## What's here

- `src/pages/` — Home, Charters, Gallery, About, Sponsorships — the same 5 pages as the live
  site's nav (`HOME`, `CHARTERS`, `GALLERY`, `ABOUT`, `SPONSORSHIPS`).
- `src/data/trips.ts` — the charter list (name/duration/price) shared by the Home and Charters
  pages. Pulled from the live "Book Online" service list — confirm current pricing with the
  captain before publishing, since these change season to season.
- `src/layouts/Layout.astro` — shared header/nav/footer.
- `public/images/` — logo, hero photos, captain photo, and 11 gallery photos, downloaded from
  the live site's public CDN (`static.wixstatic.com`) and re-encoded to web-friendly JPEG sizes
  (~150–450 KB each, down from multi-MB camera originals).

## Known gaps to fill in

- **Live booking & payments.** The Wix site uses **Wix Bookings** (per-trip calendars, deposits,
  "Request to Book" flow) and a cart/checkout. This is the biggest functional gap — a static
  Astro site can't replicate real-time scheduling or payment collection on its own. Right now
  every "Book Now" / "Request to Book" button is a `mailto:` link pre-filled with the trip name,
  same stopgap used on the Dexter Lions site. Before this goes live, decide whether to:
  - keep the email-inquiry flow permanently (simplest, no fees, matches how a lot of charter
    captains actually operate), or
  - integrate a real scheduler (e.g. Acuity Scheduling, FareHarbor, Calendly + Stripe) — more
    work, but restores self-serve booking with deposits.
- **Sponsorship form.** The live site has a Wix Forms contact form on the Sponsorships page.
  Replaced here with a `mailto:` button, same reasoning as the Dexter Lions contact page — no
  backend needed, nothing to silently break. [Formspree](https://formspree.io) or
  [Web3Forms](https://web3forms.com) are the usual next step if a real form is wanted later.
- **One gallery photo missing.** 12 photos are on the live Gallery page; one
  (`IMG_20220529_211717_452_Original.jpg`) returned `403 Forbidden` from Wix's CDN at every size
  tried — possibly a protected/restricted asset. The other 11 are in `public/images/gallery-*.jpg`.
  Once you have Wix account access, re-export that one from the media library.
- **Email stays on Google Workspace.** MX records for `ntoutfitters.org` point to Google, separate
  from Wix hosting. Don't touch MX/SPF records when moving DNS — only the A/nameserver records
  need to change.

## Running locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
```

## Deploying (Cloudflare Pages, free tier — same pattern as Dexter Lions)

1. Push this repo to GitHub.
2. In Cloudflare: Workers & Pages → Create → Pages → Connect to Git → pick the repo.
   Build command `npm run build`, build output directory `dist`.
3. Once you're happy with the deploy, point `ntoutfitters.org`'s DNS at Cloudflare and cancel
   the Wix plan. The domain's registrar is Tucows/OpenSRS (not Wix) — your friend will need to
   find his registrar login (check purchase/renewal email receipts) and remove the
   `clientTransferProhibited`/`clientUpdateProhibited` locks before any transfer or nameserver
   change.
