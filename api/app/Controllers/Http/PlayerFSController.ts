import { ActionsAuthorizerContract } from '@ioc:Adonis/Addons/Bouncer';
import { prisma } from '@ioc:Adonis/Addons/Prisma';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { PlayerFS, User } from '@prisma/client';
import CreatePlayerFSValidator from '../../Validators/CreatePlayerFValidator';
import UpdatePlayerFSValidator from '../../Validators/UpdatePlayerFValidator';
import { v4 as uuidv4 } from 'uuid';

export default class PlayerFSController {
  public async readPlayersFS({ bouncer }: HttpContextContract): Promise<PlayerFS[]> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const players = await prisma.playerFS.findMany({
      include: {
        Players: {
          select: {
            uuid: true,
            userId: true,
          },
        },
      },
    });

    return players;
  }

  public async createPlayerFS({ request, bouncer }: HttpContextContract): Promise<PlayerFS> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const payload = await request.validate(CreatePlayerFSValidator);

    const { user, ...prismaPayload } = payload;

    const playerCreate = await prisma.playerFS.create({
      data: {
        uuid: uuidv4(),
        token: uuidv4(),
        ...prismaPayload,
        money: prismaPayload.money ?? {},
        Players: payload.user
          ? {
              connectOrCreate: {
                where: {
                  userId: payload.user,
                },
                create: {
                  uuid: uuidv4(),
                  userId: payload.user,
                },
              },
            }
          : undefined,
      },
      include: {
        Players: {
          select: {
            uuid: true,
            userId: true,
          },
        },
      },
    });

    return playerCreate;
  }

  public async readPlayerFS({ request }: HttpContextContract): Promise<PlayerFS | null> {
    const uuid = request.param('uuid', '');

    const player = await prisma.playerFS.findUnique({
      where: {
        uuid,
      },
      include: {
        Players: {
          select: {
            uuid: true,
            userId: true,
          },
        },
      },
    });

    return player;
  }

  public async updatePlayerFS({ request, bouncer }: HttpContextContract): Promise<PlayerFS | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const uuid = request.param('uuid', '');
    const payload = await request.validate(UpdatePlayerFSValidator);

    const { user, ...prismaPayload } = payload;

    const player = await prisma.playerFS.update({
      data: {
        ...prismaPayload,
        money: prismaPayload.money ?? {},
        Players: payload.user
          ? {
              disconnect: true,
              connect: {
                userId: payload.user,
              },
            }
          : undefined,
      },
      where: {
        uuid,
      },
      include: {
        Players: {
          select: {
            uuid: true,
            userId: true,
          },
        },
      },
    });

    return player;
  }

  public async deleteAuthPlayerFS(httpContext: HttpContextContract): Promise<PlayerFS | null> {
    await httpContext.bouncer.with('DefaultAccessPolicy').authorize('user');

    const admin = await prisma.user.findUnique({ where: { mail: 'admin@phoenicis-game.com' } });
    const adminAuth = httpContext.bouncer.forUser(admin);

    const playerUuid = await prisma.players.findUnique({
      where: {
        userId: httpContext.auth.user?.uuid,
      },
      select: {
        playerFS: {
          select: {
            uuid: true,
          },
        },
      },
    });

    httpContext.params['uuid'] = playerUuid?.playerFS?.uuid;
    const player = this.deletePlayerFS(httpContext, adminAuth);

    return player;
  }

  public async deletePlayerFS(
    { request, bouncer }: HttpContextContract,
    adminBouncer?: ActionsAuthorizerContract<User | null>
  ): Promise<PlayerFS | null> {
    const dependantBouncer = adminBouncer ?? bouncer;

    await dependantBouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');
    console.debug(uuid);

    const player = await prisma.playerFS.delete({
      where: {
        uuid,
      },
      include: {
        Players: {
          select: {
            uuid: true,
            userId: true,
          },
        },
      },
    });

    return player;
  }
}
