# OR Lens showcase site

Static founder-facing project page for the surgical video evaluation pipeline.

## Preview

From this directory:

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Before deployment

1. Replace `replace-with-your-email@example.com` in `index.html`.
2. Add the final film at `assets/or-lens-project-film.mp4`.
3. Copy the Kaggle `outputs/` folder into the project, then run
   `python scripts/update_showcase_results.py` from the project root.
4. Add your preferred analytics and social preview metadata.
5. Deploy this directory to Cloudflare Pages, Netlify, Vercel, or GitHub Pages.

All current metric placeholders intentionally display `Training` until real
held-out results are available.
