import User from '#models/user'
import DefaultSubject from '#models/default_subject'
import { BasePolicy } from '@adonisjs/bouncer'

export default class DefaultSubjectPolicy extends BasePolicy {
  public async canUpdate(user: User, subject: DefaultSubject) {
    return user.id === subject.userId
  }

  public async canDelete(user: User, subject: DefaultSubject) {
    return user.id === subject.userId
  }
}
