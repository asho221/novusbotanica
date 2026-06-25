# Novus Botanica — website v3 ("Apothecary Clinical")

A fresh visual direction, taken up a level. Light and editorial instead of dark and
heavy, with the copy cut back so design and typography carry the weight. Same plain
HTML / one stylesheet / one script — no build step, deploys to Vercel as-is.

## The direction

- **Light, warm, editorial.** A bone-paper base, warm near-black ink, a burnt **clay/spice** accent (off the usual supplement green-and-gold), and a muted **moss** counterpoint. Restraint is the point — it reads as expensive.
- **Real typography.** **Newsreader** (a refined editorial serif) for headlines, **Inter** for everything else. Monospace is used only for lab/COA data, where it belongs.
- **A crafted motif, not a cliché.** The particle field is gone. The hero carries a fine-line **"specimen plate"** — instrument rings, a tick scale and a molecular lattice — that draws itself in and slowly rotates. Science as craft.
- **Monograph structure, fewer words.** Big folio numbers, generous space, and editorial **index rows** instead of paragraph-heavy cards.

All the substance from the audit is kept: CDMO positioning, no "white-label", advanced delivery, honest "engineered to comply with / target scope" framing, the honest format set, and the "Solvent residue — Tested" line. It's just said in far fewer words.

## Files

```
index.html  capabilities.html  products.html  certifications.html  about.html  contact.html
styles.css   script.js   README.md
```

---

## 1. Edit before publishing

Replace everything wrapped in `[[ ... ]]`, plus the form key (find in all files):

| Find | Replace with |
|------|--------------|
| `[[hello@novusbotanica.com]]` | your email |
| `[[+91 00000 00000]]` | phone, nicely spaced (display) |
| `[[+910000000000]]` | phone, no spaces (the `tel:` link) |
| `[[910000000000]]` | WhatsApp: country code + number, no `+`, no spaces |
| `YOUR_WEB3FORMS_ACCESS_KEY` | your Web3Forms key (step 2) |

**Locations** show Patiala, Punjab (manufacturing) and East London (UK office). Add full street detail / postcodes to the real registered addresses in `contact.html`, `about.html` and the page footers (search for `Patiala`) when you're ready.

- **Company name** is still the "Novus Botanica" placeholder we paused on. Once a name clears (domain + trademark), find/replace `Novus Botanica` across all files.
- **When certs become real**, soften the "Target scope" labels and commissioning notes (Quality page, About, hero strip) to definitive. Until then, keep the honest framing.

## 2. Contact form (free, ~2 min)

1. **web3forms.com** → enter the email you want enquiries sent to → submit.
2. Copy the **Access Key**.
3. In `contact.html`, replace `YOUR_WEB3FORMS_ACCESS_KEY` with it.

Until then the form shows a friendly "email us directly" message, so it never looks broken.

## 3. Deploy as a separate site

1. **github.com** → new repo (e.g. `nutraventures-v3`).
2. **Add file → Upload files** → drag in the *loose files* (not the folder, not the zip). `index.html` at the repo root.
3. **Commit**.
4. **vercel.com** → **Add New → Project → Import** the repo → preset reads "Other" → **Deploy**.

Share the clean production URL (e.g. `nutraventures-v3.vercel.app`), not the long deployment URL with the random hash — that one is login-protected.

## 4. Swapping in a real video (optional)

The hero motif is code, so there's nothing to load. If you film something, you can use it instead: add a `.hero` background `<video autoplay muted loop playsinline>` positioned like the `.plate`, and either remove the `#plate` div or keep it as a subtle overlay. Keep the file under ~5 MB.

---

## Editing later

- **Text** → the page's `.html`.
- **Colour / type** → `styles.css`, the `:root` block at the very top (palette is four tokens: paper, ink, clay, moss).
- **The plate motif** → `script.js`, `buildPlate()` (ring sizes, tick spacing, lattice and node placement).
