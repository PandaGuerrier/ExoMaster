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

router.group(() => {
  router.group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
  })

  router.get('/logout', [AuthController, 'logout']).use(middleware.auth())
}).prefix('auth')

router.group(() => {
  router.get('/', [SubjectsController, 'index'])
  router.get('/:id', [SubjectsController, 'show'])
}).prefix('subjects').use(middleware.auth())

router.get('/', [HomeController, 'index']).as('home')
