# Barbilla tour website (first version)

One-page bilingual (English / Spanish) website for the Fundación Work with Nature
tour to National Park Barbilla, sector Matina. Built on the Night Canopy design system.

## Open it

Double-click `index.html`. It opens in your browser, no installation needed.
The fonts are stored in `assets/fonts/`, so the page looks right even offline.

## Where things are

| What | File |
|---|---|
| **All text (EN + ES), photos, prices, dates, contact** | `content/content.js` |
| Colors, fonts, layout | `css/style.css` |
| Behavior (calendar, language switch, animations) | `js/main.js` (normally no need to touch) |
| Web-sized photos (small `-s` and large `-l`) | `assets/img/` |
| Logos | `assets/logos/` |
| Fonts (Roboto, Roboto Slab, Roboto Mono, latin) | `assets/fonts/` |
| Search engines and social sharing | top of `index.html`, `robots.txt`, `sitemap.xml`, `assets/img/og-image.jpg` |

## Changing content

Open `content/content.js` in a text editor (Notepad works; VS Code is nicer), change the text
between the quotes, save, and reload the page.

- Every text has an `en:` and an `es:` version.
- Text with `todo: true` is placeholder text. It shows a dashed amber underline on the page.
  When you replace it, remove `todo: true`. Before going live set
  `showPlaceholderMarkers: false` at the top of the file.
- Careful with quotes: if your text contains a `"`, write it as `\"`.

## Changing photos

1. Make a web-sized copy (about 1800 px on the long side, and an 800 px copy), name them
   `myphoto-l.jpg` and `myphoto-s.jpg`, and put them in `assets/img/`.
2. In `content.js`, under `PHOTOS`, add a line such as
   `myPhoto: { file: "myphoto", alt: { en: "…", es: "…" } },`
3. Use `"myPhoto"` in the `photos: [...]` list of a tour stop.
4. Make the light AVIF copies the page normally shows: `python3 tools/optimize-images.py`
   (needs Python with Pillow 11+). It only redoes photos whose JPG changed.
   `python3 tools/optimize-images.py --check` tells you if any are out of date.
   If you forget this step nothing breaks: the page simply shows the (heavier) JPG.

## Hero background

The hero shows photo Barbilla1 (`assets/img/hero-barbilla1-l.jpg` and `-s.jpg`). On a computer it
moves and tilts slightly when you move the mouse over it. Visitors whose device asks for reduced
motion see it still.

Settings are under `heroScene` in `content/content.js`:
- `depth`: how much it moves (0 = still, 1 = normal, 1.5 = more)
- `autoMove`: `true` makes it also pan slowly by itself (with a pause button), `false` = mouse only

To use another photo, make a 2400 px and a 1200 px copy, save them over the two hero files
(same names), and reload.

## Bookings

The form has a calendar (closed days, minimum notice and group size are set under
`availability` and `groupMax` in `content.js`) and group size steppers.
For now **Send booking request** opens the visitor's email app with the request filled in,
addressed to the booking email (`contact.email`). **Send via WhatsApp** opens WhatsApp with the same text.
Nothing is stored and nobody pays online yet.

To connect a booking system or form service later, set
`bookingDelivery: { method: "endpoint", endpointUrl: "https://…" }`; the form then POSTs the
request as JSON (and falls back to email if that fails). Also add that service's address to
`connect-src` in the security line at the top of `index.html` (see below), or the browser blocks it.

## Adding a second tour

Tours are a list under `tours: [ … ]` in `content.js`. Copy the whole `{ id: "barbilla-matina", … }`
block, paste it after the first one (with a comma between them), and change the id and content.
The page currently shows the first tour; showing several tours (cards + a tour picker in the
booking form) is the next step when the second tour is ready.

## Web address, search engines and sharing

The page is prepared for **https://www.visitbarbilla.com/**. That address appears in the top of
`index.html` (canonical, language and sharing tags, and the tour details for Google), in
`robots.txt` and in `sitemap.xml`. If the domain changes, search-and-replace it in those three files.

- `og-image.jpg` (1200 × 630) is the picture shown when someone shares the link on WhatsApp,
  Facebook, etc.
- The Spanish version has its own address: `?lang=es` (English: `?lang=en`).

## Visitor statistics (GoatCounter)

Set your GoatCounter site code in `content/content.js` under `analytics: { goatcounterCode: "…" }`.
With `null` statistics are off. It is never counted on a local copy (double-clicked file) or on localhost.
See the numbers at `https://<code>.goatcounter.com`.

## Security

- The site has no server, database or login, and it stores no visitor data. A booking request
  only leaves the visitor's device when they press send in their own email app or WhatsApp.
  The only thing remembered in the browser is the chosen language (`wwn-lang`).
- `_headers` adds real security headers (HTTPS-only, no embedding in other sites, no camera/microphone/location access) and a 1-day browser cache for `assets/`, on Cloudflare hosting.
- The `Content-Security-Policy` line at the top of `index.html` lets the page load only its own
  files plus the Google Maps embed and GoatCounter. When you add an outside service (form endpoint, analytics,
  video host, chat widget), add its address to that line, or it will be blocked.
