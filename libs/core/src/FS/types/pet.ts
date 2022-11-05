import { Prisma } from "@prisma/client";
import { DefaultSkillSelect } from "./skill";

export const DefaultPetSelect = Prisma.validator<Prisma.PetsSelect>()({
    uuid: true,
    name: true,
    race: true,
    variant: true,
    connection: true,
    skills: {
        select: DefaultSkillSelect
    },
    playerFSId: true
})

export type Pet = Prisma.PetsGetPayload<{select: typeof DefaultPetSelect}>
export type Pets = Pet[]
