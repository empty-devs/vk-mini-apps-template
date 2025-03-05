import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteSingleFile } from 'vite-plugin-singlefile';
import zipPack from 'vite-plugin-zip-pack';
import viteImagemin from 'vite-plugin-imagemin';
import path from 'path';

function handleModuleDirectivesPlugin() {
    return {
        name: 'handle-module-directives-plugin',
        transform(code: string, id: string | string[]) {
            if (id.includes('@vkontakte/icons')) {
                code = code.replace(/'use-client';?/g, '');
            }

            return { code };
        }
    };
}

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        react(),
        handleModuleDirectivesPlugin(),
        tsconfigPaths(),
        viteSingleFile({
            useRecommendedBuildConfig: true,
            removeViteModuleLoader: true
        }),
        viteImagemin({
            optipng: { optimizationLevel: 5 },
            mozjpeg: { quality: 80 },
            gifsicle: { optimizationLevel: 2 }
        }),
        zipPack()
    ],
    build: {
        outDir: 'dist',
        minify: 'esbuild',
        rollupOptions: {
            output: {
                entryFileNames: 'chunks/[name].[hash].js',
                chunkFileNames: 'chunks/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]',
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    vkontakte: [
                        '@vkontakte/vkjs',
                        '@vkontakte/vk-bridge',
                        '@vkontakte/vk-mini-apps-router',
                        '@vkontakte/icons',
                        '@vkontakte/vkui'
                    ]
                }
            }
        },
        emptyOutDir: true,
        cssCodeSplit: true,
        sourcemap: false
    }
});
