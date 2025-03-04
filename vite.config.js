import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  
  // Set the root directory to src
  root: 'src',
  
  // Base public path when served in production
  base: '/',
  
  // Configure the build output
  build: {
    // Output directory (relative to project root)
    outDir: '../dist',
    
    // Empty the outDir before building
    emptyOutDir: true,
    
    // Minify options
    minify: 'terser',
    
    // Configure CSS output
    cssMinify: true,
    
    // Keep your asset configuration
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/\.(css)$/i.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash].[ext]';
          }
          
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash].[ext]';
          }
          
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
  
  // Configure the server
  server: {
    port: 3000,
    open: true,
  },
});