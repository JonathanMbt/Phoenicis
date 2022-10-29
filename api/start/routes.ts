/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

// PUBLIC ROUTES
Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'LoginController.login');

    Route.post('/register', 'LoginController.register');
  }).prefix('/auth');
}).prefix('/api');

// ROUTES THAT NEED AUTHENTIFICATION
Route.group(() => {
  Route.group(() => {
    Route.get('/me', 'LoginController.me');
  }).prefix('/auth');

  // USERS ROUTES
  Route.group(() => {
    Route.get('/', 'UsersController.readUsers');
    Route.get('/:uuid', 'UsersController.readUser').where('uuid', Route.matchers.uuid());

    Route.post('/', 'UsersController.createUser');

    Route.patch('/:uuid', 'UsersController.updateUser').where('uuid', Route.matchers.uuid());
    Route.patch('/me', 'UsersController.updateAuthUser');

    Route.delete('/me', 'UsersController.deleteAuthUser');
    Route.delete('/:uuid', 'UsersController.deleteUser').where('uuid', Route.matchers.uuid());
  }).prefix('/users');
})
  .prefix('/api')
  .middleware('auth');
