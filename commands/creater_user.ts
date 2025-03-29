import Role from '#models/role'
import User from '#models/user'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class CreaterUser extends BaseCommand {
  static commandName = 'make:user'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  }

  async run() {
    const password = await this.prompt.secure('Enter password')
    const username = await this.prompt.ask('Enter User name')
    const admin = await this.prompt.confirm('Is this user an admin?')

    const user = await User.create({
      username: username,
      password: password,
    })

    if (admin) {
      const adminRole = await Role.query().where('slug', 'admin').firstOrFail()
      await user.related('role').associate(adminRole)
    }

    const table = this.ui.table()
    const role = await user.related('role').query().firstOrFail()

    table.head(['Email', 'Name', 'Last Name', 'Role'])
      .row([user.username, role.name])
      .render()

    this.logger.success('User created')
  }
}
