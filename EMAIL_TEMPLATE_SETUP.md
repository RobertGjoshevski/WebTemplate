# Email Template Setup - Quick Guide

## ✅ Current Status

- Redirect is working: `https://serene-rugelach-9ae7b9.netlify.app/admin` → GitHub Pages ✅
- Email templates need to be updated to use the correct URL format

## 🔧 What You Need to Do

### Step 1: Update Invitation Email Template

1. Go to Netlify Dashboard: https://app.netlify.com/sites/serene-rugelach-9ae7b9/configuration/identity
2. Click **Emails** tab
3. Click **Invitation email**
4. Find the invitation link in the template
5. Update it to use:

```
{{ .SiteURL }}/admin/#invite_token={{ .Token }}
```

**Important:** Since `{{ .SiteURL }}` resolves to your Netlify site URL (`serene-rugelach-9ae7b9.netlify.app`), this will create:
- `https://serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=...`

Which will then automatically redirect to GitHub Pages via our redirect setup!

6. Click **Save**

### Step 2: Update Recovery Email Template

1. Still in **Emails** tab
2. Click **Recovery email**
3. Find the recovery/reset link
4. Update it to:

```
{{ .SiteURL }}/admin/#recovery_token={{ .Token }}
```

5. Click **Save**

### Step 3: Send a NEW Invitation

**Important:** Old invitation emails won't work! You need to send a new one.

1. Go to **Identity** → **Users**
2. Invite the user again (or resend invitation)
3. The new email will have the correct link format
4. When clicked, it will:
   - Go to: `serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=...`
   - Redirect to: `robertgjoshevski.github.io/WebTemplate/admin/#invite_token=...`
   - Automatically accept the invitation

## 📋 Example Email Template

Here's what your Invitation email template should look like:

```
Hi!

You've been invited to join the content management system.

Click here to accept the invitation:
{{ .SiteURL }}/admin/#invite_token={{ .Token }}

This link will expire in 7 days.

If you didn't expect this invitation, you can ignore this email.
```

## 🧪 Testing

After updating templates:

1. **Send a test invitation** to yourself
2. **Check the email** - the link should be: `serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=...`
3. **Click the link** - should redirect to GitHub Pages and automatically accept the invitation

## ❓ Why Old Invitations Don't Work

Old invitation emails were sent with the old URL format (probably pointing directly to Netlify site root). The new redirect setup requires the link to go through `/admin` path, so old emails won't redirect correctly.

**Solution:** Just send a new invitation after updating the templates!

## 🔍 Troubleshooting

**Email link doesn't redirect?**
- Make sure template uses: `{{ .SiteURL }}/admin/#invite_token={{ .Token }}`
- Check that you sent a NEW invitation (old ones won't work)
- Verify redirect is working: visit `serene-rugelach-9ae7b9.netlify.app/admin` manually

**Redirect works but invitation not accepted?**
- Check browser console for errors
- Make sure the hash (`#invite_token=...`) is preserved in the URL
- The admin page should automatically handle the token
