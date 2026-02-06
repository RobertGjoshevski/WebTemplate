# Netlify Identity Setup for GitHub Pages

Since your site is hosted on GitHub Pages but uses Netlify Identity for CMS authentication, you need to configure Netlify to allow your GitHub Pages domain.

## Step 1: Get Your Netlify Site URL

1. Go to your Netlify dashboard
2. Find your site (the one you created for Identity)
3. Copy the site URL (e.g., `https://your-site-name.netlify.app`)

## Step 2: Update Admin Page

1. Open `src/pages/admin.astro`
2. Find this line:
   ```js
   const netlifySiteUrl = 'https://YOUR_NETLIFY_SITE_URL.netlify.app';
   ```
3. Replace `YOUR_NETLIFY_SITE_URL` with your actual Netlify site name
4. Example: `const netlifySiteUrl = 'https://my-cms-site.netlify.app';`

## Step 3: Configure Netlify Identity External Providers

1. Go to your Netlify site dashboard
2. Navigate to **Identity** → **Settings** → **External providers**
3. Under **Registration**, enable **External providers**
4. Add your GitHub Pages domain to allowed origins:
   - Go to **Identity** → **Settings** → **Services**
   - Add `https://robertgjoshevski.github.io` to allowed origins
   - Or use wildcard: `https://*.github.io`

## Step 4: Alternative - Use Netlify Proxy

If CORS issues persist, you can use Netlify's proxy approach:

1. Create a `public/_redirects` file:
   ```
   /admin/*  https://your-netlify-site.netlify.app/admin/:splat  200
   ```

2. Or update the admin page to use the Netlify site directly for authentication

## Step 5: Update Config for Netlify Site URL

In `public/admin/config.yml`, you can also specify the Netlify site URL:

```yaml
backend:
  name: git-gateway
  branch: main
  # Add your Netlify site URL if needed
  # site_url: https://your-netlify-site.netlify.app
```

## Troubleshooting

### CORS Error
- Make sure you've added your GitHub Pages domain to Netlify Identity allowed origins
- Verify the Netlify site URL in `admin.astro` is correct

### Can't Login
- Check that Netlify Identity is enabled
- Verify you've created a user and accepted the invitation
- Check browser console for errors

### Admin Page Shows "Loading..."
- Verify `config.yml` is accessible at `/WebTemplate/admin/config.yml`
- Check that `public_folder` in config includes the base path: `/WebTemplate/images/uploads`
