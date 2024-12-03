import vine from '@vinejs/vine'

export const createExerciseUpdateValidator = vine.compile(
  vine.object({
    code: vine.string().optional(),
    isFinish: vine.boolean().optional(),
    result: vine.string().optional(),
    language: vine.string().optional(),
  })
)

export const createExerciseStoreValidator = vine.compile(
  vine.object({
    code: vine.string(),
    isFinish: vine.boolean(),
    result: vine.string(),
  })
)
