# Fixing Email Links Redirecting to Netlify Site

## Problem
Email links (invitation/recovery) are redirecting to:
`https://serene-rugelach-9ae7b9.netlify.app/#recovery_token=...`

But your site is hosted on GitHub Pages, so users see the wrong page.

## Solution: Two-Part Fix

### Part 1: Update Email Templates (Primary Solution)

**This is the proper fix** - update Netlify email templates to point to GitHub Pages:

1. Go to **Netlify Dashboard** → **Site settings** → **Identity** → **Email templates**
2. Update **Invitation email** template:
   ```
   {{ .SiteURL }}/#invite_token={{ .Token }}
   ```
   Make sure Site URL is set to: `https://robertgjoshevski.github.io/WebTemplate/admin`

3. Update **Recovery email** template:
   ```
   {{ .SiteURL }}/#recovery_token={{ .Token }}
   ```

4. **Important:** Set Site URL in **Identity** → **Settings**:
   - Site URL: `https://robertgjoshevski.github.io/WebTemplate/admin`

### Part 2: Create Redirect Page on Netlify Site (Fallback)

If email templates still point to Netlify (or as a backup), create a redirect page:

1. **In your Netlify site** (not GitHub Pages), create `public/index.html`:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta charset="utf-8" />
     <title>Redirecting...</title>
     <script>
       const hash = window.location.hash;
       const githubPagesUrl = 'https://robertgjoshevski.github.io/WebTemplate/admin';
       
       if (hash) {
         window.location.href = githubPagesUrl + hash;
       } else {
         window.location.href = githubPagesUrl;
       }
     </script>
   </head>
   <body>
     <p>Redirecting to admin panel...</p>
   </body>
   </html>
   ```

2. Deploy this to your Netlify site

**Note:** This file (`public/netlify-redirect.html`) is included in your repo as a reference, but you need to deploy it to your Netlify site separately.

## Why Both Solutions?

- **Part 1 (Email Templates):** Fixes the root cause - emails will link directly to GitHub Pages
- **Part 2 (Redirect Page):** Provides a fallback for any old email links or if templates aren't updated yet

## Admin Page Updates

The admin page (`src/pages/admin.astro`) has been updated to handle:
- ✅ `invite_token` - automatically accepts invitations
- ✅ `recovery_token` - shows password reset form

## Testing

1. **Test Invitation:**
   - Send invitation email
   - Click link - should go to GitHub Pages admin
   - Token should be accepted automatically

2. **Test Recovery:**
   - Request password reset
   - Click link - should go to GitHub Pages admin
   - Password reset form should appear

## Quick Fix Checklist

- [ ] Update Site URL in Netlify Identity Settings
- [ ] Update Invitation email template
- [ ] Update Recovery email template
- [ ] (Optional) Deploy redirect page to Netlify site
- [ ] Test with new invitation
- [ ] Test with password reset

## Current Status

✅ Admin page handles both invite and recovery tokens
✅ Redirect page template created (deploy to Netlify)
⏳ Email templates need to be updated in Netlify dashboard
