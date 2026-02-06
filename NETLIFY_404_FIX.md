# Fix: Netlify 404 Error

## Problem

Getting "Page not found" error when accessing admin redirect on Netlify.

## Possible Causes

1. **`netlify.toml` not deployed** - File needs to be committed and pushed
2. **Netlify not reading redirect rules** - May need to verify configuration
3. **File path issue** - Redirect file might not be accessible

## Solution Steps

### Step 1: Verify Files Are Committed

Make sure these files are committed and pushed:

```bash
git status
```

You should see:
- ✅ `netlify.toml` - Netlify configuration
- ✅ `public/admin-redirect.html` - Redirect page
- ✅ `src/layouts/BaseLayout.astro` - Homepage redirect script

If any are missing, add them:

```bash
git add netlify.toml public/admin-redirect.html src/layouts/BaseLayout.astro
git commit -m "Add Netlify redirect configuration"
git push origin main
```

### Step 2: Check Netlify Build Settings

1. Go to: https://app.netlify.com/sites/serene-rugelach-9ae7b9/configuration/build
2. Verify:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** (leave empty or set to root)

### Step 3: Verify Redirect Rules

1. Go to: https://app.netlify.com/sites/serene-rugelach-9ae7b9/configuration/redirects
2. You should see redirect rules (either from `netlify.toml` or manually added):
   - `/admin` → `/admin-redirect.html` (200)
   - `/admin/*` → `/admin-redirect.html` (200)

### Step 4: Alternative - Use Netlify UI Redirects

If `netlify.toml` isn't working, add redirects manually:

1. Go to: **Site settings** → **Redirects and rewrites**
2. Click **New rule**
3. Add:
   - **From:** `/admin`
   - **To:** `/admin-redirect.html`
   - **Status:** `200`
   - **Force:** `true`
4. Add second rule:
   - **From:** `/admin/*`
   - **To:** `/admin-redirect.html`
   - **Status:** `200`
   - **Force:** `true`

### Step 5: Trigger New Deployment

After making changes:

1. Go to: **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete

## Testing

After deployment:

1. **Test redirect:**
   - Visit: `https://serene-rugelach-9ae7b9.netlify.app/admin`
   - Should redirect to GitHub Pages admin

2. **Test with token:**
   - Visit: `https://serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=test`
   - Should redirect to GitHub Pages with token

3. **Test root with token:**
   - Visit: `https://serene-rugelach-9ae7b9.netlify.app/#invite_token=test`
   - Should redirect to admin, then to GitHub Pages

## Troubleshooting

**Still getting 404?**
- Check Netlify deploy logs for errors
- Verify `admin-redirect.html` exists in `dist/` after build
- Check that `netlify.toml` is in the repository root
- Try accessing `/admin-redirect.html` directly to verify file exists

**Redirect not working?**
- Check Netlify redirects page to see if rules are active
- Verify redirect rules are correct (status 200, not 301)
- Clear browser cache and try again

**File not found?**
- Verify `public/admin-redirect.html` exists
- Check that Astro build copies it to `dist/admin-redirect.html`
- Look at Netlify build logs to see if file is copied

## Quick Fix

If nothing works, you can also use the homepage redirect (already added to `BaseLayout.astro`):

- Root path with token: `/#invite_token=...` → Redirects to admin automatically
- Admin path: `/admin/#invite_token=...` → Should redirect via Netlify rules

The homepage redirect will catch any tokens and redirect to admin, so even if Netlify redirects don't work, the JavaScript redirect will handle it.
