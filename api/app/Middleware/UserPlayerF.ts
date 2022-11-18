import { prisma } from '@ioc:Adonis/Addons/Prisma';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ForgottenShores } from 'libs/core/dist';

export default class UserPlayerF {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const playerFSUuid = (
      await prisma.user.findUnique({
        where: {
          uuid: ctx.request.param('uuid', ''),
        },
        select: {
          players: {
            select: {
              playerFSUuid: true,
            },
          },
        },
      })
    )?.players?.playerFSUuid;

    ctx.playerFS = playerFSUuid
      ? await prisma.playerFS.findUnique({
          where: {
            uuid: playerFSUuid,
          },
          select: ForgottenShores.DefaultPlayerFSSelect,
        })
      : null;
    await next();
  }
}
