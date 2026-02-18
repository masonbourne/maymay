# MayMay Portfolio Redesign

This project is a one-page, static artist website designed for GitHub Pages deployment.

## Local development

1. Clone the repository.
2. Open `index.html` directly in a browser, or run a simple static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

### Option A: Deploy from the `main` branch root
1. Push your branch to GitHub.
2. In your repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/ (root)`
4. Save and wait for deployment.

### Option B: Deploy from `gh-pages` branch
1. Create and push a `gh-pages` branch with site files.
2. Set Pages source to `gh-pages` root folder.

The site will be live at:

`https://<your-username>.github.io/<repository-name>/`
