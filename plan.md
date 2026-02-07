1. The "RGsoft" Tech Stack
Framework: Astro (Best for static sites + Markdown).

Styling: Tailwind CSS + Shadcn UI (Modern, professional UI).

CMS: Decap CMS (The Admin Panel).

Auth: Netlify Identity (Handled via Git Gateway).

Hosting: GitHub Pages.

2. Cursor AI Step-by-Step Instructions
Copy and paste these prompts into Cursor (Ctrl+K or Composer) to build the project.

Phase 1: Project Initialization
"Create a new Astro project using the 'Basics' template. Install Tailwind CSS and Shadcn UI. Create a folder structure for a landing page where 'Posts' are stored in src/content/blog/ as Markdown files."

Phase 2: Create the Admin Panel
"In the public/ folder, create a subfolder named admin. Inside public/admin/, create an index.html that loads the Decap CMS script and the Netlify Identity widget. Also, create a config.yml for Decap CMS. Set the backend to 'git-gateway' and create a collection for 'blog' that matches my src/content/blog/ folder. Include fields for title, date, image, and body."

Phase 3: Build the UI (The Template)
"Create a clean, minimalist landing page using Shadcn components (Hero, Features, BlogList). Use Astro's getCollection to fetch and display the Markdown posts from src/content/blog/. Make the design professional for a software company like RGsoft."