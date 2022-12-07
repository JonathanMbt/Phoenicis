import { prisma } from '@ioc:Adonis/Addons/Prisma';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Phoenicis } from '@phoenicis/core';
import { v4 as uuidv4 } from 'uuid';
import { CreatePlayerValidator, UpdatePlayerValidator } from '../../Validators';

export default class PlayerController {
  /**
   * @readPlayers
   * @responseBody {DefaultPlayersSelect[]} 200
   * @responseBody {null} 401 Unauthorized
   */
  public async readPlayers({ bouncer }: HttpContextContract): Promise<Phoenicis.Players> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const players = await prisma.players.findMany({
      select: Phoenicis.DefaultPlayersSelect,
    });

    return players;
  }

  /**
   * @createPlayer
   * @requestBody {CreatePlayerValidator} required
   * @responseBody {DefaultPlayersSelect} 201
   * @responseBody {null} 401 Unauthorized
   */
  public async createPlayer({
    request,
    bouncer,
    response,
  }: HttpContextContract): Promise<Phoenicis.Player> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const payload = await request.validate(CreatePlayerValidator);

    const playerCreated = await prisma.players.create({
      data: {
        uuid: uuidv4(),
        ...payload,
      },
      select: Phoenicis.DefaultPlayersSelect,
    });

    response.status(201);
    return playerCreated;
  }

  /**
   * @readPlayer
   * @responseBody {DefaultPlayersSelect} 200
   * @responseBody {null} 401 Unauthorized
   */
  public async readPlayer({
    request,
    bouncer,
  }: HttpContextContract): Promise<Phoenicis.Player | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const uuid = request.param('uuid', '');

    const player = await prisma.players.findUnique({
      where: {
        uuid,
      },
      select: Phoenicis.DefaultPlayersSelect,
    });

    return player;
  }

  /**
   * @updatePlayer
   * @requestBody {UpdatePlayerValidator} required
   * @responseBody {DefaultPlayersSelect} 200
   * @responseBody {null} 401 Unauthorized
   */
  public async updatePlayer({
    request,
    bouncer,
  }: HttpContextContract): Promise<Phoenicis.Player | null> {
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
      select: Phoenicis.DefaultPlayersSelect,
    });

    return player;
  }

  /**
   * @deletePlayer
   * @responseBody {null} 204 Successful Operation
   * @responseBody {null} 401 Unauthorized
   */
  public async deletePlayer({ request, bouncer, response }: HttpContextContract): Promise<null> {
    await bouncer.with('DefaultAccessPolicy').authorize('admin');

    const uuid = request.param('uuid', '');

    await prisma.players.delete({
      where: {
        uuid,
      },
      select: Phoenicis.DefaultPlayersSelect,
    });

    response.status(204);
    return null;
  }
}
