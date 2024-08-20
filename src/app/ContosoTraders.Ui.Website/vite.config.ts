import * as path from 'path';

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
       include: "**/*.svg",
      }),
  ],
  root: './',
  base: '/',
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
  resolve: {
    alias: [
      { find: 'app', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  build: {
  rollupOptions: {
      input: {
          main: path.resolve(__dirname, 'index.html'),
      },
  },
  outDir: 'build'
},
})
