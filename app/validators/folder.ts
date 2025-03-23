import vine from '@vinejs/vine'

export const createFolderStoreValidator = vine.compile(
  vine.object({
    name: vine.string(),
    parentId: vine.string().optional(),
  })
)
