# Portfolio

This SvelteKit portfolio is configured for GitHub Pages deployment.

## Publish on GitHub Pages

1. Push this repository to GitHub.
2. In GitHub, open `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to the `main` branch and wait for the workflow to finish.
5. Your site will be available at:
   - `https://<your-username>.github.io/<repo-name>/` for a normal repository
   - `https://<your-username>.github.io/` if the repository itself is named `<your-username>.github.io`

The base path is set automatically during the GitHub Actions build, so you do not need to hardcode the repository name in the app.
