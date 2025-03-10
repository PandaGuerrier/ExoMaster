import type { HttpContext } from '@adonisjs/core/http'
import Exercise from '#models/exercise'
import { createExerciseStoreValidator, createExerciseUpdateValidator } from '#validators/exercise'
import ExercisePolicy from '#policies/exercise_policy'

export default class ExercisesController {
  public async show({ inertia, params, auth }: HttpContext) {
    const user = auth.use('web').user!
    const exercise = await Exercise.query()
      .where('id', params.id)
      .andWhere('userId', user.id)
      .firstOrFail()

    console.log(exercise)

    return inertia.render('dashboard/exercises/Show', {
      exercise
    })
  }

  public async update({ request, params, bouncer, response }: HttpContext) {
    const data = await request.validateUsing(createExerciseUpdateValidator)

    const exercise = await Exercise.query()
      .where('id', params.id)
      .firstOrFail()

    if(await bouncer.with(ExercisePolicy).allows('canUpdate', exercise)) {
      return response.redirect('/')
    }

    await exercise.merge(data).save()
    return exercise
  }

  public async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createExerciseStoreValidator)
    const user = auth.use('web').user!

    const exercise = await Exercise.create({
      ...data,
      userId: user.id
    })

    await user.related('exercises').attach([exercise.id])

    return response.redirect('/')
  }
}
