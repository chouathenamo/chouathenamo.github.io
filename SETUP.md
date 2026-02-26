# Website Setup Instructions

## Files to replace in your repo

Replace/add the following files in your `chouathenamo.github.io` repo:

| File | Action |
|------|--------|
| `_config.yml` | **Replace** existing |
| `_includes/head.html` | **Replace** existing |
| `_includes/sidebar.html` | **Replace** existing |
| `_layouts/default.html` | **Replace** existing |
| `_layouts/page.html` | **Replace** existing |
| `_layouts/post.html` | **Replace** existing |
| `index.html` | **Replace** existing |
| `publications/index.html` | **Create** new folder + file |
| `presentations/index.html` | **Create** new folder + file |
| `cv/index.html` | **Create** new folder + file |
| `misc/index.html` | **Create** new folder + file |
| `public/css/custom.css` | **Create** new file |
| `_posts/2026-02-19-spie-landmark-detection.md` | **Replace** any existing posts |

---

## Assets you need to add manually

### 1. Your profile photo
- Path: `public/img/profile.jpg`
- Recommended: square crop (e.g. 400×400px), JPEG or PNG

### 2. Your CV PDF
- Path: `public/cv/AthenaMo_CV.pdf`
- This is the PDF you already have

### 3. Update your social links in `_config.yml`
Open `_config.yml` and fill in your actual URLs:
```yaml
social:
  github:   https://github.com/chouathenamo
  linkedin: https://linkedin.com/in/YOUR-ACTUAL-LINKEDIN-SLUG
  scholar:  https://scholar.google.com/citations?user=YOUR-ID
  arxiv:    https://arxiv.org/search/?query=Chou+Mo&searchtype=author
```

---

## How to add a new publication

Open `publications/index.html` and copy this block inside the appropriate year group:

```html
<div class="pub-item">
  <div class="pub-venue-badge badge-conference">VENUE</div>
  <div class="pub-content">
    <div class="pub-title">Paper Title Here</div>
    <div class="pub-authors"><strong>Chou Mo</strong>, Co-Author Name</div>
    <div class="pub-venue"><em>Conference Name</em>, Year</div>
    <div class="pub-buttons">
      <a href="https://..." class="pub-btn" target="_blank">Paper</a>
      <a href="https://..." class="pub-btn" target="_blank">arXiv</a>
    </div>
  </div>
</div>
```

Badge classes: `badge-conference`, `badge-journal`, `badge-workshop`, `badge-preprint`

---

## How to add a new presentation

Create a file in `_posts/` named `YYYY-MM-DD-short-title.md`:

```markdown
---
layout: post
title: "Your Presentation Title"
date: 2026-01-01
venue: "Conference Name"
location: "City, Country"
description: "Short description shown on the listing page."
image: public/img/presentations/optional-photo.jpg
links:
  paper: https://...
  slides: https://...
---

Write the full text of your presentation page here in Markdown.
```

---

## Deleting old blog posts

Delete everything in `_posts/` and replace with only presentation files.
Also delete `atom.xml` if you don't want an RSS feed.
