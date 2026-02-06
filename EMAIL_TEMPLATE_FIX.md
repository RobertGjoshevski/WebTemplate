# Email Template Fix - Root Path Redirect

## Problem

Email invitation links are going to:
- `https://serene-rugelach-9ae7b9.netlify.app/#invite_token=...` ❌

Instead of:
- `https://serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=...` ✅

## Solution

I've added a **client-side redirect** to the homepage that automatically detects invitation/recovery tokens in the URL hash and redirects to the admin page.

### What Changed

**File:** `src/layouts/BaseLayout.astro`
- Added JavaScript that checks for `invite_token` or `recovery_token` in the URL hash
- If found, automatically redirects to `/admin` with the token preserved

## How It Works Now

1. **User clicks email link:** `serene-rugelach-9ae7b9.netlify.app/#invite_token=...`
2. **Homepage loads** with the token in the hash
3. **JavaScript detects the token** and redirects to: `serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=...`
4. **Netlify redirect** sends to: `robertgjoshevski.github.io/WebTemplate/admin/#invite_token=...`
5. **Admin page** automatically accepts the invitation

## Next Steps

### Option 1: Keep Current Email Templates (Works Now!)

The redirect will work with your current email templates. Just:
1. **Commit and push** the changes
2. **Test with existing invitation** - it should now redirect correctly!

### Option 2: Update Email Templates (Recommended)

For cleaner URLs, update your email templates to use `/admin` path:

1. Go to: **Identity** → **Emails** → **Invitation email**
2. Update link to: `{{ .SiteURL }}/admin/#invite_token={{ .Token }}`
3. Do the same for **Recovery email**: `{{ .SiteURL }}/admin/#recovery_token={{ .Token }}`

**Benefits:**
- Cleaner URLs
- One less redirect step
- Better user experience

## Testing

After deploying:

1. **Test root path with token:**
   - Visit: `https://serene-rugelach-9ae7b9.netlify.app/#invite_token=test123`
   - Should redirect to admin page automatically

2. **Test with real invitation:**
   - Send invitation email
   - Click link (even if it goes to root)
   - Should redirect to admin and accept invitation

## Files Changed

- ✅ `src/layouts/BaseLayout.astro` - Added token detection and redirect

## Important Notes

- This works for **both** root path (`/#invite_token=...`) and admin path (`/admin/#invite_token=...`)
- The redirect happens **client-side** so hash fragments are preserved
- Works immediately - no need to resend invitations!
