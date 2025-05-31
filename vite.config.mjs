import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        viteStaticCopy({
            targets: [
                {
                    src: 'public/CNAME', // or 'public/CNAME' if you put it in a public folder
                    dest: '.'     // copy to the root of dist
                }
            ]
        })
    ], // Automatically resolves paths from tsconfig.json
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