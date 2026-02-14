import path from "path"
	import react from "@vitejs/plugin-react"
	import { defineConfig } from "vite"

	export default defineConfig({
	  plugins: [react()],
	  resolve: {
	    alias: {
	      "@": path.resolve(__dirname, "./src"),
	    },
	  },
	  server: {
	    host: "0.0.0.0",
	    proxy: {
	      // 将所有 /api 开头的请求代理到后端
	      '/api': {
	        target: 'http://192.168.130.130:5001',
	        changeOrigin: true,
	        secure: false,
	        rewrite: (path) => path.replace(/^\/api/, '/api')
	      }
	    }
	  }
	})
	
