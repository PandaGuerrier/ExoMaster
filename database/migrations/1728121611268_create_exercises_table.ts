import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'exercises'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('default_exercise_id').unsigned().references('id').inTable('default_exercises').onDelete('CASCADE')
      table.boolean('is_finish').defaultTo(false)
      table.boolean('is_good').defaultTo(false)
      table.integer('subject_id').unsigned().references('id').inTable('subjects').onDelete('CASCADE')
      table.text('code').notNullable().defaultTo('# Écrivez votre code ici')
      table.text('result').notNullable().defaultTo('')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
