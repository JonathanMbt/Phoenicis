import { prisma } from '@ioc:Adonis/Addons/Prisma';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Phoenicis } from '@phoenicis/core';
import { v4 as uuidv4 } from 'uuid';
import CreatePlayerValidator from '../../Validators/CreatePlayerValidator';
import UpdatePlayerValidator from '../../Validators/UpdatePlayerValidator';

export default class PlayerController {
  public async readPlayers({ bouncer }: HttpContextContract): Promise<Phoenicis.Players> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const players = await prisma.players.findMany({
      select: Phoenicis.DefaultPlayersSelect
    });

    return players;
  }

  public async createPlayer({ request, bouncer }: HttpContextContract): Promise<Phoenicis.Player> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const payload = await request.validate(CreatePlayerValidator);

    const playerCreated = await prisma.players.create({
      data: {
        uuid: uuidv4(),
        ...payload,
      },
      select: Phoenicis.DefaultPlayersSelect
    });

    return playerCreated;
  }

  public async readPlayer({ request, bouncer }: HttpContextContract): Promise<Phoenicis.Player | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const uuid = request.param('uuid', '');

    const player = await prisma.players.findUnique({
      where: {
        uuid,
      },
      select: Phoenicis.DefaultPlayersSelect
    });

    return player;
  }

  public async updatePlayer({ request, bouncer }: HttpContextContract): Promise<Phoenicis.Player | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');
    const payload = await request.validate(UpdatePlayerValidator);

    const player = await prisma.players.update({
      where: {
        uuid,
      },
      data: {
        ...payload,
      },
      select: Phoenicis.DefaultPlayersSelect
    });

    return player;
  }

  public async deletePlayer({ request, bouncer }: HttpContextContract): Promise<Phoenicis.Player | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');

    const player = await prisma.players.delete({
      where: {
        uuid,
      },
      select: Phoenicis.DefaultPlayersSelect
    });

    return player;
  }
}
