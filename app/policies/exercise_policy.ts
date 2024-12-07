import User from '#models/user'
import Exercise from '#models/exercise'
import { BasePolicy } from '@adonisjs/bouncer'

export default class ExercisePolicy extends BasePolicy {
  async canUpdate(user: User, exercise: Exercise) {
    await exercise.load('subject')
    await user.load('role')

    return user.id == exercise.subject.userId || user.role.power == 50
  }
}
