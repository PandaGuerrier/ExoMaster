import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.session?.flashMessages.get('errors'),
    auth: async (ctx) => {
      const auth = ctx.auth.use('web') ?? null

      if (auth) {
        await auth.user?.load('role')
        await auth.user?.load('exercises')
      }

      return ctx.auth.use('web') ?? null
    }
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
    entrypoint: 'inertia/app/ssr.tsx'
  }
})
