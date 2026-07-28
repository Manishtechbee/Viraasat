import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import autoTranslatePlugin from "./src/plugins/autoTranslatePlugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [autoTranslatePlugin(),react(),tailwindcss(),],
})
