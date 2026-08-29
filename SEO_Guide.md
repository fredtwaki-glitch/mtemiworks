# Getting Mtemi Swift Rides Found on Google

There are two separate things people mean by "searchable on Google," and this site needs both:

1. **Organic search** — showing up when someone types "van hire Nakuru" into Google
2. **Local search / Google Maps** — showing up in the map results and "near me" searches

The site already has the technical SEO basics built in (unique titles, meta descriptions, structured data on every page). This guide covers the parts that need to happen *outside* the code — the steps that actually get you crawled, indexed, and ranked.

---

## Part 1 — Get indexed with Google Search Console

This tells Google your site exists and hands it a map of every page.

1. Go to [search.google.com/search-console](https://search.google.com/search-console) and sign in with a Google account (use the business Gmail — `mtemiswiftrides@gmail.com`).
2. Click **Add Property** → choose **URL prefix** → enter your live domain (e.g. `https://www.mtemiswiftrides.co.ke`).
3. **Verify ownership** — the easiest method once the site is live: choose the **HTML tag** method, copy the `<meta>` tag Google gives you, and paste it into the `<head>` of every page (or just `index.html` if Search Console only asks for that). Alternatively, if you're using GitHub Pages with a custom domain, the **DNS TXT record** method works well — add the record at your domain registrar.
4. Once verified, go to **Sitemaps** in the left menu, and submit:
   ```
   sitemap.xml
   ```
   This site already includes a `sitemap.xml` file (in the project root) listing all 7 pages — Google will use it to find and crawl everything at once instead of discovering pages slowly over time.
5. Under **URL Inspection**, paste your homepage URL and click **Request Indexing** to speed up the first crawl.

**Two files were added to the project root to support this:**
- `sitemap.xml` — lists all pages for Google to crawl
- `robots.txt` — tells search engines they're allowed to crawl the whole site and points them to the sitemap

Both need to be pushed to GitHub the same way as any other file:
```bash
git add .
git commit -m "Add sitemap and robots.txt for SEO"
git push
```
They should end up accessible at `https://<your-domain>/sitemap.xml` and `https://<your-domain>/robots.txt` — check both load correctly after pushing.

> **Important:** the sitemap and every page's canonical/Open Graph tag currently use the placeholder domain `mtemiswiftrides.co.ke`. If your final domain is different, that needs to be updated in `sitemap.xml` and in the `<link rel="canonical">` / `<meta property="og:url">` tags across all 7 HTML files before submitting to Search Console.

---

## Part 2 — Set up Google Business Profile (this matters more than people expect)

For a van hire business, **this is usually the highest-impact step** — it's what makes you show up on Google Maps and in the "near me" results, often above organic search results entirely.

1. Go to [google.com/business](https://www.google.com/business/) and click **Manage now**.
2. Enter the business name: **Mtemi Swift Rides**.
3. Choose a category: **Airport shuttle service** / **Van rental agency** / **Transportation service** (pick the closest match — you can add more categories later).
4. Add the service area: **Nakuru, Kenya**, plus "Kenya" broadly if you serve customers nationwide.
5. Add the phone number (0726 369 063), website URL, and hours of operation.
6. Google will verify the business — usually by a postcard mailed to your address, or sometimes by phone/email verification if eligible. This step can take a few days to a couple of weeks.
7. Once verified, add:
   - Real photos (you already have great ones — the fleet, the interior, the founder)
   - A business description using your brand language ("Comfortable Journeys. Reliable Rides. Memorable Experiences.")
   - A link straight to your website's Contact page for bookings

**Ask happy customers to leave a Google review** once trips start happening — review count and rating are one of the biggest ranking factors in local search, and there's currently nothing to invent here since no reviews exist yet.

---

## Part 3 — Other things that move the needle

- **Backlinks**: get your website URL listed anywhere your business is already mentioned — your Facebook page, Instagram bio, TikTok bio, WhatsApp Business profile, and any local business directories (Yellow Pages Kenya, BusinessList.co.ke, etc.). Each link back to your site is a small trust signal to Google.
- **Consistent NAP** (Name, Address, Phone): make sure your business name, phone number and location are written identically everywhere online (Google Business, Facebook, directories). Inconsistent formatting (e.g. "0726369063" in one place and "+254 726 369 063" in another) can quietly hurt local ranking.
- **Mobile-friendliness**: already handled — the site is mobile-first responsive.
- **Page speed**: already fast — this is a lightweight static site with no heavy frameworks, which Google rewards.
- **HTTPS**: make sure whichever hosting option you choose (GitHub Pages or a Kenyan host) has SSL/HTTPS enabled — it's a confirmed ranking factor and most hosts now include it free.
- **Fresh content**: Google favors sites that update. Even small periodic edits (a new gallery photo, an FAQ answer, a blog-style update if you add one later) signal an active, maintained site.

---

## Realistic timeline

- Search Console indexing: pages typically start appearing in search within a few days to 2 weeks of submission.
- Google Business Profile: verification can take days to a few weeks, but once live, local map visibility can happen fast — especially with zero local competition using the phrase "van hire Nakuru" directly.
- Meaningful ranking improvement (climbing above competitors) is a months-long process built on reviews, backlinks, and consistent activity — there's no legitimate shortcut to instant top rankings.
