# Cent Robles - Portfolio

Personal portfolio for Vincent (Cent) Robles, AI automation developer (NoxBuilds).
A single-page static site: AI workflow automation work built with n8n, Make, Zapier,
GoHighLevel, and apps shipped with Claude Code.

## Stack

- Static HTML, CSS, and vanilla JavaScript. No build step.
- Poppins (Google Fonts) and Phosphor icons via CDN.
- Animated flow-field background (canvas), coverflow project carousel, scroll reveals.
- Contact form via EmailJS.
- Live chat assistant via an n8n webhook (`chat-widget.js`).

## Structure

```
index.html          markup + styles
app.js              interactions (carousel, reveals, form, background)
chat-widget.js      n8n chat widget
assets/             project images, hero photo, build video
images/             chat widget logo
favicon.png
vercel.json         clean URLs + asset caching
```

## Deploy (Vercel)

This is a pure static site, so there is no build command and no output directory.

1. Import this repo into Vercel.
2. Framework Preset: **Other**. Build Command: empty. Output Directory: `.` (root).
3. Deploy. Add a custom domain in Project Settings if desired.

Runs locally with any static server, e.g. `python3 -m http.server 8099`.

## Notes

- Restrict the EmailJS allowed-domains to the live domain before going public.
- The chat webhook is an external n8n endpoint and is public by design.
