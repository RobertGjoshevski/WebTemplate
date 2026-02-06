# Fixing Admin Panel 404 Error

## What Was Fixed

1. **Script Tag**: Updated to use `is:inline` directive so the Netlify URL renders correctly
2. **Config Files**: Added `site_url` to both config files pointing to your Netlify site
3. **Netlify Identity**: Now loads from your Netlify site instead of generic endpoint

## Changes Made

### 1. `src/pages/admin.astro`
- Added `is:inline` to script tag so Netlify URL renders properly
- Script now loads from: `https://serene-rugelach-9ae7b9.netlify.app/.netlify/identity`

### 2. `public/admin/config.yml` and `public/config.yml`
- Added `site_url: https://serene-rugelach-9ae7b9.netlify.app`
- This tells Decap CMS which Netlify site to use for Git Gateway

## Next Steps

1. **Commit and push these changes:**
   ```bash
   git add .
   git commit -m "Fix admin panel - add Netlify site_url to config"
   git push origin main
   ```

2. **Wait for GitHub Pages to rebuild** (check Actions tab)

3. **Test the admin panel:**
   - Visit: `https://robertgjoshevski.github.io/WebTemplate/admin`
   - You should see the login form
   - Click "Login with Netlify Identity"
   - Enter your Netlify Identity credentials

## If You Still See 404

### Check 1: Verify Config is Accessible
Visit: `https://robertgjoshevski.github.io/WebTemplate/admin/config.yml`
- Should show the YAML config file
- If 404, the file might not be deployed

### Check 2: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any 404 errors
4. Check which file is returning 404

### Check 3: Verify Netlify Identity
1. Go to your Netlify dashboard
2. Check that Identity is enabled
3. Verify Git Gateway is enabled and connected to your repo
4. Make sure you've created a user (Identity → Invite users)

### Check 4: Check GitHub Actions
1. Go to your repository → Actions tab
2. Check if the latest deployment succeeded
3. Look for any build errors

## Common Issues

**404 on config.yml:**
- Make sure `public/admin/config.yml` exists
- Verify it's committed to git
- Check that GitHub Pages deployment includes it

**CORS errors:**
- The script should now load from your Netlify site
- If still seeing CORS, verify the Netlify site URL is correct

**Can't login:**
- Make sure Netlify Identity is enabled
- Verify you've accepted the invitation email
- Check that Git Gateway is connected to your repository
