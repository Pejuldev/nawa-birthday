# Happy Birthday, Nawa Shalihah 🌙

A single-page, no-backend birthday gift website — an Islamic-inspired,
Cairo/Al-Azhar-themed experience built with plain HTML, CSS, and JavaScript.

## Structure
```
index.html          → all sections/markup
css/style.css        → all styling & animation
js/script.js          → all interactivity (no frameworks)
assets/audio/         → optional ambience mp3 (site works without it)
```

## Deploy on GitHub Pages
1. Create a new GitHub repository (e.g. `nawa-birthday`).
2. Upload all files keeping the folder structure above.
3. Go to **Settings → Pages**, set source to the `main` branch, root folder.
4. Your site will be live at `https://<username>.github.io/nawa-birthday/`.

No build step, no dependencies, no server required.

## Notes
- Fonts are loaded from Google Fonts (Reem Kufi, Amiri, Cormorant Garamond, Poppins).
- The sound toggle looks for `assets/audio/quran-ambience.mp3` — add your own
  licensed/instrumental ambience file there if you'd like background sound;
  the button simply does nothing audible if the file isn't present.
- Respects `prefers-reduced-motion` for accessibility.
- Fully responsive from mobile to desktop.
