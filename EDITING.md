# Editing this site

Every change follows the same path: **edit a file → commit → Cloudflare rebuilds
and publishes in about 90 seconds.** There is no separate "publish" step and no
admin login. Git history is the undo button.

Live site: https://ntcharters.com
Repo: https://github.com/KirkVantine/ntoutfitters-site

---

## Three ways to edit

### 1. GitHub in a browser — best for quick text changes

Works from a phone. Nothing to install.

1. Open the file on github.com (links in the table below)
2. Click the pencil icon
3. Make the change
4. **Commit changes** at the bottom, commit straight to `master`

Cloudflare picks it up automatically. Check https://ntcharters.com after a
minute or two.

### 2. github.dev — full editor in the browser, still nothing installed

On the repo page press the **`.`** key. A complete VS Code opens in the browser
with the whole project. Edit, then use the Source Control panel on the left to
commit and push. Best when changing more than one file.

### 3. Local — best for anything visual

```bash
git pull
npm run dev
```

Open http://localhost:4321. The browser updates as you type, so you can see
layout and spacing changes immediately. When happy:

```bash
git add -A
git commit -m "Describe the change"
git push
```

Run `npm install` first if you have not run the site locally before.

---

## Where things live

Most edits are one line in one of two data files.

| To change | File | Around line |
| --- | --- | --- |
| Phone, email, captain name, service area | `src/data/site.ts` | 14 |
| Instagram / Facebook links and handles | `src/data/site.ts` | 40 |
| Booking URL (when Google Calendar is ready) | `src/data/site.ts` | 96 |
| Trip prices, names, durations, photos, blurbs | `src/data/trips.ts` | 42 |
| Sponsor list | `src/pages/sponsorships.astro` | 38 |
| Sponsorship tiers and amounts | `src/pages/sponsorships.astro` | 5 |
| FAQ questions and answers | `src/pages/charters.astro` | 35 |
| What's included / what to pack | `src/pages/charters.astro` | 20 |
| Boat specs | `src/pages/about.astro` | 7 |
| Nav menu items | `src/layouts/Layout.astro` | 34 |
| Colors, fonts, spacing | `src/styles/global.css` | top of file |
| Photos | `public/images/` | — |

Anything not listed is page prose, written inline in the `.astro` file for that
page. Search for a phrase you can see on the site and you will find it.

---

## Common jobs

**Change a trip price.** `src/data/trips.ts`, find the trip, edit `price`.
Free text, so "From $550" or "Price varies" both work.

**Change the phone number.** `src/data/site.ts` — edit `phone` *and*
`phoneHref`. The first is what people read, the second is what the tap-to-call
link dials. They must match.

**Swap a trip photo.** Put the new file in `public/images/`, then point the
trip's `image` at it. Also update `imageAlt` to describe the new photo, and
check `focus` — that controls the crop. `center 25%` keeps faces in frame for a
portrait photo; a bigger percentage moves the crop down.

**Turn on real booking.** In `src/data/site.ts` set `booking.url` to the Google
Calendar link. Every "Book Now" button switches over at once. Leave it `null`
and they all stay as pre-filled emails.

**Add a sponsor.** `src/pages/sponsorships.astro`, add a line to
`currentSponsors`. Use `url: null` if they have no website.

---

## Rules that keep it from breaking

- **Keep the punctuation.** Quotes, commas, and braces matter. Change what is
  *inside* the quotes, not the structure around it.
- **Use straight quotes** `'` not curly `’`. If a value contains an apostrophe,
  wrap it in double quotes: `"Holiday's Restaurant"`.
- **Resize photos before adding them.** Aim under 500 KB. A raw phone photo is
  several MB and will make the page slow.
- **Check it afterwards.** Load https://ntcharters.com and look.

## If something breaks

Nothing here is permanent. On github.com open **Commits**, find the last good
one, and revert. The site rebuilds from that automatically.

If the site stops updating entirely, the build probably failed. Cloudflare
dashboard → Workers & Pages → ntoutfitters-site → the failed deploy shows the
error. Running `npm run build` locally reproduces it and usually names the line.

---

## Adding photos Nathaniel sends

His phone photos arrive as **HEIC**, which browsers do not display and which are 3-5 MB each.
They must be converted and resized before they go anywhere near `public/images/`.

Note that `sharp` cannot decode iPhone HDR HEIC (they carry Apple gain-map extensions and it
fails with "bad seek"), but Windows can. Convert with Windows' own decoder first, then resize:

```bash
node -e "const s=require('sharp');s('in.jpg').resize({width:1400,height:1400,fit:'inside'}).jpeg({quality:79,mozjpeg:true}).toFile('public/images/out.jpg')"
```

Naming: `g-NN.jpg` for gallery photos, `trip-*.jpg` for trip cards, `boat-*.jpg` for the boat.
Gallery count is set by the `length` value at the top of `src/pages/gallery.astro`.

**Never commit the raw camera files.** They were 144 MB before processing and 6.4 MB after.
