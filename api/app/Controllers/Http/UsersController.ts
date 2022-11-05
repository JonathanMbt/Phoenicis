import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { prisma } from '@ioc:Adonis/Addons/Prisma';
import { User } from '@prisma/client';
import { Phoenicis } from '@phoenicis/core'
import CreateUserValidator from '../../Validators/CreateUserValidator';
import { v4 as uuidv4 } from 'uuid';
import Hash from '@ioc:Adonis/Core/Hash';
import UpdateUserValidator from 'api/app/Validators/UpdateUserValidator';
import UpdateAuthUserValidator from 'api/app/Validators/UpdateAuthUserValidator';
import { ActionsAuthorizerContract } from '@ioc:Adonis/Addons/Bouncer';

export default class UsersController {
  public async readUsers({ bouncer }: HttpContextContract): Promise<Phoenicis.Users> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const users = await prisma.user.findMany({
      select: Phoenicis.DefaultUserSelect
    });

    return users;
  }

  public async createUser(
    { request, bouncer }: HttpContextContract,
    adminBouncer?: ActionsAuthorizerContract<User | null>
  ): Promise<Phoenicis.User> {
    const payloadBouncer = adminBouncer ? adminBouncer : bouncer;
    await payloadBouncer.with('DefaultAccessPolicy').authorize('admin');

    const payload = await request.validate(CreateUserValidator);

    const userCreated = await prisma.user.create({
      data: {
        uuid: uuidv4(),
        pseudo: payload.pseudo,
        mail: payload.email,
        password: await Hash.make(payload.password),
        players: {
          create: {
            uuid: uuidv4(),
          },
        },
      },
      select: Phoenicis.DefaultUserSelect
    });

    return userCreated;
  }

  public async readUser({ request, bouncer }: HttpContextContract): Promise<Phoenicis.User | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');

    const user = await prisma.user.findUnique({
      where: {
        uuid,
      },
      select: Phoenicis.DefaultUserSelect
    });

    return user;
  }

  public async updateUser({ request, bouncer }: HttpContextContract): Promise<Phoenicis.User | null> {
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
      select: Phoenicis.DefaultUserSelect
    });

    return user;
  }

  public async updateAuthUser({
    request,
    bouncer,
    auth,
  }: HttpContextContract): Promise<Phoenicis.User | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('user');

    const payload = await request.validate(UpdateAuthUserValidator);

    const user = await prisma.user.update({
      data: {
        ...payload,
        password: payload.password ? await Hash.make(payload.password) : undefined,
      },
      where: { uuid: auth.user?.uuid },
      select: Phoenicis.DefaultUserSelect
    });

    return user;
  }

  public async deleteAuthUser({ bouncer, auth }: HttpContextContract): Promise<Phoenicis.User | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('user');

    const user = await prisma.user.delete({
      where: {
        uuid: auth.user?.uuid,
      },
      select: Phoenicis.DefaultUserSelect
    });

    return user;
  }

  public async deleteUser({ request, bouncer }: HttpContextContract): Promise<Phoenicis.User | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');

    const user = await prisma.user.delete({
      where: {
        uuid,
      },
      select: Phoenicis.DefaultUserSelect
    });

    return user;
  }
}
