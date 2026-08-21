# Mtemi Swift Rides — Website

A 5-page, production-ready static website for Mtemi Swift Rides (Home, About,
Services, Fleet & Experiences, Contact & Booking).

## Why static HTML/CSS/JS instead of a React/Vite build

The brief called for React + Vite + Tailwind. This build environment has no
outbound network access, so `npm install` cannot fetch React, Vite, or any
package from the registry — there's no way to produce a working `node_modules`
here. Rather than hand over a project that can't actually run, this was built
as **plain, dependency-free HTML/CSS/JS**: it opens directly in a browser,
deploys to any static host with zero build step, and needs no `npm install`
to work today.

The code is already organized the way the React version would be, to make a
future migration straightforward:
- One shared design system (`assets/css/style.css`) — this becomes your
  Tailwind config / global styles.
- One shared behavior file (`assets/js/main.js`) — nav, scroll reveal,
  accordion, WhatsApp links. Each block maps cleanly to a component
  (`Navbar`, `Footer`, `FAQAccordion`, `WhatsAppButton`).
- `assets/js/booking-form.js` — form validation and submit handling, written
  so `submitEnquiry()` is the one place to wire up a real API call.
- `assets/js/config.js` — every editable business fact (phone, WhatsApp,
  email, CEO name, social links) lives here. In React this becomes a single
  `siteConfig.ts`/context.
- Each HTML page repeats the nav/footer markup (no build step to share
  partials) but pulls all dynamic values from `config.js` at runtime via
  `data-cfg-*` attributes — update the config once, it updates everywhere.

If you'd like the actual React/Vite/TypeScript/Tailwind version, the fastest
path is to open this project with **Claude Code** (or hand it to a developer)
in an environment with npm access — the component boundaries are already
drawn out above, so scaffolding `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`,
`ServiceCard.tsx`, `BookingForm.tsx`, `CEOSection.tsx`, `FleetGallery.tsx`,
and `FAQ.tsx` from this markup is mostly a copy/adapt job.

## Before you launch — required edits

Open `assets/js/config.js` and replace every `[PLACEHOLDER]`:

| Field | Where it appears |
|---|---|
| `contact.phone` | Footer, Contact page |
| `contact.whatsapp` | Every WhatsApp button/link sitewide, footer |
| `contact.email` | Footer, Contact page |
| `ceo.name` | Home, About (appears 5 times via `data-cfg-ceo-name`) |
| `social.instagram/facebook/tiktok/youtube` | Footer, Home "Travel With Mtemi" section |

**Do not** invent these values — the placeholders are intentional and match
the brief's authenticity rules. Nothing else in the codebase needs to change;
every reference reads from this one file.

## Real photography already in place

`assets/img/` contains the real Mtemi Swift Rides photos supplied for this
project (fleet vans, van interior, a fuel-stop shot, and the founder
portrait), already wired into the Home, About, Services and Fleet pages.
To swap or add more, drop new files into `assets/img/` and update the `src`
in the relevant HTML file — filenames are descriptive
(`van-roadside-scenic.jpeg`, `van-interior-seats.jpeg`, `ceo-portrait.jpeg`,
etc.) to make this easy.

## CEO / Founder content

The founder's name is still a placeholder (`[CEO/Founder Name]`) — set it in
`config.js` and it will populate on the Home and About pages automatically.
No qualifications, awards, or history have been invented; add them directly
into `about.html` once confirmed by the business.

## Testing locally in PyCharm

No build step is needed — PyCharm just needs to serve the folder over
`http://` rather than opening files directly (opening via `file://` will
break the `/assets/...` absolute paths and the map embed).

1. Open the `mtemi` folder in PyCharm as a project.
2. Right-click `index.html` in the Project panel → **Open in Browser** (if
   PyCharm Professional is installed, it runs a built-in preview server for
   you automatically — look for the browser icons in the gutter next to
   `<html>`). This is the easiest route.
3. **If you're on PyCharm Community** (no built-in web server), run a quick
   local server instead — open the Terminal tab inside PyCharm, `cd` into
   the `mtemi` folder, and run:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser. Stop it later with
   `Ctrl+C`.
4. Click through all 5 pages plus `/privacy.html`, test the mobile menu by
   shrinking the window, and submit the booking form to see the success
   state and the WhatsApp button.

## Hosting live on GitHub Pages

1. Create a new GitHub repository (e.g. `mtemi-swift-rides`).
2. Push the contents of this `mtemi` folder to the repo root (so
   `index.html` sits at the top level, not nested inside a subfolder).
   ```bash
   cd mtemi
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/mtemi-swift-rides.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch**, pick
   `main` and `/ (root)`, then save.
4. GitHub gives you a live URL shortly after, typically
   `https://<your-username>.github.io/mtemi-swift-rides/`.
5. Optional: add a custom domain under the same Pages settings once you
   have one, and update the `canonical`/`og:url` tags and the JSON-LD `url`
   field in each page to match it.

## Structure

```
mtemi/
├── index.html          Home
├── about.html           About + full CEO section
├── services.html        6 services
├── fleet.html            Fleet & Experiences
├── contact.html          Contact & Booking + FAQ (#faq) + map
├── privacy.html           Privacy Policy
├── assets/
│   ├── css/style.css     Design system (tokens, components, responsive)
│   ├── js/config.js       Editable business info — START HERE
│   ├── js/main.js         Shared behavior (nav, scroll reveal, roadline, accordion)
│   ├── js/booking-form.js Form validation + submit handling (API-ready)
│   └── img/                Real Mtemi Swift Rides photography
```

## Deploying

This is a static site — any static host works, no build step required:

- **Netlify / Vercel**: drag-and-drop the `mtemi` folder, or connect a repo.
- **GitHub Pages**: push this folder to a repo and enable Pages.
- **Any web server**: upload the folder as-is; `index.html` is the entry point.

## Connecting the booking form to a real backend

`assets/js/booking-form.js` has a single function, `submitEnquiry(payload)`,
that currently resolves locally. Replace its body with a real request, e.g.:

```js
async function submitEnquiry(payload) {
  const res = await fetch("https://your-api.example.com/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to submit enquiry");
  return res.json();
}
```

No API keys or credentials should ever be added to this frontend file —
handle authentication on your backend.

## Footer credit link

Every page's footer includes "Designed by Noventra Technologies." The link
currently points to `#` — update the `href` in the `.footer-credit a` tag
across all 6 HTML files once you have a URL to link to (e.g. an agency
website).

## Copyright year

The footer shows "© 2016–[current year]." The end year updates
automatically; the start year (2016) is set as static text directly in each
footer — edit it in the HTML if it needs to change.

## SEO & structured data

Each page has a unique `<title>`, meta description, canonical URL, Open Graph
tags, and semantic heading hierarchy. `index.html` includes a
`TransportationCompany` JSON-LD block — update the `url` field once the site
has a real domain, and add `telephone` / `email` once those are confirmed.

## Accessibility & performance

- Semantic HTML, labeled form fields, visible focus states, skip-to-content
  link, `aria-expanded`/`aria-current` where relevant.
- `prefers-reduced-motion` is respected — scroll reveal and the animated
  roadline both disable themselves.
- Images use `loading="lazy"` (except the hero). Swap in WebP/AVIF versions
  of the photos in `assets/img/` for better Core Web Vitals once available.
