import vine from '@vinejs/vine'

export const createExerciseUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    description: vine.string().nullable().optional(),
    code: vine.string().optional(),
    isFinish: vine.boolean().optional(),
    result: vine.string().optional(),
    language: vine.string().optional(),
  })
)

export const createExerciseStoreValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string(),
    language: vine.string(),
  })
)
