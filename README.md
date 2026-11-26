# Barbilla tour website (first version)

One-page bilingual (English / Spanish) website for the Fundación Work with Nature
tour to National Park Barbilla, sector Matina. Built on the Night Canopy design system.

## Open it

Double-click `index.html`. It opens in your browser, no installation needed.
(Fonts load from Google Fonts, so you need an internet connection for the right typeface.)

## Where things are

| What | File |
|---|---|
| **All text (EN + ES), photos, prices, dates, contact** | `content/content.js` |
| Colors, fonts, layout | `css/style.css` |
| Behavior (calendar, language switch, animations) | `js/main.js` (normally no need to touch) |
| Web-sized photos (small `-s` and large `-l`) | `assets/img/` |
| Logos | `assets/logos/` |

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

## Hero background (moving 3D photo)

The hero uses photo IMG_6978, split into three depth layers in `assets/img/`:
`hero-sky` (sky and far mountains), `hero-land` (the forest) and `hero-fg` (the grass in front).
The layers pan slowly and move at different speeds, so the landscape looks three-dimensional. On a
computer it also tilts a little toward the mouse. Soft mist drifts through the valley.

Settings are under `heroScene` in `content/content.js`:
- `panSeconds`: how long one slow pan back and forth takes (higher = slower)
- `depth`: strength of the 3D effect (0 = flat, 1 = normal, 1.5 = strong)
- `mist`: `true` or `false`

Visitors can pause the motion with the button at the bottom right. Visitors whose device asks for
reduced motion see the still photo.

To use a different photo, the layers have to be cut again (sky, land and foreground with
transparent backgrounds). Ask Claude to do it, or keep the same file names.

## Bookings

The form has a calendar (closed days, minimum notice and group size are set under
`availability` and `groupMax` in `content.js`) and group size steppers.
For now **Send booking request** opens the visitor's email app with the request filled in,
addressed to the booking email (`contact.email`). **Send via WhatsApp** opens WhatsApp with the same text.
Nothing is stored and nobody pays online yet.

To connect a booking system or form service later, set
`bookingDelivery: { method: "endpoint", endpointUrl: "https://…" }`; the form then POSTs the
request as JSON (and falls back to email if that fails).

## Adding a second tour

Tours are a list under `tours: [ … ]` in `content.js`. Copy the whole `{ id: "barbilla-matina", … }`
block, paste it after the first one (with a comma between them), and change the id and content.
The page currently shows the first tour; showing several tours (cards + a tour picker in the
booking form) is the next step when the second tour is ready.
