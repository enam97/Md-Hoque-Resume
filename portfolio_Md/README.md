# MD Hoque — Civil Engineer Portfolio

A static portfolio site built with plain HTML, CSS, and vanilla JavaScript — no build step, no framework, no dependencies.

## Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/              (empty — add a headshot here if desired)
│   └── documents/
│       └── MD_Hoque_PE_Resume.pdf
└── README.md
```

## Running it locally

No install required. Either:

1. Double-click `index.html` to open it directly in a browser, or
2. Serve it locally (recommended, since the `download` attribute and some browsers behave better over http://):
   ```bash
   cd portfolio
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.

## Updating the resume file

Replace `assets/documents/MD_Hoque_PE_Resume.pdf` with a new PDF of the same filename, or update the two `href` references in `index.html` (hero button and the "Resume" section button/footer link) if you rename it.

## Adding a headshot

Drop an image into `assets/images/` and add an `<img>` where you'd like it (the hero section and About section are natural spots). Keep it under ~300KB and add descriptive `alt` text.

## Deploying it

Any static host works since there's no server-side code:

- **GitHub Pages** — push this folder to a repo and enable Pages in the repo settings (Settings → Pages → Deploy from branch).
- **Netlify / Vercel** — drag-and-drop the `portfolio` folder into their dashboard, or connect the GitHub repo for automatic redeploys.
- **Cloudflare Pages** — same drag-and-drop or Git-connected flow.

## Things flagged for your review before publishing

- **Phone number** — the resume lists a personal phone number. It has been left off the public page; the Contact section only shows email, LinkedIn, and borough-level location. Add it back in `index.html` if you'd rather have it public.
- **Project names** — the resume describes project *categories* and dollar values but doesn't name specific projects, addresses, or clients, so the Projects section groups work by category rather than inventing project names. Swap in real project names/photos if you want a more specific showcase.
- **Existing GitHub Pages portfolio and Task Order app** — the resume references two of your own links (`enam97.github.io/Civil-Engineering-portfolio` and `enamul-sae.github.io/Task-Order-App-v1`). Neither is linked from this site yet; let me know if you'd like either added (e.g., as a "Tools I've built" card in Projects).
- **Headshot** — no photo was provided, so the hero uses a monogram seal and a schematic illustration instead of a portrait placeholder.
