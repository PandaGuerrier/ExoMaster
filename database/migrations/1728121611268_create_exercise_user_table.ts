import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'exercises'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.boolean('is_finish').defaultTo(false)
      table.text('code').notNullable().defaultTo('# Écrivez votre code ici')
      table.text('result').notNullable().defaultTo('')
      table.string('language').notNullable().defaultTo('python')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('finished_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
