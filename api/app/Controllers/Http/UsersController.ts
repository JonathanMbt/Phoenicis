import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { prisma } from '@ioc:Adonis/Addons/Prisma';
import { User } from '@prisma/client';
import CreateUserValidator from '../../Validators/CreateUserValidator';
import { v4 as uuidv4 } from 'uuid';
import Hash from '@ioc:Adonis/Core/Hash';
import UpdateUserValidator from 'api/app/Validators/UpdateUserValidator';
import UpdateAuthUserValidator from 'api/app/Validators/UpdateAuthUserValidator';
import { ActionsAuthorizerContract } from '@ioc:Adonis/Addons/Bouncer';

export default class UsersController {
  public async readUsers({ response, bouncer }: HttpContextContract): Promise<User[]> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const users = await prisma.user.findMany();

    response.status(200);
    return users;
  }

  public async createUser(
    { request, response, bouncer }: HttpContextContract,
    adminBouncer?: ActionsAuthorizerContract<User | null>
  ): Promise<User> {
    if (adminBouncer === undefined) {
      await bouncer.with('DefaultAccessPolicy').authorize('admin');
    } else {
      await adminBouncer.with('DefaultAccessPolicy').authorize('admin');
    }

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

  public async updateUser({
    request,
    response,
    bouncer,
  }: HttpContextContract): Promise<User | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const uuid = request.param('uuid', '');
    const payload = await request.validate(UpdateUserValidator);

    const user = await prisma.user.update({
      data: {
        ...payload,
      },
      where: {
        uuid,
      },
    });

    response.status(200);
    return user;
  }

  public async updateAuthUser({
    request,
    response,
    bouncer,
    auth,
  }: HttpContextContract): Promise<User | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('user');

    const payload = await request.validate(UpdateAuthUserValidator);

    const user = await prisma.user.update({
      data: {
        ...payload,
        password: payload.password ? await Hash.make(payload.password) : undefined,
      },
      where: { uuid: auth.user?.uuid },
    });

    response.status(200);
    return user;
  }

  public async deleteAuthUser({
    response,
    bouncer,
    auth,
  }: HttpContextContract): Promise<User | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('user');

    const user = await prisma.user.delete({
      where: {
        uuid: auth.user?.uuid,
      },
    });

    response.status(200);
    return user;
  }

  public async deleteUser({
    request,
    response,
    bouncer,
  }: HttpContextContract): Promise<User | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');

    const user = await prisma.user.delete({
      where: {
        uuid,
      },
    });

    response.status(200);
    return user;
  }
}
