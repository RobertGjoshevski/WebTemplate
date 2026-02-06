# Fix: Netlify Admin Redirect Not Working

## Problem

When visiting `https://serene-rugelach-9ae7b9.netlify.app/admin`, it shows the Decap CMS admin panel instead of redirecting to GitHub Pages.

## Root Cause

Netlify builds your Astro site, which creates `dist/admin/index.html` from `src/pages/admin.astro`. This built file takes precedence over the redirect file in `public/admin/index.html`.

## Solution

We're using a two-part approach:

1. **Netlify redirect rules** (`netlify.toml`) - Redirect `/admin` requests to a special redirect page
2. **JavaScript redirect page** (`public/admin-redirect.html`) - Handles the actual redirect with hash preservation

### Why This Works

- Netlify's server-side redirects don't preserve hash fragments (`#invite_token=...`)
- Hash fragments are client-side only and never sent to the server
- So we redirect to a static HTML page that uses JavaScript to preserve the hash

## Files Changed

1. **`netlify.toml`** - Added redirect rules
2. **`public/admin-redirect.html`** - New redirect page with JavaScript

## Next Steps

1. **Commit and push:**
   ```bash
   git add netlify.toml public/admin-redirect.html
   git commit -m "Fix Netlify admin redirect with hash preservation"
   git push origin main
   ```

2. **Wait for Netlify to deploy** (check Deploys tab)

3. **Test the redirect:**
   - Visit: `https://serene-rugelach-9ae7b9.netlify.app/admin`
   - Should redirect to: `https://robertgjoshevski.github.io/WebTemplate/admin`

4. **Test with hash:**
   - Visit: `https://serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=test123`
   - Should redirect to: `https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token=test123`

## How It Works

1. User visits: `serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=abc123`
2. Netlify redirect rule catches `/admin` → redirects to `/admin-redirect.html` (status 200, so hash is preserved)
3. Browser loads `/admin-redirect.html#invite_token=abc123`
4. JavaScript reads the hash and redirects to: `robertgjoshevski.github.io/WebTemplate/admin#invite_token=abc123`
5. GitHub Pages admin page handles the token

## Important Notes

- The redirect file is at `public/admin-redirect.html` (not in `admin/` folder)
- Netlify will copy it to `dist/admin-redirect.html` during build
- The `netlify.toml` redirect rules run BEFORE any files are served
- Using `status = 200` instead of `301` ensures the hash fragment is preserved
