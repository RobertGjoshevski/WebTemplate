# Fix: TypeError - currentUser is not a function

## Problem

Decap CMS is trying to call `window.netlifyIdentity.currentUser()` before Netlify Identity is fully initialized, causing an error:

```
TypeError: window.netlifyIdentity.currentUser is not a function
```

## Root Cause

Decap CMS loads and immediately tries to check the current user, but Netlify Identity hasn't finished initializing yet. The `currentUser` method isn't available until Identity is fully initialized.

## Solution

1. **Initialize Netlify Identity in the `<head>`** - Before Decap CMS loads
2. **Wait for initialization** - Ensure Identity is ready before Decap CMS tries to use it
3. **Add safety checks** - Check if `currentUser` is a function before calling it

## Changes Made

### 1. Early Initialization in Head

Added initialization script in `<head>` that runs immediately when the Identity script loads:

```javascript
// Initialize Netlify Identity immediately when script loads
// This must happen BEFORE Decap CMS loads to prevent errors
(function() {
  function initIdentity() {
    if (window.netlifyIdentity && typeof window.netlifyIdentity.init === 'function') {
      window.netlifyIdentity.init({
        APIUrl: '${netlifySiteUrl}/.netlify/identity'
      });
    } else {
      setTimeout(initIdentity, 50);
    }
  }
  initIdentity();
})();
```

### 2. Safety Check for currentUser

Added check before calling `currentUser()`:

```javascript
if (typeof window.netlifyIdentity.currentUser === 'function') {
  const currentUser = window.netlifyIdentity.currentUser();
  // ...
}
```

## How It Works Now

1. **Identity script loads** in `<head>`
2. **Identity initializes** immediately (before Decap CMS)
3. **Decap CMS loads** - can now safely call `currentUser()`
4. **Invitation handling** - opens modal if token detected

## Testing

After deploying:

1. **Send a new invitation**
2. **Click the invitation link**
3. **Should see:**
   - No errors in console
   - Netlify Identity modal opens
   - Password setup form appears

4. **Check browser console** for:
   - "Netlify Identity initialized in head"
   - "Netlify Identity loaded successfully"
   - No TypeError errors

## Files Changed

- ✅ `src/pages/admin.astro` - Added early initialization and safety checks

## Important Notes

- Identity must initialize BEFORE Decap CMS loads
- The initialization happens in `<head>` to ensure it's ready
- Safety checks prevent errors if Identity isn't ready yet
