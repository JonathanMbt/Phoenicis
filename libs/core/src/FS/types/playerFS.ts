import { Prisma } from "@prisma/client";
import { DefaultPetSelect } from "./pet";

export const DefaultPlayerFSSelect = Prisma.validator<Prisma.PlayerFSSelect>()({
    uuid: true,
    subscribeRank: true,
    money: true,
    level: true,
    rank: true,
    skills: true,
    pets: {
        select: DefaultPetSelect
    },
    Players: {
        select: {
            uuid: true
        }
    }
})

export type PlayerFS = Prisma.PlayerFSGetPayload<{select: typeof DefaultPlayerFSSelect}>
export type PlayersFS = PlayerFS[]
