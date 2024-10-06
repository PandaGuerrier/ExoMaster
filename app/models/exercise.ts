import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Subject from '#models/subject'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import DefaultExercise from '#models/default_exercise'

export default class Exercise extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => DefaultExercise)
  declare defaultExercice: BelongsTo<typeof DefaultExercise>

  @column()
  declare isFinish: boolean

  @belongsTo(() => Subject)
  declare subject: BelongsTo<typeof Subject>

  @column()
  declare code: string // the code enter by the user

  @column()
  declare result: string // the result of the code

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}