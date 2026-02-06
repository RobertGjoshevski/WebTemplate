# Fixing "Path must be relative" Error in Netlify Email Templates

## The Problem

Netlify email templates require **relative paths**, not absolute URLs. You're getting this error because you're trying to use a full URL.

## Solution: Set Site URL First, Then Use Relative Paths

Since templates require relative paths, you **must** set the Site URL setting. Here's how to find it:

## Finding Site URL Setting

### Method 1: Identity Settings (Most Common)

1. Go to **Netlify Dashboard**
2. Click your site (`serene-rugelach-9ae7b9`)
3. **Site settings** (gear icon) → **Identity** → **Settings** tab
4. Scroll down - look for:
   - **Site URL**
   - **Application URL** 
   - **Redirect URL**
   - **Base URL**

### Method 2: Identity → Services

1. **Site settings** → **Identity** → **Services** tab
2. Look for URL configuration near Git Gateway settings

### Method 3: General Settings

1. **Site settings** → **General** tab
2. Look in **Site details** section
3. Find **Site URL** or **Primary domain**

### Method 4: Environment Variables

1. **Site settings** → **Build & deploy** → **Environment**
2. Check if there's a `SITE_URL` or `URL` variable

## Once You Find Site URL

Set it to:
```
https://robertgjoshevski.github.io/WebTemplate/admin
```

**Important:** Include `/admin` in the Site URL!

## Then Update Email Templates with Relative Paths

### Invitation Email Template

Use this relative path:
```
/#invite_token={{ .Token }}
```

**Full example:**
```
Hi!

You've been invited to join the admin panel.

Click here to accept:
/#invite_token={{ .Token }}

If you didn't expect this, ignore this email.
```

### Recovery Email Template

Use this relative path:
```
/#recovery_token={{ .Token }}
```

**Full example:**
```
Hi!

You requested a password reset.

Click here to reset your password:
/#recovery_token={{ .Token }}

If you didn't request this, ignore this email.
```

## How It Works

1. **Site URL** = `https://robertgjoshevski.github.io/WebTemplate/admin`
2. **Template uses:** `/#invite_token={{ .Token }}`
3. **Result:** `https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token=...`

The Site URL + relative path = full URL!

## Alternative: Check Email Template Documentation

If you still can't find Site URL:

1. In the email template editor, look for:
   - A "Settings" button
   - A "Configure" link
   - An "Advanced" section
   - Help text or tooltips

2. The Site URL might be set at the **site level**, not in Identity:
   - Check **Site settings** → **General** → **Site information**
   - Look for **Site URL** or **Primary domain**

## Quick Checklist

- [ ] Find Site URL setting (try all 4 methods above)
- [ ] Set Site URL to: `https://robertgjoshevski.github.io/WebTemplate/admin`
- [ ] Update Invitation template: Use `/#invite_token={{ .Token }}`
- [ ] Update Recovery template: Use `/#recovery_token={{ .Token }}`
- [ ] Test by sending invitation

## If Site URL Still Not Found

If you absolutely cannot find the Site URL setting:

1. Contact Netlify support - they can help locate it
2. Check if your Netlify plan includes this feature
3. The setting might be in a different location in newer Netlify UI

## Testing

After setting Site URL and updating templates:
1. Send test invitation
2. Check email - link should be: `https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token=...`
3. Click link - should work!
