import { DateTime } from 'luxon'
import { BaseModel, beforeUpdate, belongsTo, column } from '@adonisjs/lucid/orm'
import Subject from '#models/subject'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import DefaultExercise from '#models/default_exercise'

export default class Exercise extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => DefaultExercise)
  declare defaultExercice: BelongsTo<typeof DefaultExercise>

  @column()
  declare defaultExerciseId: number

  @column()
  declare isFinish: boolean

  @belongsTo(() => Subject)
  declare subject: BelongsTo<typeof Subject>

  @column()
  declare subjectId: number

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
