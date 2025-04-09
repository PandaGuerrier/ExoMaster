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
import ExercisesController from '#controllers/common/users/exercises_controller'
import FoldersController from '#controllers/common/users/folders_controller'

router.group(() => {
  router.group(() => {
    router.post('/login', [AuthController, 'login']).as('auth.login')
    router.post('/register', [AuthController, 'register']).as('auth.register')
  })

  router.get('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
}).prefix('auth')

router.group(() => {
    router.get('/:id', [ExercisesController, 'show']).as('exercises.show')
    router.put('/:id', [ExercisesController, 'update']).as('exercises.update')
    router.post('/', [ExercisesController, 'store']).as('exercises.store')
}).prefix('exercises').use(middleware.auth())

router.group(() => {
  router.get('/:uuid', [FoldersController, 'show']).as('folders.show')
  router.post('/', [FoldersController, 'store']).as('folders.store')
}).prefix('folders').use(middleware.auth())

router.get('/', [HomeController, 'index']).as('home')
