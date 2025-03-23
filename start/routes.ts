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
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
  })

  router.get('/logout', [AuthController, 'logout']).use(middleware.auth())
}).prefix('auth')

router.group(() => {
    router.get('/:id', [ExercisesController, 'show'])
    router.put('/:id', [ExercisesController, 'update'])
    router.post('/', [ExercisesController, 'store'])
}).prefix('exercises').use(middleware.auth())

router.group(() => {
  router.get('/:uuid', [FoldersController, 'show'])
  router.post('/', [FoldersController, 'store'])
}).prefix('folders').use(middleware.auth())

router.get('/', [HomeController, 'index']).as('home')
