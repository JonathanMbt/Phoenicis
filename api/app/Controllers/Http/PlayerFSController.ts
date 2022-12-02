import { ActionsAuthorizerContract } from '@ioc:Adonis/Addons/Bouncer';
import { prisma } from '@ioc:Adonis/Addons/Prisma';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ForgottenShores } from '@phoenicis/core';
import { User } from '@prisma/client';
import { toBeAdded, toBeDeleted } from 'api/app/Functions/prismaHelpers';
import { v4 as uuidv4 } from 'uuid';
import CreatePlayerFSValidator from '../../Validators/PlayerFS/CreatePlayerFValidator';
import UpdatePlayerFSValidator from '../../Validators/PlayerFS/UpdatePlayerFValidator';

export default class PlayerFSController {
  public async readPlayersFS({ bouncer }: HttpContextContract): Promise<ForgottenShores.PlayersFS> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const players = await prisma.playerFS.findMany({
      select: ForgottenShores.DefaultPlayerFSSelect,
    });

    return players;
  }

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

  public async deleteAuthPlayerFS(
    httpContext: HttpContextContract
  ): Promise<ForgottenShores.PlayerFS | null> {
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
    const player = this.deletePlayerFS(httpContext, adminAuth);

    return player;
  }

  public async deletePlayerFS(
    { request, bouncer }: HttpContextContract,
    adminBouncer?: ActionsAuthorizerContract<User | null>
  ): Promise<ForgottenShores.PlayerFS | null> {
    const dependantBouncer = adminBouncer ?? bouncer;

    await dependantBouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');
    console.debug(uuid);

    const player = await prisma.playerFS.delete({
      where: {
        uuid,
      },
      select: ForgottenShores.DefaultPlayerFSSelect,
    });

    return player;
  }
}
