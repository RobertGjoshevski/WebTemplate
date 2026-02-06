# Fixing Netlify Identity Invitation Redirect

## Problem
When accepting a Netlify Identity invitation, users are redirected to:
`https://serene-rugelach-9ae7b9.netlify.app/#invite_token=...`

But your site is hosted on GitHub Pages, so this shows an empty/unfinished page.

## Solution
Configure Netlify Identity to redirect to your GitHub Pages admin panel after accepting invitations.

## Step 1: Configure Netlify Identity Redirect URL

1. Go to your Netlify dashboard
2. Navigate to **Identity** → **Settings**
3. Look for **Site URL** or **Application URL**
4. Set it to: `https://robertgjoshevski.github.io/WebTemplate/admin`
5. Save the settings

## Step 2: Update Admin Page to Handle Invite Tokens

The admin page needs to handle invite tokens and redirect properly. We'll update it to check for invite tokens in the URL.

## Step 3: Alternative - Use Netlify Site Redirect

If the above doesn't work, you can create a redirect page on your Netlify site that forwards to GitHub Pages.

## Quick Fix

The easiest solution is to update the Netlify Identity site URL to point to your GitHub Pages admin panel.
