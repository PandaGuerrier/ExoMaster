import User from '#models/user'
import Subject from '#models/subject'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class SubjectPolicy extends BasePolicy {
  canShowSubject(user: User, subject: Subject): AuthorizerResponse {
    return user.id == subject.userId
  }

  canUpdateSubject(user: User, subject: Subject): AuthorizerResponse {
    return user.id == subject.userId
  }

  canDeleteSubject(user: User, subject: Subject): AuthorizerResponse {
    return user.id == subject.userId
  }
}
