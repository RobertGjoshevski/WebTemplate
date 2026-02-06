# Fix: Netlify Identity Script Not Loading

## Problem

The Netlify Identity script wasn't loading properly when accessed from GitHub Pages, causing `window.netlifyIdentity` to be `undefined`.

## Root Cause

Loading the Identity script directly from the Netlify site (`serene-rugelach-9ae7b9.netlify.app/.netlify/identity`) was causing CORS or loading issues when accessed from GitHub Pages.

## Solution

Changed to load the Identity widget from the official CDN:
- **Before:** `https://serene-rugelach-9ae7b9.netlify.app/.netlify/identity`
- **After:** `https://identity.netlify.com/v1/netlify-identity-widget.js`

The CDN version is more reliable and doesn't have CORS issues.

## How It Works

1. **Identity widget loads** from CDN (reliable, no CORS)
2. **Initialize with API URL** pointing to your Netlify site
3. **Widget connects** to your Netlify Identity backend
4. **Invitation handling** works properly

## Testing

After deploying:

1. **Send a new invitation**
2. **Click the invitation link**
3. **Should see:**
   - Netlify Identity modal opens automatically
   - Password setup form appears
   - No console errors

4. **Check browser console** for:
   - "Netlify Identity initialized in head"
   - "Netlify Identity loaded successfully"
   - "Opening invite modal with token: ..."

## Files Changed

- ✅ `src/pages/admin.astro` - Changed Identity script source to CDN

## Important Notes

- The widget loads from CDN but connects to your Netlify site's Identity backend
- The API URL (`APIUrl`) still points to your Netlify site
- This approach is more reliable and recommended by Netlify
