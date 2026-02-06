# Final Solution: Netlify Email Templates with GitHub Pages

## The Problem

- Netlify email templates require **relative paths** (can't use absolute URLs)
- `{{ .SiteURL }}` is automatically set to your Netlify site (`serene-rugelach-9ae7b9.netlify.app`)
- You can't change `{{ .SiteURL }}` to point to GitHub Pages
- Links need to go to GitHub Pages admin panel

## The Solution: Two-Part Fix

### Part 1: Update Email Template Paths

Since `{{ .SiteURL }}` will always be the Netlify site, update templates to use `/admin`:

**Invitation Template:**
```
{{ .SiteURL }}/admin/#invite_token={{ .Token }}
```

**Recovery Template:**
```
{{ .SiteURL }}/admin/#recovery_token={{ .Token }}
```

This makes links go to: `https://serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=...`

### Part 2: Create Redirect Page on Netlify Site

Create an admin page on your Netlify site that redirects to GitHub Pages:

1. **In your Netlify site** (not GitHub repo), create `public/admin/index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Redirecting...</title>
  <script>
    // Redirect to GitHub Pages admin with any hash tokens
    const hash = window.location.hash;
    const githubPagesUrl = 'https://robertgjoshevski.github.io/WebTemplate/admin';
    
    if (hash) {
      // Preserve invite_token, recovery_token, etc.
      window.location.href = githubPagesUrl + hash;
    } else {
      window.location.href = githubPagesUrl;
    }
  </script>
</head>
<body>
  <p>Redirecting to admin panel...</p>
  <p>If you are not redirected, <a href="https://robertgjoshevski.github.io/WebTemplate/admin">click here</a>.</p>
</body>
</html>
```

2. **Deploy this to your Netlify site**

**Note:** This file needs to be in your Netlify site's repository, not your GitHub Pages repository. You can:
- Create a separate repo for the Netlify redirect site
- Or add it to your existing repo and configure Netlify to deploy from a specific folder

## How It Works

1. User clicks email link → Goes to `serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=...`
2. Netlify site's `/admin/index.html` loads → JavaScript redirects to GitHub Pages
3. GitHub Pages admin page loads → Handles the token automatically

## Alternative: Update Templates to Use Full Path

If Netlify allows it in some contexts, you might be able to use:

```
/admin/#invite_token={{ .Token }}
```

And set Site URL to GitHub Pages in a different setting. But based on what we've seen, the redirect solution is most reliable.

## Quick Steps

1. **Update Invitation template** in Netlify:
   - Path: `{{ .SiteURL }}/admin/#invite_token={{ .Token }}`

2. **Update Recovery template** in Netlify:
   - Path: `{{ .SiteURL }}/admin/#recovery_token={{ .Token }}`
   - (Already has `/admin`, just verify it)

3. **Create redirect page** on Netlify site:
   - File: `public/admin/index.html`
   - Content: Redirect script (see above)
   - Deploy to Netlify

4. **Test:**
   - Send invitation
   - Click link → Should redirect to GitHub Pages
   - Token should be handled automatically
