# Netlify Identity Quick Configuration Guide

Based on [Netlify Identity Documentation](https://docs.netlify.com/manage/security/secure-access-to-sites/identity/registration-login/)

## Key Settings Location

According to Netlify's documentation, navigate to:
**Project configuration > Identity**

This is accessible via:
1. Netlify Dashboard
2. Your Site
3. **Site settings** (gear icon)
4. **Identity** (left sidebar)

## What You Need to Configure

### 1. Email Templates (Most Important)

**Location:** `Project configuration > Identity > Emails`

According to the docs, email templates are configured here. You need to update:

- **Invitation template** - Used when you invite users
- **Recovery template** - Used for password resets
- **Confirmation template** - Used for email confirmation (if needed)

**Update these templates to use:**
```
https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token={{ .Token }}
```

### 2. Registration Preferences

**Location:** `Project configuration > Identity > Registration > Registration preferences`

- Set to **Invite only** (recommended for CMS)
- This ensures only invited users can access the admin panel

### 3. External Providers (Optional)

**Location:** `Project configuration > Identity > Registration > External providers`

- You can enable Google, GitHub, etc. for login
- Not required for basic CMS setup

## Finding Site URL Setting

The Site URL setting might be in:

**Option 1:** `Project configuration > Identity > Settings`
- Look for "Site URL", "Application URL", or "Redirect URL"

**Option 2:** `Project configuration > Identity > Emails > Settings`
- Sometimes URL settings are near email configuration

**Option 3:** Not visible in your Netlify version
- If you can't find it, just use full URLs in email templates (works fine!)

## Quick Fix Without Site URL

If you can't find Site URL setting, just update email templates directly:

1. Go to: **Site settings** → **Identity** → **Email templates**
2. **Invitation email:** Use full URL:
   ```
   https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token={{ .Token }}
   ```
3. **Recovery email:** Use full URL:
   ```
   https://robertgjoshevski.github.io/WebTemplate/admin/#recovery_token={{ .Token }}
   ```

## Navigation Path Reference

Based on Netlify docs, the navigation paths are:
- `Project configuration > Identity > Registration` - Registration settings
- `Project configuration > Identity > Users` - Invite users
- `Project configuration > Identity > Emails` - Email templates
- `Project configuration > Identity > Settings` - General settings (may contain Site URL)

## Current Setup Status

✅ Admin page handles invite and recovery tokens
✅ Navigation links fixed
⏳ Email templates need updating (use full URLs if Site URL not found)

## Next Steps

1. Go to **Site settings** → **Identity** → **Email templates**
2. Update Invitation and Recovery templates with GitHub Pages URLs
3. Test by sending an invitation
4. Verify link goes to GitHub Pages admin panel
