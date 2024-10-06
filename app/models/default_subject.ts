import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import DefaultExercise from '#models/default_exercise'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class DefaultSubject extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string | null

  @column()
  declare description: string | null

  @column()
  declare number: number

  @manyToMany(() => DefaultExercise)
  declare exercises: ManyToMany<typeof DefaultExercise>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
