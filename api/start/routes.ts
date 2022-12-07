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
import AutoSwagger from 'adonis-autoswagger';
import { AdonisRoute, GenSwagger } from '@phoenicis/adonis-to-swagger';
import swagger from '../app/Providers/swagger';

// PUBLIC ROUTES
Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'LoginController.login');

    Route.post('/register', 'LoginController.register');
  }).prefix('/auth');

  // DOC ROUTES
  Route.group(() => {
    Route.get('/', async () => {
      return AutoSwagger.ui('/api/doc/swagger');
    });

    Route.get('/swagger', async () => {
      const genSwagger = GenSwagger.getInstance(
        Route.toJSON() as { [domain: string]: AdonisRoute[] },
        swagger
      );
      return await genSwagger.writeFile();
    });
  }).prefix('/doc');
})
  .prefix('/api')
  .middleware('logRequest');

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

  //PLAYERFS ROUTES
  Route.group(() => {
    Route.get('/', 'PlayerFSController.readPlayersFS');
    Route.get('/:uuid', 'PlayerFSController.readPlayerFS').where('uuid', Route.matchers.uuid());

    Route.post('/', 'PlayerFSController.createPlayerFS');

    Route.patch('/:uuid', 'PlayerFSController.updatePlayerFS').where('uuid', Route.matchers.uuid());

    Route.delete('/me', 'PlayerFSController.deleteAuthPlayerFS');
    Route.delete('/:uuid', 'PlayerFSController.deletePlayerFS').where(
      'uuid',
      Route.matchers.uuid()
    );
  })
    .prefix('/playersFS')
    .middleware('playerFS');

  //PLAYER ROUTES
  Route.group(() => {
    Route.get('/', 'PlayerController.readPlayers');
    Route.get('/:uuid', 'PlayerController.readPlayer').where('uuid', Route.matchers.uuid());

    Route.post('/', 'PlayerController.createPlayer');

    Route.patch('/:uuid', 'PlayerController.updatePlayer').where('uuid', Route.matchers.uuid());

    Route.delete('/:uuid', 'PlayerController.deletePlayer').where('uuid', Route.matchers.uuid());
  }).prefix('/players');

  //PET ROUTES
  Route.group(() => {
    Route.get('/', 'PetController.readPets');
    Route.get('/:uuid', 'PetController.readPet').where('uuid', Route.matchers.uuid());

    Route.post('/', 'PetController.createPet');

    Route.patch('/:uuid', 'PetController.updatePet').where('uuid', Route.matchers.uuid());

    Route.delete('/:uuid', 'PetController.deletePet').where('uuid', Route.matchers.uuid());
  }).prefix('/pets');
})
  .prefix('/api')
  .middleware('auth')
  .middleware('logRequest');
