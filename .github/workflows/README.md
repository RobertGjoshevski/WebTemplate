# GitHub Actions Workflows

## deploy.yml

Automatically builds and deploys your Astro site to GitHub Pages when you push to the `main` branch.

### How it works:

1. **Trigger**: Runs on every push to `main` branch
2. **Build**: Installs dependencies and builds your Astro site
3. **Deploy**: Deploys the `dist/` folder to GitHub Pages

### Setup:

1. Make sure `astro.config.mjs` has the correct `site` and `base` values
2. Go to your repository Settings → Pages
3. Select "GitHub Actions" as the source
4. Push to `main` branch - deployment happens automatically!

### Manual Deployment:

You can also trigger deployments manually:
- Go to Actions tab
- Select "Deploy to GitHub Pages" workflow
- Click "Run workflow"
