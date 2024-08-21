import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default (options: { mode: string }) => {
  const env = process.env = { ...process.env, ...loadEnv(options.mode, process.cwd(), "") };
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': { target: env.BASE_API_URL },
      },
    },
    preview: {
      host: "0.0.0.0"
    }
  })
}
