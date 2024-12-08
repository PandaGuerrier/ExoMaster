import type { HttpContext } from '@adonisjs/core/http'
import DefaultExercise from '#models/default_exercise'
import DefaultSubject from '#models/default_subject'
import DefaultSubjectPolicy from '#policies/default_subject_policy'
import { createDefaultExerciseStoreValidator, createDefaultExerciseUpdateValidator } from '#validators/default_exercise'

export default class DefaultExercisesController {
  public async update({ inertia, params, bouncer, response }: HttpContext) {
    const subject = await DefaultSubject.query().where('id', params.id).firstOrFail()

    if (await bouncer.with(DefaultSubjectPolicy).allows('canUpdate', subject)) {
      return response.redirect('/dashboard/me/exercises')
    }

    await subject.load('exercises')
    const exercise = await subject.related('exercises').query().where('id', params.exercise).firstOrFail()

    return inertia.render('dashboard/me/exercises/Update', {
      subject,
      exercise
    })
  }

  public async store({ params, request, response, bouncer }: HttpContext) {
    const subject = await DefaultSubject.query().where('id', params.id).firstOrFail()
    const data = await request.validateUsing(createDefaultExerciseStoreValidator)

      if (await bouncer.with(DefaultSubjectPolicy).allows('canUpdate', subject)) {
        return response.redirect('/subjects/me/')
      }

      const exercise = await DefaultExercise.create(data)
      await subject.related('exercises').save(exercise)

      return response.redirect(`/subjects/me/${subject.id}`)
  }

  public async show({}: HttpContext) {
  }

  public async destroy({ params, bouncer, response }: HttpContext) {
    const subject = await DefaultSubject.query().where('id', params.id).firstOrFail()

    if (await bouncer.with(DefaultSubjectPolicy).allows('canUpdate', subject)) {
      return response.redirect('/dashboard/me/exercises')
    }

    await subject.load('exercises')
    const exercise = await subject.related('exercises').query().where('id', params.exercise).firstOrFail()
    await exercise.delete()

    return response.redirect(`/dashboard/me/${subject.id}`)
    }

  public async create({ params, bouncer, response, inertia}: HttpContext) {
    const subject = await DefaultSubject.query().where('id', params.id).firstOrFail()

    if (await bouncer.with(DefaultSubjectPolicy).allows('canUpdate', subject)) {
      return response.redirect('/dashboard/me/exercises')
    }

    return inertia.render('dashboard/me/exercises/Create', {
      subject
    })
  }

  public async edit({ params, bouncer, response, request}: HttpContext) {
    const subject = await DefaultSubject.query().where('id', params.id).firstOrFail()
    const data = await request.validateUsing(createDefaultExerciseUpdateValidator)

    if (await bouncer.with(DefaultSubjectPolicy).allows('canUpdate', subject)) {
      return response.redirect('/dashboard/me/exercises')
    }

    await subject.load('exercises')
    const exercise = await subject.related('exercises').query().where('id', params.exercise).firstOrFail()

    await exercise.merge(data).save()

    return response.redirect(`/dashboard/me/${subject.id}`)
  }
}
