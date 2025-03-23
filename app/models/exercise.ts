import { DateTime } from 'luxon'
import { BaseModel, beforeUpdate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Folder from '#models/folder'

export default class Exercise extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare isFinish: boolean

  @column()
  declare userId: number

  @column()
  declare code: string // the code enter by the user

  @column()
  declare parentId: string | null // if null, it's a root exercise, else it's a child of the exercise with the id parentId

  @belongsTo(() => Folder)
  declare parent: BelongsTo<typeof Folder>

  @column()
  declare result: string // the result of the code

  @column()
  declare language: string // the language of the code

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare finishedAt: DateTime

  @beforeUpdate()
  public static async updateFinishedAt(exercise: Exercise) {
    if (exercise.isFinish && !exercise.finishedAt) {
      exercise.finishedAt = DateTime.now()
    }
  }

  async getPath(): Promise<string[]> {
    if (this.parent === null) {
      return [this.name]
    }

    let folder = this.parent
    let path = await folder.getPath()
    return path.concat(this.name)
  }

}
