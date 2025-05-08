import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths()], // Automatically resolves paths from tsconfig.json
    // resolve: {
    //     alias: {
    //         // Ensure Vite resolves absolute imports based on your `baseUrl`
    //         '@': '/src', // Optional: Map '@' to the `src` folder
    //     },
    // },
    base: '/ABC-Script/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: './index.html',
        },
    },
});