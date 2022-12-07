import { Prisma } from "@prisma/client";
import { DefaultSkillSelect } from "./skill";

export const DefaultPetsSelect = Prisma.validator<Prisma.PetsSelect>()({
  uuid: true,
  name: true,
  race: true,
  variant: true,
  connection: true,
  skills: {
    select: DefaultSkillSelect,
  },
  playerFSId: true,
});

export type Pet = Prisma.PetsGetPayload<{ select: typeof DefaultPetsSelect }>;
export type Pets = Pet[];
