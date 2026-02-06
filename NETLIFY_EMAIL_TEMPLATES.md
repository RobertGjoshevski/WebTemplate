# Netlify Identity Email Templates Configuration

## Why Configure Email Templates?

Since your site is hosted on GitHub Pages (`https://robertgjoshevski.github.io/WebTemplate`), but Netlify Identity is configured on your Netlify site, you need to update the email templates to point to the correct URLs.

## Which Templates to Configure

### 1. **Invitation Email** (Most Important) ✅
- **Purpose:** Sent when you invite a new user
- **Contains:** Invitation link with token
- **Action Required:** Update the redirect URL to point to GitHub Pages admin

### 2. **Recovery Email** (Important) ✅
- **Purpose:** Sent when user requests password reset
- **Contains:** Password reset link
- **Action Required:** Update the redirect URL to point to GitHub Pages admin

### 3. **Confirmation Email** (Optional)
- **Purpose:** Sent when user signs up (if registration is open)
- **Contains:** Email confirmation link
- **Action Required:** Update if you allow open registration

### 4. **Magic Link Email** (Optional)
- **Purpose:** Passwordless login link
- **Action Required:** Update if you use magic links

## How to Configure

### Step 1: Access Email Templates

1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Identity** → **Email templates**
3. You'll see all available templates

### Step 2: Update Invitation Email Template

1. Click on **Invitation email**
2. Find the invitation link in the template
3. Use relative path with `{{ .SiteURL }}` variable

**Default template might have:**
```
{{ .SiteURL }}/#invite_token={{ .Token }}
```

**Option 1: Using Site URL variable (if Site URL is set):**
```
{{ .SiteURL }}/#invite_token={{ .Token }}
```
(Requires Site URL to be set to `https://robertgjoshevski.github.io/WebTemplate/admin`)

**Option 2: Using full URL directly (no Site URL setting needed):**
```
https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token={{ .Token }}
```
(Works immediately, no Site URL setting required)

### Step 3: Update Recovery Email Template

1. Click on **Recovery email**
2. Find the recovery/reset link
3. Use relative path with `{{ .SiteURL }}` variable

**Default template might have:**
```
{{ .SiteURL }}/#recovery_token={{ .Token }}
```

**Option 1: Using Site URL variable (if Site URL is set):**
```
{{ .SiteURL }}/#recovery_token={{ .Token }}
```

**Option 2: Using full URL directly (no Site URL setting needed):**
```
https://robertgjoshevski.github.io/WebTemplate/admin/#recovery_token={{ .Token }}
```

### Step 4: Update Site URL Setting (Optional)

**Note:** If you can't find the Site URL setting, skip this and use full URLs in templates (see Step 2).

**If Site URL setting is available:**

1. Go to **Site settings** → **Identity** → **Settings**
2. Look for **Site URL**, **Application URL**, or **Site address**
3. Set to: `https://robertgjoshevski.github.io/WebTemplate/admin`
4. Save

**Option A:** Set Site URL to include `/admin`:
- Site URL: `https://robertgjoshevski.github.io/WebTemplate/admin`
- Template: `{{ .SiteURL }}/#invite_token={{ .Token }}`

**Option B:** Set Site URL to base domain:
- Site URL: `https://robertgjoshevski.github.io/WebTemplate`
- Template: `{{ .SiteURL }}/admin/#invite_token={{ .Token }}`

**If Site URL setting is NOT available:**
- Just use full URLs directly in templates (see Step 2)
- No Site URL setting needed!

## Template Variables Available

Netlify provides these variables in email templates:
- `{{ .SiteURL }}` - The site URL (update this in settings)
- `{{ .Token }}` - The invitation/recovery token
- `{{ .UserEmail }}` - User's email address
- `{{ .ConfirmationURL }}` - Confirmation URL (auto-generated)

## Example Templates

### Invitation Email Template (Using Relative Path)
```
Hi!

You've been invited to join {{ .SiteURL }}.

Click here to accept the invitation:
{{ .SiteURL }}/#invite_token={{ .Token }}

If you didn't expect this invitation, you can ignore this email.
```

**Note:** This assumes Site URL is set to `https://robertgjoshevski.github.io/WebTemplate/admin`

### Recovery Email Template (Using Relative Path)
```
Hi!

You requested a password reset for {{ .SiteURL }}.

Click here to reset your password:
{{ .SiteURL }}/#recovery_token={{ .Token }}

If you didn't request this, you can ignore this email.
```

**Note:** Same as above - uses `{{ .SiteURL }}` variable with relative path.

## Quick Setup Checklist

- [ ] Update **Site URL** in Identity Settings to GitHub Pages admin URL
- [ ] Update **Invitation email** template with correct URL
- [ ] Update **Recovery email** template with correct URL
- [ ] (Optional) Update **Confirmation email** if using open registration
- [ ] Test by sending a test invitation
- [ ] Test by requesting a password reset

## Testing

After configuring:

1. **Test Invitation:**
   - Send an invitation to yourself
   - Check email - link should point to GitHub Pages
   - Click link - should redirect to admin panel

2. **Test Recovery:**
   - Request password reset
   - Check email - link should point to GitHub Pages
   - Click link - should allow password reset on admin panel

## Important Notes

- **Site URL Setting:** This is the most important - update this first, as it affects all templates
- **Use Variables:** Always use `{{ .SiteURL }}` instead of hardcoded URLs for flexibility
- **Relative Paths:** Use relative paths like `/admin/#invite_token={{ .Token }}` with the Site URL variable
- **Token Handling:** The admin page already handles invite and recovery tokens automatically
- **HTTPS:** The `{{ .SiteURL }}` variable automatically includes `https://`

## Default Behavior

If you don't configure templates:
- Emails will use Netlify site URL (`serene-rugelach-9ae7b9.netlify.app`)
- Users will be redirected to empty Netlify page
- They'll need to manually navigate to GitHub Pages admin

**Recommendation:** Configure the templates to provide a better user experience.
