import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import User from '#models/user'
import Role from '#models/role'

export default class CreaterUser extends BaseCommand {
  static commandName = 'make:user'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  }

  async run() {
    const email = await this.prompt.ask('Enter email')
    const emailIsValid = await this.validateEmail(email)

    if (!emailIsValid) {
      return
    }

    const password = await this.prompt.secure('Enter password')
    const name = await this.prompt.ask('Enter name')
    const lastName = await this.prompt.ask('Enter last name')
    // todo introduce a admin role
    const admin = await this.prompt.confirm('Is this user an admin?')

    const user = await User.create({
      email: email,
      password: password,
      firstName: name,
      lastName: lastName,
    })

    if (admin) {
      const adminRole = await Role.query().where('slug', 'admin').firstOrFail()
      await user.related('role').associate(adminRole)
    }

    const table = this.ui.table()
    const role = await user.related('role').query().firstOrFail()

    table.head(['Email', 'Name', 'Last Name', 'Role'])
      .row([user.email, user.firstName, user.lastName, role.name])
      .render()

    this.logger.success('User created')
  }

  private async validateEmail(email: string): Promise<boolean> {
    const waiting = this.logger.await('Checking the email')
    waiting.start()

    if (!/^.+@.+\..+$/.test(email)) {
      waiting.stop()
      this.logger.error('The email is not valid: exemple@name.domain')
      return false
    }

    waiting.update('Checking the email in database')
    const user = await User.query().where('email', email).first()

    if (user) {
      waiting.stop()
      this.logger.error('User already exists')
      return false
    }

    waiting.stop()

    return true
  }
}
