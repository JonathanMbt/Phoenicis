import { prisma } from '@ioc:Adonis/Addons/Prisma';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ForgottenShores } from '@phoenicis/core';
import { toBeAdded, toBeDeleted } from '../../Functions/prismaHelpers';
import { v4 as uuidv4 } from 'uuid';
import CreatePetValidator from '../../Validators/Pets/CreatePetValidator';
import UpdatePetValidator from '../../Validators/Pets/UpdatePetValidator';

export default class PetController {
  public async readPets({ bouncer }: HttpContextContract): Promise<ForgottenShores.Pets> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const pets = await prisma.pets.findMany({
      select: ForgottenShores.DefaultPetSelect,
    });

    return pets;
  }

  public async createPet({ request, bouncer }: HttpContextContract): Promise<ForgottenShores.Pet> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const payload = await request.validate(CreatePetValidator);

    const petCreated = await prisma.pets.create({
      data: {
        uuid: uuidv4(),
        ...payload,
      },
      select: ForgottenShores.DefaultPetSelect,
    });

    return petCreated;
  }

  public async readPet({
    request,
    bouncer,
  }: HttpContextContract): Promise<ForgottenShores.Pet | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const uuid = request.param('uuid', '');

    const pet = await prisma.pets.findUnique({
      where: {
        uuid,
      },
      select: ForgottenShores.DefaultPetSelect,
    });

    return pet;
  }

  public async updatePet({
    request,
    bouncer,
    playerFS
  }: HttpContextContract): Promise<ForgottenShores.Pet | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');
    if (playerFS === null) return null;

    const uuid = request.param('uuid', '');
    const oldPet = playerFS.pets.find(pet => {pet.uuid === uuid})
    if(oldPet === undefined) return null;

    const { skills, ...payload } = await request.validate(UpdatePetValidator);
    
    const toBeDeletedSkills = skills ? toBeDeleted(oldPet.skills, skills) : undefined;

    const toBeAddedSkills = skills ? toBeAdded(oldPet.skills, skills) : undefined;

    const pet = await prisma.pets.update({
      where: {
        uuid,
      },
      data: {
        ...payload,
        skills: {
          connect: toBeAddedSkills,
          disconnect: toBeDeletedSkills
        }
      },
      select: ForgottenShores.DefaultPetSelect,
    });

    return pet;
  }

  public async deletePet({
    request,
    bouncer,
  }: HttpContextContract): Promise<ForgottenShores.Pet | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const uuid = request.param('uuid', '');

    const pet = await prisma.pets.delete({
      where: {
        uuid,
      },
      select: ForgottenShores.DefaultPetSelect,
    });

    return pet;
  }
}
