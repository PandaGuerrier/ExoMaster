import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  public async index({ auth, inertia }: HttpContext) {
    const user = await auth.use('web').check()

    if (!user) {
       return inertia.render('Home')
    }

    return inertia.render('dashboard/Index')
  }
}
