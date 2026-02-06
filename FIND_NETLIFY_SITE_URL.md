# Finding Site URL Setting in Netlify

## Where to Look

The Site URL setting location can vary. Try these locations:

### Option 1: Identity Settings
1. Go to **Netlify Dashboard**
2. Click on your site (`serene-rugelach-9ae7b9`)
3. Go to **Site settings** (gear icon in top right)
4. Click **Identity** in the left sidebar
5. Click **Settings** tab
6. Look for:
   - **Site URL**
   - **Application URL**
   - **Site address**
   - **Redirect URL**

### Option 2: General Site Settings
1. Go to **Site settings**
2. Click **General** tab
3. Look for **Site details** section
4. Find **Site URL** or **Primary domain**

### Option 3: Identity → Services
1. Go to **Site settings** → **Identity**
2. Click **Services** tab
3. Look for URL settings related to Git Gateway

## If You Can't Find It

If the Site URL setting isn't visible, you can still fix the email templates:

### Alternative: Update Email Templates Directly

Instead of relying on `{{ .SiteURL }}`, use the full GitHub Pages URL directly in templates:

1. Go to **Site settings** → **Identity** → **Email templates**
2. Click **Invitation email**
3. Replace the link with:
   ```
   https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token={{ .Token }}
   ```
4. Click **Recovery email**
5. Replace the link with:
   ```
   https://robertgjoshevski.github.io/WebTemplate/admin/#recovery_token={{ .Token }}
   ```

This works even without setting Site URL!

## What the Email Templates Should Look Like

### Invitation Email Template
```
Hi!

You've been invited to join the admin panel.

Click here to accept the invitation:
https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token={{ .Token }}

If you didn't expect this invitation, you can ignore this email.
```

### Recovery Email Template
```
Hi!

You requested a password reset.

Click here to reset your password:
https://robertgjoshevski.github.io/WebTemplate/admin/#recovery_token={{ .Token }}

If you didn't request this, you can ignore this email.
```

## Quick Fix (No Site URL Needed)

**Just update the email templates directly:**

1. **Netlify Dashboard** → Your Site → **Site settings** → **Identity** → **Email templates**
2. **Invitation email**: Replace link with `https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token={{ .Token }}`
3. **Recovery email**: Replace link with `https://robertgjoshevski.github.io/WebTemplate/admin/#recovery_token={{ .Token }}`
4. **Save** both templates

That's it! No Site URL setting needed.

## Screenshot Locations

If you're still having trouble, the Site URL might be in:
- **Identity** → **Settings** → Scroll down to find URL fields
- **Identity** → **External providers** → Look for redirect URLs
- **Build & deploy** → **Environment variables** → Check for URL variables

## Testing

After updating templates:
1. Send a test invitation
2. Check the email - link should be: `https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token=...`
3. Click link - should go to GitHub Pages admin panel
