/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AuthController from '#controllers/users/auth_controller'
import HomeController from '#controllers/common/users/home_controller'
import SubjectsController from '#controllers/common/users/subjects_controller'
import ExercisesController from '#controllers/common/users/exercises_controller'
import DefaultExercisesController from '#controllers/common/admin/default_exercises_controller'
import DefaultSubjectsController from '#controllers/common/admin/default_subjects_controller'

router.group(() => {
  router.group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
  })

  router.get('/logout', [AuthController, 'logout']).use(middleware.auth())
}).prefix('auth')

router.group(() => {

  router.group(() => {
    router.post('/', [DefaultSubjectsController, 'store'])
    router.get('/', [DefaultSubjectsController, 'index'])

    router.group(() => {
      router.get('/', [DefaultSubjectsController, 'show'])
      router.get('/edit', [DefaultSubjectsController, 'edit'])
      router.put('/edit', [DefaultSubjectsController, 'update'])

      router.get('/create', [DefaultExercisesController, 'create'])
      router.post('/create', [DefaultExercisesController, 'store'])
      router.get('/:exercise/edit', [DefaultExercisesController, 'edit'])
      router.put('/:exercise/edit', [DefaultExercisesController, 'update'])
      router.delete('/:exercise', [DefaultExercisesController, 'destroy'])
    }).prefix('/:id')
  }).prefix('/me').use(middleware.role([2,3])) // Only teachers and admins can create subjects

  router.get('/', [SubjectsController, 'index'])
  router.get('/:id', [SubjectsController, 'show'])

  router.group(() => {
    router.get('/', [ExercisesController, 'show'])
    router.put('/', [ExercisesController, 'update'])
  }).prefix('/:id/exercises/:exercise')


}).prefix('subjects').use(middleware.auth())

router.get('/', [HomeController, 'index']).as('home')
