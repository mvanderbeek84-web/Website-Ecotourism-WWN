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
| Colours, fonts, layout | `css/style.css` |
| Behaviour (calendar, language switch, animations) | `js/main.js` (normally no need to touch) |
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

## Hero video (drone clip)

The hero plays the drone shot from 2:19 to 2:42 of
`RainforestDeepDive02_ReturnOfTheClimbers_English_FHD_AR.mp4` and loops it. The film has
subtitles burned in, so the page crops the bottom 16% of the picture (`hideBottomPercent` under
`heroVideo` in `content/content.js`).

Right now `src` points to the full film (1.1 GB) one folder above the site. That works when you
open the site from your computer, but the film is not on GitHub and is far too big for a website.

To make a light clip (23 s, no sound, subtitles cropped off, ~5–8 MB), with free [ffmpeg](https://ffmpeg.org),
run this in the folder that holds the film:

```
ffmpeg -ss 00:02:19 -to 00:02:42 -i "RainforestDeepDive02_ReturnOfTheClimbers_English_FHD_AR.mp4" -an -vf "crop=iw:ih*0.84:0:0,scale=1920:-2" -c:v libx264 -crf 26 -preset slow -movflags +faststart "site/assets/video/hero.mp4"
```

Then in `content.js` set `src: "assets/video/hero.mp4", start: 0, end: null, hideBottomPercent: 0`.
If you have a version of the film without subtitles, use that instead and leave out the `crop=…,` part.

Visitors who prefer reduced motion or use data saver see the still photo instead.

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
