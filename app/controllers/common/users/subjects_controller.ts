import type { HttpContext } from '@adonisjs/core/http'
import Subject from '#models/subject'
import SubjectPolicy from '#policies/subject_policy'

export default class SubjectsController {
  public async index({ auth, inertia }: HttpContext) {
    const subjects = await auth.use('web').user?.related('subjects').query().preload('exercises').preload('defaultSubject').exec()

    return inertia.render('dashboard/subjects/Index', {
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

    return inertia.render('dashboard/subjects/Show', {
      subject
    })
  }
}
