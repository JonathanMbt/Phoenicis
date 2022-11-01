import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { prisma } from '@ioc:Adonis/Addons/Prisma';
import { Pets } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import CreatePetValidator from '../../Validators/CreatePetValidator';
import UpdatePetValidator from '../../Validators/UpdatePetValidator';

export default class PetController {
  public async readPets({ bouncer }: HttpContextContract): Promise<Pets[]> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const pets = await prisma.pets.findMany();

    return pets;
  }

  public async createPet({ request, bouncer }: HttpContextContract): Promise<Pets> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const payload = await request.validate(CreatePetValidator);

    const petCreated = await prisma.pets.create({
      data: {
        uuid: uuidv4(),
        ...payload,
      },
    });

    return petCreated;
  }

  public async readPet({ request, bouncer }: HttpContextContract): Promise<Pets | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const uuid = request.param('uuid', '');

    const pet = await prisma.pets.findUnique({
      where: {
        uuid,
      },
    });

    return pet;
  }

  public async updatePet({ request, bouncer }: HttpContextContract): Promise<Pets | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const uuid = request.param('uuid', '');
    const payload = await request.validate(UpdatePetValidator);

    const pet = await prisma.pets.update({
      where: {
        uuid,
      },
      data: {
        ...payload,
      },
    });

    return pet;
  }

  public async deletePet({ request, bouncer }: HttpContextContract): Promise<Pets | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('unity');

    const uuid = request.param('uuid', '');

    const pet = await prisma.pets.delete({
      where: {
        uuid,
      },
    });

    return pet;
  }
}
