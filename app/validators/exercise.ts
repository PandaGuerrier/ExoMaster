import vine from '@vinejs/vine'

export const createExerciseUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    description: vine.string().nullable().optional(),
    code: vine.string().optional(),
    result: vine.string().optional(),
    language: vine.enum(['python', 'javascript', 'dart', 'txt']).optional(),
  })
)

export const createExerciseStoreValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string(),
    language: vine.enum(['python', 'javascript', 'dart', 'txt']),
    code: vine.string().optional(),
    parentId: vine.string().nullable(),
  })
)
