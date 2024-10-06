import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('username').notNullable().unique() // ex: 'jules.lofficial'
      table.string('password').nullable()
      table.string('remember_me_token').nullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE') // 0 is student

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
