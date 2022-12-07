import { Prisma } from "@prisma/client";
import { DefaultPetsSelect } from "./pet";
import { DefaultSkillSelect } from "./skill";

export const DefaultPlayerFSSelect = Prisma.validator<Prisma.PlayerFSSelect>()({
  uuid: true,
  subscribeRank: true,
  money: true,
  level: true,
  rank: true,
  skills: {
    select: DefaultSkillSelect,
  },
  pets: {
    select: DefaultPetsSelect,
  },
  Players: {
    select: {
      uuid: true,
    },
  },
});

export type PlayerFS = Prisma.PlayerFSGetPayload<{
  select: typeof DefaultPlayerFSSelect;
}>;
export type PlayersFS = PlayerFS[];
