# AI Platforms Technologies Website

Static website for:
- CKA (Certified Kubernetes Administrator) training
- AWS Certified Solutions Architect – Associate (SAA-C03) training
- Cloud Native Specialist (CKA + GitLab CI/CD Security & Observability)
- Cloud Engineering (AWS CloudOps with Terraform)

## 1) Run locally on Windows

Open [index.html](C:/Users/vivek/Documents/Co-Pilot/Website/index.html) directly in your browser.

You can also run a local static server (recommended):

```powershell
cd C:\Users\vivek\Documents\Co-Pilot\Website
python -m http.server 8080
```

Then open:
`http://localhost:8080`

## 2) Host on GitHub Pages

Yes, this can be hosted on GitHub.

### Option A: root domain with user/org pages
- Create repository named: `<your-github-username>.github.io`
- Push all files from this folder to that repo root
- GitHub serves it automatically

### Option B: project repository pages
- Create any repository (for example `website`)
- Push this folder content
- In GitHub repo:
  - **Settings → Pages**
  - **Source**: Deploy from branch
  - **Branch**: `main` and `/ (root)`

## 3) Use your custom domain

This project already includes [CNAME](C:/Users/vivek/Documents/Co-Pilot/Website/CNAME) with:
`aiplatformstechnologies.com`

In your domain DNS provider, add:
- `A` records for apex (`@`) to GitHub Pages IPs
- `CNAME` record for `www` to `<your-github-username>.github.io`

Typical GitHub Pages apex IPs (verify latest in GitHub docs):
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

After DNS propagation:
- In **GitHub → Settings → Pages**, set custom domain to `aiplatformstechnologies.com`
- Enable HTTPS

## 4) How to add or update tech blogs

All blog data is in [assets/script.js](C:/Users/vivek/Documents/Co-Pilot/Website/assets/script.js), in the `BLOG_POSTS` array.

Each post uses:
- `id`: unique slug
- `title`
- `date`: `YYYY-MM-DD`
- `category`
- `excerpt`
- `content`: HTML content string

### Add a new blog
1. Open [assets/script.js](C:/Users/vivek/Documents/Co-Pilot/Website/assets/script.js)
2. Add one new object inside `BLOG_POSTS`
3. Save and refresh [blogs.html](C:/Users/vivek/Documents/Co-Pilot/Website/blogs.html)

### Update an existing blog
1. Find the post by `id`
2. Edit title/date/category/excerpt/content
3. Save and refresh [blog-post.html](C:/Users/vivek/Documents/Co-Pilot/Website/blog-post.html)

## 5) Files overview

- [index.html](C:/Users/vivek/Documents/Co-Pilot/Website/index.html) - Home page
- [course-details.html](C:/Users/vivek/Documents/Co-Pilot/Website/course-details.html) - Full curriculum/details page for each course
- [blogs.html](C:/Users/vivek/Documents/Co-Pilot/Website/blogs.html) - Blog listing page
- [blog-post.html](C:/Users/vivek/Documents/Co-Pilot/Website/blog-post.html) - Blog details page
- [assets/styles.css](C:/Users/vivek/Documents/Co-Pilot/Website/assets/styles.css) - Styling
- [assets/script.js](C:/Users/vivek/Documents/Co-Pilot/Website/assets/script.js) - Blog + course detail content and rendering logic
- [assets/logos/](C:/Users/vivek/Documents/Co-Pilot/Website/assets/logos) - Kubernetes, CNCF, and AWS logo assets used across pages
- [CNAME](C:/Users/vivek/Documents/Co-Pilot/Website/CNAME) - Custom domain for GitHub Pages
