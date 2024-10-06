import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        name: 'student',
        description: 'Student role',
        power: 1,
        dashboardAccess: false,
      },
      {
        name: 'teacher',
        description: 'Teacher role',
        power: 50,
        dashboardAccess: false,
      },
      {
        name: 'admin',
        description: 'Admin role',
        power: 1000,
        dashboardAccess: true,
      }

      ])
  }
}
