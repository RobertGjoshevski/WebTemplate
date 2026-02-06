# Fixing Netlify Identity Invitation Redirect

## Problem
When users accept Netlify Identity invitations, they're redirected to:
`https://serene-rugelach-9ae7b9.netlify.app/#invite_token=...`

But your site is hosted on GitHub Pages, so this shows an empty page.

## Solution 1: Configure Netlify Identity Site URL (Recommended)

1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Identity** → **Settings**
3. Find **Site URL** or **Application URL**
4. Change it from `https://serene-rugelach-9ae7b9.netlify.app` to:
   ```
   https://robertgjoshevski.github.io/WebTemplate/admin
   ```
5. Save the settings

**Result:** New invitations will redirect directly to your GitHub Pages admin panel.

## Solution 2: Create Redirect Page on Netlify Site

If Solution 1 doesn't work, create a redirect page on your Netlify site:

1. In your Netlify site, create a file `public/index.html`:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <script>
       // Redirect to GitHub Pages admin with invite token
       const hash = window.location.hash;
       if (hash.includes('invite_token=')) {
         window.location.href = 'https://robertgjoshevski.github.io/WebTemplate/admin' + hash;
       } else {
         window.location.href = 'https://robertgjoshevski.github.io/WebTemplate/admin';
       }
     </script>
   </head>
   <body>
     <p>Redirecting to admin panel...</p>
   </body>
   </html>
   ```

2. Deploy this to your Netlify site

**Result:** Users clicking invitation links will be redirected to GitHub Pages.

## Solution 3: Admin Page Handles Invite Tokens (Already Implemented)

The admin page has been updated to handle invite tokens. If a user manually navigates to:
`https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token=...`

The admin page will automatically accept the invitation.

## Recommended Approach

**Use Solution 1** - it's the cleanest and ensures all invitations go directly to the right place.

## Testing

After configuring Solution 1:
1. Send a new invitation from Netlify Identity
2. Click the invitation link
3. It should redirect to: `https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token=...`
4. The admin page will accept the invitation automatically

## For Existing Invitations

If you've already sent invitations with the old URL:
- Users can manually copy the `invite_token` from the Netlify URL
- Navigate to: `https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token=[token]`
- The admin page will accept it automatically
