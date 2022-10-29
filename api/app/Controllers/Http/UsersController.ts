import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { prisma } from '@ioc:Adonis/Addons/Prisma';
import { User } from '@prisma/client';
import CreateUserValidator from 'App/Validators/CreateUserValidator';
import { v4 as uuidv4 } from 'uuid';
import Hash from '@ioc:Adonis/Core/Hash';

export default class UsersController {
  public async readUsers({ response }: HttpContextContract): Promise<User[]> {
    const users = await prisma.user.findMany();

    response.status(200);
    return users;
  }

  public async createUser({ request, response }: HttpContextContract): Promise<User> {
    const payload = await request.validate(CreateUserValidator);

    const userCreated = await prisma.user.create({
      data: {
        uuid: uuidv4(),
        pseudo: payload.pseudo,
        mail: payload.email,
        password: await Hash.make(payload.password),
      },
    });

    response.status(201);
    return userCreated;
  }

  public async readUser({ request, response }: HttpContextContract): Promise<User | null> {
    const uuid = request.param('uuid', '');

    const user = await prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    response.status(404);

    if (user) {
      response.status(200);
    }

    return user;
  }
}
