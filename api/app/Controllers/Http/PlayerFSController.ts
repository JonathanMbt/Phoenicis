import { ActionsAuthorizerContract } from '@ioc:Adonis/Addons/Bouncer';
import { prisma } from '@ioc:Adonis/Addons/Prisma';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ForgottenShores } from '@phoenicis/core';
import { User } from '@prisma/client';
import { toBeAdded, toBeDeleted } from 'api/app/Functions/prismaHelpers';
import { v4 as uuidv4 } from 'uuid';
import { CreatePlayerFSValidator, UpdatePlayerFSValidator } from '../../Validators';

export default class PlayerFSController {
  /**
   * @readPlayersFS
   * @responseBody {DefaultPlayerFSSelect[]} 200
   * @responseBody {null} 401 Unauthorized
   */
  public async readPlayersFS({ bouncer }: HttpContextContract): Promise<ForgottenShores.PlayersFS> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const players = await prisma.playerFS.findMany({
      select: ForgottenShores.DefaultPlayerFSSelect,
    });

    return players;
  }

  /**
   * @createPlayerFS
   * @requestBody {CreatePlayerFSValidator} required
   * @responseBody {DefaultPlayerFSSelect} 201
   * @responseBody {null} 401 Unauthorized
   */
  public async createPlayerFS({
    request,
    bouncer,
  }: HttpContextContract): Promise<ForgottenShores.PlayerFS> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

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
      select: ForgottenShores.DefaultPlayerFSSelect,
    });

    return playerCreate;
  }

  /**
   * @readPlayerFS
   * @responseBody {DefaultPlayerFSSelect} 200
   * @responseBody {null} 401 Unauthorized
   */
  public async readPlayerFS({
    request,
    bouncer,
  }: HttpContextContract): Promise<ForgottenShores.PlayerFS | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const uuid = request.param('uuid', '');

    const player = await prisma.playerFS.findUnique({
      where: {
        uuid,
      },
      select: ForgottenShores.DefaultPlayerFSSelect,
    });

    return player;
  }

  /**
   * @updatePlayerFS
   * @requestBody {UpdatePlayerFSValidator} required
   * @responseBody {DefaultPlayerFSSelect} 200
   * @responseBody {null} 401 Unauthorized
   */
  public async updatePlayerFS({
    request,
    bouncer,
    playerFS,
  }: HttpContextContract): Promise<ForgottenShores.PlayerFS | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');
    if (playerFS === null) return null;

    const uuid = request.param('uuid', '');
    const payload = await request.validate(UpdatePlayerFSValidator);

    const { user, skills, pets, ...prismaPayload } = payload;

    const toBeDeletedSkills = skills ? toBeDeleted(playerFS.skills, skills) : undefined;

    const toBeAddedSkills = skills ? toBeAdded(playerFS.skills, skills) : undefined;

    const toBeDeletedPets = pets ? toBeDeleted(playerFS.pets, pets) : undefined;

    const toBeAddedPets = pets ? toBeAdded(playerFS.pets, pets) : undefined;

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
        skills: {
          connect: toBeAddedSkills,
          disconnect: toBeDeletedSkills,
        },
        pets: {
          connect: toBeAddedPets,
          disconnect: toBeDeletedPets,
        },
      },
      where: {
        uuid,
      },
      select: ForgottenShores.DefaultPlayerFSSelect,
    });

    return player;
  }

  /**
   * @deleteAuthPlayerFS
   * @responseBody {null} 204 Successful Operation
   * @responseBody {null} 401 Unauthorized
   */
  public async deleteAuthPlayerFS(httpContext: HttpContextContract): Promise<null> {
    await httpContext.bouncer.with('DefaultAccessPolicy').authorize('user');

    const admin = await prisma.user.findUnique({ where: { mail: 'admin@phoenicis-game.com' } });
    const adminAuth = httpContext.bouncer.forUser(admin);

    const playerUuid = await prisma.players.findUnique({
      where: {
        userId: httpContext.auth.user?.uuid,
      },
      select: { ...ForgottenShores.DefaultPlayerFSSelect, playerFS: { select: { uuid: true } } },
    });

    httpContext.params['uuid'] = playerUuid?.playerFS?.uuid;
    await this.deletePlayerFS(httpContext, adminAuth);

    return null;
  }

  /**
   * @deletePlayerFS
   * @responseBody {null} 204
   * @responseBody {null} 401 Unauthorized
   */
  public async deletePlayerFS(
    { request, bouncer }: HttpContextContract,
    adminBouncer?: ActionsAuthorizerContract<User | null>
  ): Promise<null> {
    const dependantBouncer = adminBouncer ?? bouncer;

    await dependantBouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');
    console.debug(uuid);

    await prisma.playerFS.delete({
      where: {
        uuid,
      },
      select: ForgottenShores.DefaultPlayerFSSelect,
    });

    return null;
  }
}
