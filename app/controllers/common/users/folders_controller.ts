import type { HttpContext } from '@adonisjs/core/http'
import Folder from '#models/folder'
import { createFolderStoreValidator } from '#validators/folder'

export default class FoldersController {
  public async show({inertia, params, auth}: HttpContext) {
    const user = auth.use('web').user!
    const folder = await Folder.query().where('uuid', params.uuid).andWhere('userId', user.id).firstOrFail()

    await folder.load('folders')
    await folder.load('exercises')

    return inertia.render('dashboard/folders/Show', {
      folder
    })
  }

  public async store({request, response, auth}: HttpContext) {
    const data = await request.validateUsing(createFolderStoreValidator)
    const user = auth.use('web').user!

    const folder = await Folder.create({
      ...data,
      userId: user.id
    })

    console.log(data)
    if (data.parentId) {
      const user = auth.use('web').user!
      const parent = await Folder.query().where('uuid', data.parentId).andWhere('userId', user.id).firstOrFail()

      await parent.related('folders').attach([folder.uuid])
    } else {
      await user.related('folders').attach([folder.uuid])
    }

    return response.json(folder)
  }
}
