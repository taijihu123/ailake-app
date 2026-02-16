import react from "@vitejs/plugin-react"
	import { defineConfig } from "vite"
	import { fileURLToPath, URL } from 'node:url'

	export default defineConfig({
	  plugins: [react()],
	  resolve: {
	    alias: {
	      "@": fileURLToPath(new URL('./src', import.meta.url)),
	    },
	  },
	  server: {
    host: "0.0.0.0",
    port: 5174,
    proxy: {
      // 将所有 /api 开头的请求代理到后端
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        ws: true, // 启用 WebSocket 代理
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
	  build: {
	    assetsDir: 'assets',
	    rollupOptions: {
	      output: {
	        manualChunks: {
	          vendor: ['react', 'react-dom'],
	        },
	      },
	    },
	  },
	  publicDir: 'public',
	})
	
