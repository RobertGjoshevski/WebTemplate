# Deployment Guide

This guide will walk you through deploying your static site to GitHub Pages and setting up Netlify Identity for the CMS admin panel.

## Prerequisites

- A GitHub account
- A Netlify account (free tier works)
- Your repository pushed to GitHub

## Part 1: Deploy to GitHub Pages

### Step 1: Update Astro Configuration

1. Open `astro.config.mjs`
2. Update the `site` and `base` values:
   ```js
   site: 'https://YOUR_USERNAME.github.io',
   base: '/YOUR_REPO_NAME', // Remove this line if using a custom domain
   ```
   
   **Examples:**
   - For `https://username.github.io/my-site`: 
     - `site: 'https://username.github.io'`
     - `base: '/my-site'`
   - For a custom domain or root GitHub Pages:
     - `site: 'https://yourdomain.com'`
     - Remove the `base` line entirely

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### Step 3: Push to GitHub

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build your Astro site
- Deploy it to GitHub Pages

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### Step 4: Verify Deployment

1. Go to **Actions** tab in your repository
2. Wait for the workflow to complete (usually 1-2 minutes)
3. Visit your site at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## Part 2: Setup Netlify Identity for CMS

The admin panel needs Netlify Identity for authentication. You can set this up even if your site is hosted on GitHub Pages.

### Step 1: Create a Netlify Site

1. Go to [Netlify](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**

**Note:** You don't need to use Netlify for hosting - this is just for the Identity service. You can disable auto-deploys or use it as a backup.

### Step 2: Enable Netlify Identity

1. In your Netlify site dashboard, go to **Identity**
2. Click **Enable Identity**
3. Under **Registration preferences**, choose:
   - **Open** (for testing) or **Invite only** (for production)
4. Click **Enable Identity**

### Step 3: Enable Git Gateway

1. Still in the **Identity** section, scroll down to **Services**
2. Click **Enable Git Gateway**
3. This allows the CMS to commit changes to your GitHub repository

### Step 4: Configure Identity Providers (Optional)

1. In **Identity** → **Settings**
2. You can configure:
   - **External providers**: Google, GitHub, etc.
   - **Email templates**: Customize invitation emails
   - **Registration**: Control who can sign up

### Step 5: Create Your First User

1. Go to **Identity** → **Invite users**
2. Enter an email address
3. Click **Invite**
4. Check your email and accept the invitation
5. Set your password

### Step 6: Update Admin Config for Production

1. Before deploying, update `public/admin/config.yml`:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   
   # Comment out or remove local_backend for production
   # local_backend: true
   ```

2. Also update `public/config.yml` (used by Decap CMS):
   ```yaml
   backend:
     name: git-gateway
     branch: main
   
   # local_backend: true  # Comment this out
   ```

3. Commit and push:
   ```bash
   git add public/admin/config.yml public/config.yml
   git commit -m "Configure CMS for production"
   git push origin main
   ```

### Step 7: Access the Admin Panel

1. Visit your deployed site: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/admin`
2. Click **Login with Netlify Identity**
3. Enter your credentials
4. You should now be able to edit content!

## Troubleshooting

### Admin Panel Shows 404

- Make sure `src/pages/admin.astro` exists
- Verify the config files are in `public/admin/config.yml` and `public/config.yml`

### Can't Login to Admin Panel

- Check that Netlify Identity is enabled
- Verify Git Gateway is enabled
- Make sure `local_backend: true` is commented out in production configs

### Changes Don't Save

- Verify Git Gateway has access to your repository
- Check that the branch name in `config.yml` matches your default branch
- Ensure you're logged in with Netlify Identity

### Site Not Deploying

- Check GitHub Actions logs for errors
- Verify `astro.config.mjs` has correct `site` and `base` values
- Ensure GitHub Pages is set to use **GitHub Actions** as the source

## Alternative: Custom Domain

If you want to use a custom domain:

1. Update `astro.config.mjs`:
   ```js
   site: 'https://yourdomain.com',
   // Remove the base line
   ```

2. Configure DNS:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`
   - Or use A records (check GitHub Pages docs)

3. In GitHub Pages settings, add your custom domain

## Quick Reference

**Local Development:**
```bash
npm run dev:cms  # With CMS backend
npm run dev      # Without CMS backend
```

**Production Build:**
```bash
npm run build    # Creates dist/ folder
```

**Deploy:**
```bash
git push origin main  # Auto-deploys via GitHub Actions
```

## Support

- [Astro Deployment Docs](https://docs.astro.build/en/guides/deploy/github/)
- [Netlify Identity Docs](https://docs.netlify.com/visitor-access/identity/)
- [Decap CMS Docs](https://decapcms.org/docs/)
