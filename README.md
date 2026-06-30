# Sahad Muhammed Villan portfolio

## Local preview

```powershell
cd portfolio
python -m http.server 4173
```

Open `http://localhost:4173`.

## Content structure

- `data/profile.json` drives project cards, profile copy, and the experience timeline.
- `projects/or-lens/` contains the complete OR Lens case study.
- The other folders in `projects/` contain focused medical-AI case studies.

## Privacy boundary

Original CV, degree, reference, and experience PDFs are stored in the workspace-level `source_documents/` folder, outside this deployable website. The public page uses verified summaries only. Do not copy an original document into `portfolio/` without first removing signatures, addresses, dates of birth, phone numbers, matriculation numbers, and third-party contact details.

## Publishing

Deploy the contents of this `portfolio/` directory to a static host such as GitHub Pages, Cloudflare Pages, or Netlify. Add approved screenshots and project videos when the source artifacts are ready.
