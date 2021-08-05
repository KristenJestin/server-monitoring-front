import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// config
const baseOutDir = '../build/public'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    build: {
        outDir: baseOutDir,
        manifest: true,
        rollupOptions: {
            // overwrite default .html entry
            input: '/src/main.ts',
        },
    },
})
