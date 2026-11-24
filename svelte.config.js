import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({ precompress: false }),
		paths: {
			base: process.env.BASE_PATH ?? ''
		},
		csp: {
			directives: {
				'script-src-elem': [
					'self',
					'https://static.cloudflareinsights.com',
					'sha256-L28lVkJa/bb8VtH7HuLeNQxNMQkE4sEIyD9a448xE1Q='
				],
				'object-src': ["'none'"],
				'base-uri': ["'self'"]
			}
		},
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Suppress 404s for missing .webp files — browser falls back to original format
				if (path.endsWith('.webp')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
