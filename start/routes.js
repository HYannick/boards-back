'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.group('/api', () => {
  Route.get('/', () => {
    return {greeting: 'Hello world Boards'}
  })

  Route.post('/register', 'Auth/RegisterController.signup')
  Route.post('/login', 'Auth/RegisterController.login')
  Route.get('/register/confirm/:token', 'Auth/RegisterController.confirmEmail')

  Route.post('login', 'Auth/RegisterController.login')
  Route.get('logout', 'Auth/RegisterController.logout')


  Route.post('/book/create', 'BookController.create').middleware(['auth_required'])
  Route.get('/book/:id/details', 'BookController.getBookDetails')
  Route.get('/book/:id/infos', 'BookController.getBookMainInfos')

  Route.get('/user', 'UserController.getAuthUser').middleware(['auth_required'])
  Route.get('/user/:id', 'UserController.getUser')
  Route.put('/user', 'UserController.updateUser').middleware(['auth_required'])
  Route.get('/user/:username/books', 'UserController.getBooks')
  Route.get('/user/:username/favorites', 'FavoriteController.getFav')
  Route.post('/user/updateMedias', 'UploadController.updateUserAvatar')

  Route.post('/favorite', 'FavoriteController.favorite')
  //   Route.post('password/email', 'Auth/PasswordResetController.sendResetLinkEmail')
  //   Route.get('password/reset/:token', 'Auth/PasswordResetController.showResetForm')
  //   Route.post('password/reset', 'Auth/PasswordResetController.reset')

  Route.get('/upload', 'UploadController.uploadImage')
  Route.get('/assets/:name', 'UploadController.viewImage')
  Route.delete('/upload/:key', 'UploadController.removeImage')
}).prefix('/api/v1')

Route.group(() => {
  Route.post('/create', 'FavoriteController.favorite')
  Route.delete('/unfavorite/:id', 'FavoriteController.unFavorite')
}).prefix('/api/v1/favorites')