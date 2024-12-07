import type { HttpContext } from '@adonisjs/core/http'
import Subject from '#models/subject'
import SubjectPolicy from '#policies/subject_policy'
import Exercise from '#models/exercise'
import { createExerciseUpdateValidator } from '#validators/exercise'
import ExercisePolicy from '#policies/exercise_policy'

export default class ExercisesController {
  public async show({ inertia, params, bouncer, response }: HttpContext) {
    const subject = await Subject.query()
      .where('id', params.id)
      .firstOrFail()

    const exercise = await Exercise.query()
      .where('id', params.exercise)
      .andWhere('subject_id', params.id)
      .firstOrFail()

    if(await bouncer.with(SubjectPolicy).allows('canShowSubject', subject)) {
      return response.redirect('/subjects')
    }

    await subject.load('exercises')
    await subject.load('defaultSubject')
    await exercise.load('defaultExercice')

    return inertia.render('connected/subjects/exercises/Show', {
      subject,
      exercise
    })
  }

  public async update({ request, params, bouncer, response }: HttpContext) {
    const data = await request.validateUsing(createExerciseUpdateValidator)

    const exercise = await Exercise.query()
      .where('id', params.exercise)
      .andWhere('subject_id', params.id)
      .firstOrFail()

    if(await bouncer.with(ExercisePolicy).allows('canUpdate', exercise)) {
      return response.redirect('/subjects')
    }

    exercise.merge(data)
    await exercise.save()

    return exercise
  }

  public async store({}: HttpContext) {
    // TODO
  }
}
