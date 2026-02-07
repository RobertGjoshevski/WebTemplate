# RGsoft Static Site Template

A minimalist static site template built with Astro, Tailwind CSS, Shadcn UI, and Decap CMS.

## Features

- **Static-First**: Built with Astro for optimal performance
- **Content Management**: Edit posts, images, and content through Decap CMS admin panel
- **Modern UI**: Beautiful components with Shadcn UI and Tailwind CSS
- **Git-based Workflow**: All content is stored in your repository
- **Type-Safe Content**: Content Collections with Zod schema validation

## Tech Stack

- **Framework**: Astro (static-first, file-based routing)
- **Styling**: Tailwind CSS (utility-first)
- **UI Components**: Shadcn UI (Radix primitives)
- **CMS**: Decap CMS (Git-based, config in `public/admin/config.yml`)
- **Auth**: Netlify Identity + Git Gateway

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

**Content source:** The site always loads blog posts from `src/content/blog/` (the same files committed to the repo). Local and production use the same source—no separate "live" API. To see the latest posts committed via the admin panel (e.g. from another editor or machine), run `git pull` before `npm run dev`.

### Admin Panel

Access the content management panel at `http://localhost:4321/admin`.

**Local Development:**

For local development with the CMS, you have two options:

1. **With Local Backend (Recommended for local editing):**
   ```bash
   npm run dev:cms
   ```
   This starts both the Astro dev server and the Decap CMS local backend server.
   - No authentication required
   - Changes are saved directly to your local files
   - Access at `http://localhost:4321/admin`

2. **Without Local Backend:**
   ```bash
   npm run dev
   ```
   - The admin panel will load but requires Netlify Identity authentication
   - Use this if you only want to preview the site locally

**Production Deployment:**
- Comment out `local_backend: true` in `public/admin/config.yml`
- Set up Netlify Identity and Git Gateway
- Configure your repository settings in Netlify

### Build

```bash
npm run build
```

The built site will be in the `dist/` directory.

## Project Structure

```
/
├── public/
│   ├── admin/          # Decap CMS admin panel
│   └── images/         # Uploaded images
├── src/
│   ├── components/     # Reusable components
│   │   └── ui/         # Shadcn UI components
│   ├── content/        # Content Collections
│   │   └── blog/       # Blog posts (Markdown)
│   ├── layouts/        # Page layouts
│   ├── pages/          # File-based routes
│   └── styles/         # Global styles
└── astro.config.mjs    # Astro configuration
```

## Content Management

### Creating Blog Posts

1. Visit `/admin` in your browser
2. Click "New Blog Post"
3. Fill in the form fields
4. Save and commit

Posts are stored as Markdown files in `src/content/blog/` with frontmatter.

### Content Schema

Blog posts include:
- `title`: Post title
- `description`: Short description
- `pubDate`: Publication date
- `updatedDate`: Last update date (optional)
- `heroImage`: Hero image path (optional)
- `tags`: Array of tags (optional)

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for a complete step-by-step guide.

### Quick Start

1. **Update `astro.config.mjs`** with your GitHub Pages URL:
   ```js
   site: 'https://YOUR_USERNAME.github.io',
   base: '/YOUR_REPO_NAME',
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as source

4. **Setup Netlify Identity:**
   - Create a Netlify site (can be separate from hosting)
   - Enable Identity and Git Gateway
   - Update `public/admin/config.yml` to remove `local_backend: true`

The GitHub Actions workflow will automatically build and deploy your site!

## Customization

- **Styling**: Edit `src/styles/global.css` for global styles
- **Components**: Add Shadcn components with `npx shadcn@latest add [component]`
- **Layout**: Modify `src/layouts/BaseLayout.astro`
- **CMS Config**: Edit `public/admin/config.yml`

## License

MIT
