import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Exercise from '#models/exercise'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import DefaultSubject from '#models/default_subject'

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => DefaultSubject)
  declare defaultSubject: BelongsTo<typeof DefaultSubject>

  @column()
  declare defaultSubjectId: number

  @column()
  declare isFinish: boolean

  @column()
  declare userId: number

  @manyToMany(() => Exercise)
  declare exercises: ManyToMany<typeof Exercise>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
