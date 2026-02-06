# Correct Email Template URLs

## ⚠️ Important: Netlify vs GitHub Pages URLs

Your site has **two different URLs**:
- **Netlify:** `serene-rugelach-9ae7b9.netlify.app` (NO `/WebTemplate` path)
- **GitHub Pages:** `robertgjoshevski.github.io/WebTemplate` (WITH `/WebTemplate` path)

## ✅ Correct Email Template Format

Since Netlify Identity is on the Netlify site, email templates should use **Netlify URLs** (without `/WebTemplate`):

### Invitation Email Template

```
{{ .SiteURL }}/admin/#invite_token={{ .Token }}
```

**Result:** `serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=...` ✅

### Recovery Email Template

```
{{ .SiteURL }}/admin/#recovery_token={{ .Token }}
```

**Result:** `serene-rugelach-9ae7b9.netlify.app/admin/#recovery_token=...` ✅

## ❌ Wrong Format (Don't Use This)

```
{{ .SiteURL }}/WebTemplate/admin/#invite_token={{ .Token }}
```

**Result:** `serene-rugelach-9ae7b9.netlify.app/WebTemplate/admin/#invite_token=...` ❌

This will cause a 404 because Netlify doesn't have a `/WebTemplate` path!

## How It Works

1. **Email link:** `serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=...`
2. **Netlify redirect:** `/admin` → `/admin-redirect.html` (preserves hash)
3. **JavaScript redirect:** → `robertgjoshevski.github.io/WebTemplate/admin/#invite_token=...`
4. **GitHub Pages admin:** Automatically accepts invitation

## Fix Your Email Templates

1. Go to: **Identity** → **Emails** → **Invitation email**
2. Update link to: `{{ .SiteURL }}/admin/#invite_token={{ .Token }}`
3. **Do NOT include `/WebTemplate`** - that's only for GitHub Pages!
4. Save

5. Do the same for **Recovery email**: `{{ .SiteURL }}/admin/#recovery_token={{ .Token }}`

## Redirect Handling

I've added redirects to handle both:
- `/admin` → Works correctly ✅
- `/WebTemplate/admin` → Redirects to `/admin` ✅ (fallback for incorrectly formatted emails)

But **always use `/admin`** in your email templates to avoid unnecessary redirects!

## Testing

After updating templates:

1. **Send new invitation**
2. **Check email link** - should be: `serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=...`
3. **Click link** - should redirect to GitHub Pages and accept invitation
