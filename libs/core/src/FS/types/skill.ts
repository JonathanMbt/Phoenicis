import { Prisma } from "@prisma/client";

export const DefaultSkillSelect = Prisma.validator<Prisma.SkillSelect>()({
    uuid: true,
    name: true,
    description: true,
    imageUrl: true
})

export type Skill = Prisma.SkillGetPayload<{select: typeof DefaultSkillSelect}>
export type Skills = Skill[]
