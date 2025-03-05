import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import viteImagemin from 'vite-plugin-imagemin';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    server: {
        host: 'localhost',
        port: 29846,
        hmr: {
            protocol: 'wss',
            port: 29846,
            clientPort: 443
        },
        strictPort: true
    },
    preview: {
        host: 'localhost',
        port: 29846,
        strictPort: true
    },
    plugins: [
        react(),
        handleModuleDirectivesPlugin(),
        tsconfigPaths(),
        viteImagemin({
            optipng: { optimizationLevel: 5 },
            mozjpeg: { quality: 80 },
            gifsicle: { optimizationLevel: 2 }
        })
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
