# R.M.D.T Consultancy Website

Premium static frontend for an independent third-party engineering QC, civil infrastructure auditing, material testing, structural verification, and compliance consultancy based in Kurnool, Andhra Pradesh.

## Project Structure

```text
rmdt-consultancy/
  index.html
  style.css
  script.js
  assets/
    images/
      hero-infrastructure.png
      rmdt-log.jpg
    icons/
    reports/
      sample-audit-report.pdf
```

## Features

- Sticky glassmorphism enterprise navbar with mobile menu
- Cinematic infrastructure hero with animated counters
- Services, overview, engineering metrics, timeline, testimonials, and emergency CTA
- Live mock tender tracker with filters, badges, progress bars, and sorting
- Material Test Certificate verification demo using `RMDT-QC-2026`
- IS-code compliance finder with live search
- Multi-step audit request form with validation, upload area, review step, and success modal
- Dark/light mode with `localStorage`
- Scroll progress indicator, reveal animations, WhatsApp button, and back-to-top control
- SEO-friendly semantic HTML and responsive CSS

## Beginner Setup

1. Open the `rmdt-consultancy` folder.
2. Double-click `index.html` to view the site in a browser.
3. For a cleaner local preview, run a small static server from this folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Logo Note

The uploaded logo is used from `assets/images/rmdt-log.jpg` in the navbar and footer. Replace that file with a sharper export later if available, keeping the same filename to avoid code changes.

## GitHub Upload Steps

```bash
git init
git add .
git commit -m "Build RMDT Consultancy website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rmdt-consultancy.git
git push -u origin main
```

## GitHub Pages Deployment

1. Push the project to GitHub.
2. Open the repository on GitHub.
3. Go to **Settings** > **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/root`.
6. Click **Save**.
7. GitHub will publish the website at:

```text
https://YOUR_USERNAME.github.io/rmdt-consultancy/
```

## Customization

- Update contact details in `index.html`.
- Replace mock project rows in `script.js`.
- Edit brand colors in the `:root` block of `style.css`.
- Replace `assets/reports/sample-audit-report.pdf` with a real sample report when available.
