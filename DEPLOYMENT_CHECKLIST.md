# Deployment Checklist

Use this checklist to ensure everything is set up correctly before deploying.

## Pre-Deployment

- [ ] Update `astro.config.mjs`:
  - [ ] Set `site` to your GitHub Pages URL (e.g., `https://username.github.io`)
  - [ ] Set `base` to your repository name (e.g., `/repo-name`)
  - [ ] Or remove `base` if using a custom domain

- [ ] Update CMS config for production:
  - [ ] Comment out `local_backend: true` in `public/admin/config.yml`
  - [ ] Comment out `local_backend: true` in `public/config.yml`
  - [ ] Or run: `npm run prepare:production`

- [ ] Test local build:
  ```bash
  npm run build
  npm run preview
  ```

## GitHub Setup

- [ ] Repository is pushed to GitHub
- [ ] GitHub Pages is enabled:
  - [ ] Go to Settings → Pages
  - [ ] Source: Select "GitHub Actions"
- [ ] Verify `.github/workflows/deploy.yml` exists

## Netlify Setup (for CMS)

- [ ] Created Netlify account
- [ ] Created Netlify site (connected to GitHub repo)
- [ ] Enabled Netlify Identity:
  - [ ] Go to Identity → Enable Identity
  - [ ] Set registration preferences
- [ ] Enabled Git Gateway:
  - [ ] Go to Identity → Services → Enable Git Gateway
- [ ] Created first user:
  - [ ] Go to Identity → Invite users
  - [ ] Sent invitation and accepted it

## Post-Deployment

- [ ] Site is accessible at GitHub Pages URL
- [ ] Admin panel loads at `/admin`
- [ ] Can login with Netlify Identity
- [ ] Can create/edit blog posts
- [ ] Changes are committed to GitHub repository

## Troubleshooting

If something doesn't work:

1. **Site not deploying:**
   - Check GitHub Actions logs
   - Verify `astro.config.mjs` settings
   - Ensure GitHub Pages source is "GitHub Actions"

2. **Admin panel not working:**
   - Verify `local_backend: true` is commented out
   - Check Netlify Identity is enabled
   - Verify Git Gateway is enabled
   - Check browser console for errors

3. **Can't login:**
   - Verify you've accepted the Netlify Identity invitation
   - Check email for invitation link
   - Try creating a new user invitation

## Quick Commands

```bash
# Prepare for production
npm run prepare:production

# Build locally
npm run build

# Preview build
npm run preview

# Deploy (push to GitHub)
git add .
git commit -m "Deploy to production"
git push origin main
```
