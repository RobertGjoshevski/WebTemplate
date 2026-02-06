# Fixing Netlify Identity for GitHub Pages

Since your site is hosted on GitHub Pages (`https://robertgjoshevski.github.io/WebTemplate`), you need to configure Netlify Identity to work with your GitHub Pages domain.

## The Problem

Netlify Identity widget has CORS restrictions. When hosted on GitHub Pages, it needs to know which Netlify site to authenticate with.

## Solution: Configure Netlify Site URL in Config

### Step 1: Find Your Netlify Site URL

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Find the site you created for Identity/Git Gateway
3. Copy the site URL (e.g., `https://your-site-name.netlify.app`)

### Step 2: Update Admin Config

Open `public/admin/config.yml` and add your Netlify site URL:

```yaml
backend:
  name: git-gateway
  branch: main
  # Add your Netlify site URL here
  site_url: https://your-site-name.netlify.app

# ... rest of config
```

### Step 3: Update Admin Page Script

The admin page needs to know which Netlify site to connect to. We'll update it to use your Netlify site URL.

### Step 4: Configure Netlify Identity (Alternative Method)

If the above doesn't work, try this approach:

1. Go to your Netlify site dashboard
2. Navigate to **Identity** → **Settings**
3. Look for **Site URL** or **Application URL**
4. Set it to: `https://robertgjoshevski.github.io/WebTemplate`
5. Under **Registration**, you can set it to "Invite only" or "Open"

### Step 5: Enable Git Gateway

1. Go to **Identity** → **Services**
2. Make sure **Git Gateway** is enabled
3. It should show your repository is connected

## Alternative: Use Netlify Proxy (Advanced)

If CORS issues persist, you can proxy the Identity requests through your Netlify site:

1. Create a `public/_redirects` file in your Netlify site (not GitHub Pages)
2. Add redirects for Identity endpoints

But this is more complex and usually not needed.

## Quick Test

After updating the config:

1. Commit and push changes
2. Wait for GitHub Pages to rebuild
3. Visit `https://robertgjoshevski.github.io/WebTemplate/admin`
4. You should see the login form
5. Click "Login with Netlify Identity"
6. Enter your Netlify Identity credentials

## Troubleshooting

**Still seeing CORS errors?**
- Make sure `site_url` in config.yml matches your Netlify site URL exactly
- Check browser console for specific error messages
- Verify Git Gateway is enabled in Netlify

**Can't find where to set Site URL?**
- Netlify UI may have changed
- Try looking under **Site settings** → **Identity** → **Settings**
- Or check **Site settings** → **General** → **Site details**
