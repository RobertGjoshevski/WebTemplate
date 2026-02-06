# Setting Up Netlify Redirect for Email Links

## Your Setup

Your Netlify site (`serene-rugelach-9ae7b9.netlify.app`) is connected to the same GitHub repository:
`https://github.com/RobertGjoshevski/WebTemplate`

This means we can add the redirect file directly to your repo!

## What We're Doing

1. **Add redirect file** to your GitHub repo
2. **Netlify will deploy it** automatically (since it's connected to GitHub)
3. **Email links** will redirect from Netlify → GitHub Pages

## File Location

The redirect file has been created at:
```
public/admin/index.html
```

This file will be:
- ✅ Deployed to Netlify at: `serene-rugelach-9ae7b9.netlify.app/admin/`
- ✅ Available on GitHub Pages (but won't interfere)

## Next Steps

### Step 1: Commit and Push

```bash
git add public/admin/index.html
git commit -m "Add Netlify redirect page for admin panel"
git push origin main
```

### Step 2: Wait for Netlify to Deploy

1. Go to your Netlify dashboard
2. Check the **Deploys** tab
3. Wait for the deployment to complete (usually 1-2 minutes)

### Step 3: Update Email Templates in Netlify

1. Go to: **Identity** → **Emails** → **Invitation template**
2. Click **Configure**
3. Update "Path to template" to:
   ```
   {{ .SiteURL }}/admin/#invite_token={{ .Token }}
   ```
4. Click **Save**

### Step 4: Verify Recovery Template

1. Go to: **Identity** → **Emails** → **Recovery template**
2. Verify "Path to template" is:
   ```
   {{ .SiteURL }}/admin/#recovery_token={{ .Token }}
   ```
3. If not, update it and save

## How It Works

1. **User clicks email link** → `serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=...`
2. **Netlify serves** `public/admin/index.html`
3. **JavaScript redirects** → `robertgjoshevski.github.io/WebTemplate/admin/#invite_token=...`
4. **GitHub Pages admin page** handles the token automatically

## Testing

After deploying:

1. **Test the redirect:**
   - Visit: `https://serene-rugelach-9ae7b9.netlify.app/admin`
   - Should redirect to GitHub Pages admin panel

2. **Test with token:**
   - Visit: `https://serene-rugelach-9ae7b9.netlify.app/admin/#invite_token=test123`
   - Should redirect to: `https://robertgjoshevski.github.io/WebTemplate/admin/#invite_token=test123`

3. **Send test invitation:**
   - Send invitation email
   - Click link → Should redirect to GitHub Pages
   - Token should be handled automatically

## File Structure

```
WebTemplate/
├── public/
│   ├── admin/
│   │   ├── index.html          ← NEW: Redirect page for Netlify
│   │   └── config.yml          ← Decap CMS config
│   └── config.yml              ← Decap CMS config (root)
└── src/
    └── pages/
        └── admin.astro         ← GitHub Pages admin page
```

## Important Notes

- The redirect file is in `public/admin/index.html` - this will be served by Netlify
- Your GitHub Pages admin is at `src/pages/admin.astro` - this is separate
- Both can coexist without conflict
- Netlify will serve the `public/` folder contents
- GitHub Pages will serve the built `dist/` folder (from `src/pages/`)

## Troubleshooting

**Redirect not working?**
- Check Netlify deploy logs
- Verify file is at `public/admin/index.html`
- Test the redirect URL manually

**Still going to Netlify site?**
- Clear browser cache
- Check that email templates are updated
- Verify redirect file is deployed (check Netlify file browser)
