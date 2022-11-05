import { Prisma } from "@prisma/client";

export const DefaultPlayersSelect = Prisma.validator<Prisma.PlayersSelect>()({
    uuid: true,
    playerFSUuid: true,
    userId: true
})

export type Player = Prisma.PlayersGetPayload<{select: typeof DefaultPlayersSelect}>
export type Players = Player[]
