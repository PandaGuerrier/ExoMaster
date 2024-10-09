import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { afterCreate, BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Subject from '#models/subject'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Exercise from '#models/exercise'
import Role from '#models/role'
import Group from '#models/group'
import DefaultSubject from '#models/default_subject'

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

  // group parts (if the user is in part of a group):

  @belongsTo(() => Group)
  declare group: BelongsTo<typeof Group>

  @column()
  declare groupId: number | null

  // subjects parts:

  @manyToMany(() => Subject)
  declare subjects: ManyToMany<typeof Subject>

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

  @afterCreate()
  public static async assignSubjects(user: User) {
    const defaultSubjects = await DefaultSubject.query().where('default', true).exec()

    if (defaultSubjects) {
      const subjectsId: number[] = []

      for (const defaultSubject of defaultSubjects) {
        const defaultExercises = await defaultSubject.related('exercises').query().exec()
        const exercises: number[] = []

        const subject = await Subject.create({
          defaultSubjectId: defaultSubject.id,
          isFinish: false
        })

        for (const defaultExercise of defaultExercises) {
          const exercise = await Exercise.create({
            defaultExerciseId: defaultExercise.id,
            subjectId: subject.id,
            isFinish: false,
            code: defaultExercise.code,
          })

          exercises.push(exercise.id)
         }

        await subject.related('exercises').attach(exercises)
        subjectsId.push(subject.id)
      }

      await user.related('subjects').attach(subjectsId)
    }
  }
}
