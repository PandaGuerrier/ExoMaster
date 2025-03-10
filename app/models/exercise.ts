import { DateTime } from 'luxon'
import { BaseModel, beforeUpdate, column } from '@adonisjs/lucid/orm'

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
}
