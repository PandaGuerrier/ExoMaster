import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn, roles: number[]) {
    const user = auth.use('web').user
    if (user) {
      if (roles.includes(user.roleId)) {
        return next()
      }
    }
    return response.redirect('/')
  }
}
