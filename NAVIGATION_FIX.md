# Navigation Links Fix

## Problem
Navigation links were hardcoded with absolute paths (`/` and `/admin`) which didn't include the base path `/WebTemplate`. This caused:
- Home button → `https://robertgjoshevski.github.io/` (wrong)
- Admin button → `https://robertgjoshevski.github.io/admin` (wrong)

## Solution
Updated all navigation links to use Astro's `import.meta.env.BASE_URL` which automatically includes the base path.

## Files Fixed

### 1. `src/components/Header.astro`
- Added `const base = import.meta.env.BASE_URL;`
- Updated all links to use `${base}`:
  - Logo: `href={`${base}`}`
  - Home: `href={`${base}`}`
  - Admin: `href={`${base}admin`}`

### 2. `src/components/BlogList.astro`
- Added `const base = import.meta.env.BASE_URL;`
- Updated blog post links: `href={`${base}blog/${post.slug}`}`

### 3. `src/layouts/BaseLayout.astro`
- Added `const base = import.meta.env.BASE_URL;`
- Updated favicon link: `href={`${base}favicon.svg`}`

## Result
Now all links correctly include the `/WebTemplate` base path:
- Home button → `https://robertgjoshevski.github.io/WebTemplate/` ✅
- Admin button → `https://robertgjoshevski.github.io/WebTemplate/admin` ✅
- Blog posts → `https://robertgjoshevski.github.io/WebTemplate/blog/[slug]` ✅

## Next Steps
1. Commit and push:
   ```bash
   git add .
   git commit -m "Fix navigation links to use base path"
   git push origin main
   ```

2. Wait for GitHub Pages to rebuild

3. Test the navigation - all links should work correctly!
