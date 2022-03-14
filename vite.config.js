import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [svelte()],
  base: command == 'serve' ? '/' : './',
}));
