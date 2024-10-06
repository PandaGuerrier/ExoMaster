import type { HttpContext } from '@adonisjs/core/http'
import { createAuthLoginValidator, createAuthRegisterValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  public async login({auth, request, response}: HttpContext) {
    const data = await request.validateUsing(createAuthLoginValidator)

    const user = await User.verifyCredentials(data.username, data.password)

    if (!user) {
      return response.unauthorized('Invalid credentials')
    }

    await auth.use('web').authenticateAsClient(user)

    return response.ok(auth.use('web').user)
  }

  public async register({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(createAuthRegisterValidator)

    const user = await User.create(data)
    await auth.use('web').login(user)

    return response.created(user)
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.ok('Logged out successfully')
  }
}
