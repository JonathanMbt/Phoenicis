import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { prisma } from '@ioc:Adonis/Addons/Prisma';
import { Players } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import CreatePlayerValidator from '../../Validators/CreatePlayerValidator';
import UpdatePlayerValidator from '../../Validators/UpdatePlayerValidator';

export default class PlayerController {
  public async readPlayers({ bouncer }: HttpContextContract): Promise<Players[]> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const players = await prisma.players.findMany();

    return players;
  }

  public async createPlayer({ request, bouncer }: HttpContextContract): Promise<Players> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const payload = await request.validate(CreatePlayerValidator);

    const playerCreated = await prisma.players.create({
      data: {
        uuid: uuidv4(),
        ...payload,
      },
    });

    return playerCreated;
  }

  public async readPlayer({ request, bouncer }: HttpContextContract): Promise<Players | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const uuid = request.param('uuid', '');

    const player = await prisma.players.findUnique({
      where: {
        uuid,
      },
    });

    return player;
  }

  public async updatePlayer({ request, bouncer }: HttpContextContract): Promise<Players | null> {
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
    });

    return player;
  }

  public async deletePlayer({ request, bouncer }: HttpContextContract): Promise<Players | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');

    const player = await prisma.players.delete({
      where: {
        uuid,
      },
    });

    return player;
  }
}
