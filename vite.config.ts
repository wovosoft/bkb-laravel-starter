import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
    plugins: [
        laravel([
            // 'resources/css/app.css',
            // 'resources/ts/app.ts',
            'resources/ts/apps/admin/admin.ts',
            'resources/ts/apps/admin/css/admin.scss',
        ]),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            "@": "resources/ts",
            "vue": "vue/dist/vue.esm-bundler.js"
        }
    }
});
