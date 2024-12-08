import vine from '@vinejs/vine'

export const createDefaultSubjectStoreValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(5),
    default: vine.boolean(),
    number: vine.number(),
    description: vine.string().minLength(5),
  })
)

export const createDefaultSubjectUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(5).optional(),
    default: vine.boolean().optional(),
    number: vine.number().optional(),
    description: vine.string().minLength(5).optional(),
  })
)
