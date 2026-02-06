# Fix: Invitation Modal Not Showing

## Problem

When clicking invitation links, users see the login page instead of the invitation acceptance form where they can set their password.

## Root Cause

The code was trying to use `acceptInvite()` programmatically, but Netlify Identity needs to show a modal form for users to set their password. The correct approach is to use `netlifyIdentity.open('invite')` which opens the invite modal and automatically detects the token from the URL.

## Solution

Changed from:
- ❌ `netlifyIdentity.acceptInvite(token)` - Programmatic acceptance (doesn't show password form)

To:
- ✅ `netlifyIdentity.open('invite')` - Opens modal that shows password setup form

## How It Works Now

1. **User clicks invitation link:** `/#invite_token=...`
2. **Page loads** with token in URL hash
3. **Netlify Identity loads** and initializes
4. **Code detects token** and calls `netlifyIdentity.open('invite')`
5. **Modal opens** showing password setup form
6. **User sets password** and submits
7. **Invitation accepted** and user is logged in

## Testing

After deploying:

1. **Send a new invitation** (old tokens may be expired)
2. **Click the invitation link**
3. **Should see:**
   - Netlify Identity modal opens automatically
   - Form asking for password
   - User can set password and accept invitation

4. **Check browser console** for logs:
   - "Netlify Identity loaded"
   - "Opening invite modal with token: ..."
   - "Identity initialized, user: null"

## Troubleshooting

**Modal not opening?**
- Check browser console for errors
- Verify Netlify Identity script is loading
- Check that `netlifyIdentity.open('invite')` is being called
- Make sure token isn't expired

**Still showing login page?**
- The Identity widget might not be loading
- Check network tab for failed requests to `/.netlify/identity`
- Verify Netlify site URL is correct

**Token expired?**
- Send a new invitation
- Tokens expire after 7 days

## Files Changed

- ✅ `src/pages/admin.astro` - Changed to use `open('invite')` instead of `acceptInvite()`
