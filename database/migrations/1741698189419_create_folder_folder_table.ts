import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'folder_folder'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('folder_uuid').unsigned().references('uuid').inTable('folders').onDelete('CASCADE')
      table.string('parent_uuid').unsigned().references('uuid').inTable('folders').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
