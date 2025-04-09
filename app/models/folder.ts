import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Exercise from '#models/exercise'
import { randomUUID } from 'node:crypto'

export default class Folder extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare userId: number

  @manyToMany(() => Folder, {
    relatedKey: 'uuid',
    pivotForeignKey: 'parent_uuid',
  })
  declare folders: ManyToMany<typeof Folder>

  @manyToMany(() => Exercise, {
    relatedKey: 'id'
  })
  declare exercises: ManyToMany<typeof Exercise>

  @column()
  declare parentId: string | null

  @belongsTo(() => Folder)
  declare parent: BelongsTo<typeof Folder>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  getPath(): string[] {
    if (this.parent === null) {
      return [this.name]
    }

    let folder = this.parent
    let path = folder.getPath()
    return path.concat(this.name)
  }

  @beforeCreate()
  public static async generateUuid(folder: Folder) {
    folder.uuid = randomUUID()
  }
}
