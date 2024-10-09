import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'default_exercise_default_subject'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('default_subject_id').unsigned().references('id').inTable('default_subjects').onDelete('CASCADE')
      table.integer('default_exercise_id').unsigned().references('id').inTable('default_exercises').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
