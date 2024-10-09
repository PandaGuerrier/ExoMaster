import type { HttpContext } from '@adonisjs/core/http'
import Subject from '#models/subject'

export default class SubjectsController {
  public async index({ auth, inertia }: HttpContext) {
    const subjects = await auth.use('web').user?.related('subjects').query().preload('exercises').preload('defaultSubject').exec()

    return inertia.render('connected/subjects/Index', {
      subjects: subjects || []
    })
  }

  public async show({ auth, inertia, params }: HttpContext) {
    const subject = await Subject.query()
      .where('id', params.id)
      .andWhere // en gros faut que tu verif les id et tout galère
      .preload('exercises')
      .preload('defaultSubject')
      .firstOrFail()

    subject!.exercises.map(async (exercise) => {
      await exercise.load('defaultExercice')
    })

    return inertia.render('connected/subjects/Show', {
      subject
    })
  }
}
