import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const githubPagesBase =
  process.env.GITHUB_ACTIONS && repoName && !repoName.endsWith('.github.io') ? `/${repoName}` : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    paths: {
      base: githubPagesBase
    },
    prerender: {
      entries: ['*']
    }
  }
};

export default config;
