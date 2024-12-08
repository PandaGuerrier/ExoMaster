import type { HttpContext } from '@adonisjs/core/http'
import DefaultSubject from '#models/default_subject'
import { createDefaultSubjectStoreValidator, createDefaultSubjectUpdateValidator } from '#validators/default_subject'
import DefaultSubjectPolicy from '#policies/default_subject_policy'

export default class DefaultSubjectsController {

  public async index({ inertia, auth }: HttpContext) {
    const subjects = await DefaultSubject.query().where('userId', auth.use('web').user!.id).preload('exercises').exec()

    return inertia.render('dashboard/me/subjects/Index', {
      subjects: subjects || [] as DefaultSubject[]
    })
  }

  public async show({ inertia, params, auth, response }: HttpContext) {
    const subject = await DefaultSubject.query().where('id', params.id).firstOrFail()

    if (subject.userId !== auth.use('web').user!.id) {
      return response.redirect('/subjects/me')
    }

    await subject.load('exercises')

    return inertia.render('dashboard/me/subjects/Show', {
      subject
    })
  }

  public async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createDefaultSubjectStoreValidator)
    const user = auth.use('web').user!
    const subject = await DefaultSubject.create({
      userId: user.id,
      ...data
    })

    return response.redirect(`/subjects/me/${subject.id}`)
  }

  public async edit({ request, response, params, bouncer }: HttpContext) {
    const data = await request.validateUsing(createDefaultSubjectUpdateValidator)
    const subject = await DefaultSubject.query().where('id', params.id).firstOrFail()

    if (await bouncer.with(DefaultSubjectPolicy).allows('canUpdate', subject)) {
      return response.redirect('/subjects/me')
    }

    await subject.merge(data).save()

    return response.redirect(`/subjects/me/${subject.id}`)
  }

  public async update({ bouncer, inertia, params, response }: HttpContext) {
    const subject = await DefaultSubject.query().where('id', params.id).firstOrFail()

    if (await bouncer.with(DefaultSubjectPolicy).allows('canUpdate', subject)) {
      return response.redirect('/subjects/me')
    }

    return inertia.render('dashboard/me/subjects/Modify', {
      subject
    })
  }

  public async destroy({ bouncer, params, response }: HttpContext): Promise<void> {
    const subject = await DefaultSubject.query().where('id', params.id).firstOrFail()

    if (await bouncer.with(DefaultSubjectPolicy).allows('canDelete', subject)) {
      return response.redirect('/subjects/me')
    }

    await subject.delete()

    return response.redirect('/subjects/me')
  }

  public async create({ inertia }: HttpContext) {
    return inertia.render('dashboard/me/subjects/Create')
  }
}
