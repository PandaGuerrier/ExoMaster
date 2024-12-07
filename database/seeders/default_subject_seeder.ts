import { BaseSeeder } from '@adonisjs/lucid/seeders'
import DefaultSubject from '#models/default_subject'
import DefaultExercise from '#models/default_exercise'

export default class extends BaseSeeder {
  async run() {
    const defaultExercises = await DefaultExercise.createMany([
      {
        title: 'Addition',
        description: 'Addition is the process of combining two or more numbers.',
        consign: 'What is the sum of 2 and 3?',
        points: 10
      },
      {
        title: 'Subtraction',
        description: 'Subtraction is the process of taking one number away from another.',
        consign: 'What is the difference between 5 and 2?',
        points: 10
      },
      {
        title: 'Multiplication',
        description: 'Multiplication is the process of adding a number to itself a certain number of times.',
        consign: 'What is the product of 4 and 3?',
        points: 10
      },
      {
        title: 'Division',
        description: 'Division is the process of splitting a number into equal parts.',
        consign: 'What is the quotient of 8 divided by 2?',
        points: 20
      }
    ])

    const defaultSubjects = await DefaultSubject.createMany([
      {
        default: true,
        title: 'Mathematics',
        description: 'Mathematics is the study of numbers, shapes, and patterns.',
        number: 1,
        userId: 1
      },
      {
        default: true,
        title: 'Physics',
        description: 'Physics is the study of matter, energy, and the interactions between them.',
        number: 2,
        userId: 1
      },
      {
        default: true,
        title: 'Chemistry',
        description: 'Chemistry is the study of the composition, properties, and reactions of matter.',
        number: 3,
        userId: 1
      }
    ])

    await defaultSubjects[0].related('exercises').attach([defaultExercises[0].id, defaultExercises[1].id, defaultExercises[2].id])
    await defaultSubjects[1].related('exercises').attach([defaultExercises[2].id, defaultExercises[3].id])
    await defaultSubjects[2].related('exercises').attach([defaultExercises[0].id, defaultExercises[1].id, defaultExercises[3].id])
  }
}
