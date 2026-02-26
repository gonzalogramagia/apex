import { defineConfig } from 'vite';

export default defineConfig({
    base: '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        // Ensure index.html is the entry point
        rollupOptions: {
            input: {
                main: './index.html',
            },
        },
    },
    server: {
        historyApiFallback: true,
    },
});
