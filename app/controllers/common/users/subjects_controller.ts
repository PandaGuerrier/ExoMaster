import type { HttpContext } from '@adonisjs/core/http'
import Subject from '#models/subject'
import SubjectPolicy from '#policies/subject_policy'
import DefaultSubject from '#models/default_subject'

export default class SubjectsController {
  public async index({ auth, inertia }: HttpContext) {
    const subjects = await auth.use('web').user?.related('subjects').query().preload('exercises').preload('defaultSubject').exec()

    return inertia.render('connected/subjects/Index', {
      subjects: subjects || []
    })
  }

  public async show({ inertia, params, bouncer, response }: HttpContext) {
    const subject = await Subject.query()
      .where('id', params.id)
      .firstOrFail()

    if(await bouncer.with(SubjectPolicy).allows('canShowSubject', subject)) {
      return response.redirect('/subjects')
    }

    await subject.load('exercises')
    await subject.load('defaultSubject')

    for (let exercise of subject!.exercises) {
      await exercise.load('defaultExercice')
    }

    return inertia.render('connected/subjects/Show', {
      subject
    })
  }

  public async indexTeacher({ inertia, auth }: HttpContext) {
    const subjects = await DefaultSubject.query().where('userId', auth.use('web').user!.id).preload('exercises').exec()

    return inertia.render('connected/subjects/create/Index', {
      subjects: subjects || [] as DefaultSubject[]
    })
  }

  public async showTeacher({ inertia, params, auth, response }: HttpContext) {
    const subject = await DefaultSubject.query().where('id', params.id).firstOrFail()

    if (subject.userId !== auth.use('web').user!.id) {
      return response.redirect('/subjects/me')
    }

    await subject.load('exercises')

    return inertia.render('connected/subjects/create/ShowTeacher', {
      subject
    })
  }

  public async store({}: HttpContext) {
    // TODO

  }
}
