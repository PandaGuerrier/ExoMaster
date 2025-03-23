import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'exercise_user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('exercise_id').unsigned().references('id').inTable('exercises').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('finished_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
