import vine from '@vinejs/vine'

export const createDefaultExerciseStoreValidator = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
    consign: vine.string(),
    code: vine.string(),
    points: vine.number(),
  })
)

export const createDefaultExerciseUpdateValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    description: vine.string().optional(),
    consign: vine.string().optional(),
    code: vine.string().optional(),
    points: vine.number().optional(),
  })
)
