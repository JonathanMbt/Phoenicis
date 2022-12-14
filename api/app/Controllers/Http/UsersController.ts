import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { prisma } from '@ioc:Adonis/Addons/Prisma';
import { User } from '@prisma/client';
import { Phoenicis } from '@phoenicis/core';
import { CreateUserValidator, UpdateUserValidator } from '../../Validators';
import { v4 as uuidv4 } from 'uuid';
import Hash from '@ioc:Adonis/Core/Hash';
import { UpdateAuthUserValidator } from '../../Validators';
import { ActionsAuthorizerContract } from '@ioc:Adonis/Addons/Bouncer';

export default class UsersController {
  /**
   * @readUsers
   * @responseBody {DefaultUserSelect[]} 200
   */
  public async readUsers({ bouncer, response }: HttpContextContract): Promise<Phoenicis.Users> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const users = await prisma.user.findMany({
      select: Phoenicis.DefaultUserSelect,
    });

    response.status(200);
    return users;
  }

  /**
   * @createUser
   * @requestBody {CreateUserValidator} required
   * @responseBody {DefaultUserSelect} 201
   */
  public async createUser(
    { request, bouncer, response }: HttpContextContract,
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
      select: Phoenicis.DefaultUserSelect,
    });

    response.status(201);
    return userCreated;
  }

  /**
   * @readUser
   * @responseBody {DefaultUserSelect} 200
   */
  public async readUser({
    request,
    bouncer,
    response,
  }: HttpContextContract): Promise<Phoenicis.User | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');

    const user = await prisma.user.findUnique({
      where: {
        uuid,
      },
      select: Phoenicis.DefaultUserSelect,
    });

    response.status(200);
    return user;
  }

  /**
   * @updateUser
   * @requestBody {UpdateUserValidator} required
   * @responseBody {DefaultUserSelect} 200
   */
  public async updateUser({
    request,
    bouncer,
    response,
  }: HttpContextContract): Promise<Phoenicis.User | null> {
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
      select: Phoenicis.DefaultUserSelect,
    });

    response.status(200);
    return user;
  }

  /**
   * @updateAuthUser
   * @requestBody {UpdateAuthUserValidator} required
   * @responseBody {DefaultUserSelect} 200
   */
  public async updateAuthUser({
    request,
    bouncer,
    auth,
    response,
  }: HttpContextContract): Promise<Phoenicis.User | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('user');

    const payload = await request.validate(UpdateAuthUserValidator);

    const user = await prisma.user.update({
      data: {
        ...payload,
        password: payload.password ? await Hash.make(payload.password) : undefined,
      },
      where: { uuid: auth.user?.uuid },
      select: Phoenicis.DefaultUserSelect,
    });

    response.status(200);
    return user;
  }

  /**
   * @deleteAuthUser
   * @responseBody {null} 204 Successful Operation
   */
  public async deleteAuthUser({ bouncer, auth, response }: HttpContextContract): Promise<null> {
    await bouncer.with('DefaultAccessPolicy').authorize('user');

    await prisma.user.delete({
      where: {
        uuid: auth.user?.uuid,
      },
      select: {},
    });

    response.status(204);
    return null;
  }

  /**
   * @deleteUser
   * @responseBody {null} 204 Successful Operation
   */
  public async deleteUser({ request, bouncer, response }: HttpContextContract): Promise<null> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');

    await prisma.user.delete({
      where: {
        uuid,
      },
      select: {},
    });

    response.status(204);
    return null;
  }
}
