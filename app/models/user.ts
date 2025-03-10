import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { afterCreate, BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Exercise from '#models/exercise'
import Role from '#models/role'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password'
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({isPrimary: true})
  declare id: number

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare rememberMeToken: string | null

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @column()
  declare roleId: number

  @manyToMany(() => Exercise)
  declare exercises: ManyToMany<typeof Exercise> // for custom exercises

  @column.dateTime({autoCreate: true})
  declare createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  declare updatedAt: DateTime | null

  @afterCreate()
  public static async assignDefaultRole(user: User) {
    const defaultRole = await Role.findBy('name', 'student')
    if (defaultRole) {
      await user.related('role').associate(defaultRole)
    }
  }
}
