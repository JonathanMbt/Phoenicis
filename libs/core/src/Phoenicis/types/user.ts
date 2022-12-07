import { Prisma } from "@prisma/client";

export const DefaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  uuid: true,
  pseudo: true,
  mail: true,
  policy: true,
  players: {
    select: {
      playerFSUuid: true,
    },
  },
});

export type User = Prisma.UserGetPayload<{ select: typeof DefaultUserSelect }>;
export type Users = User[];
