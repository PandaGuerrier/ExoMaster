import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'
import path from 'node:path'

export default defineConfig({
  plugins: [
    inertia({ssr: {enabled: false}}), react(),
    adonisjs({
      entrypoints: ['inertia/app/app.tsx', 'resources/css/app.css'],
      reload: ['resources/views/**/*.edge'],
    })
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
      '@/': path.resolve(__dirname, './inertia/components/ui')
    }
  }
})
