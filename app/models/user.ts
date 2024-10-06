import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Subject from '#models/subject'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Exercise from '#models/exercise'
import Role from '#models/role'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare rememberMeToken: string | null

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  // group parts (if the user is a admin / teacher)

  @manyToMany(() => User)
  declare students: ManyToMany<typeof User>

  // subjects parts:

  @manyToMany(() => Subject)
  declare subjects: ManyToMany<typeof Subject>

  @manyToMany(() => Exercise)
  declare exercises: ManyToMany<typeof Exercise> // for custom exercises

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
