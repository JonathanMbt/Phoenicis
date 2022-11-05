import fs from 'fs';

const cliArgs = process.argv.slice(2);

const name = cliArgs[0].toLowerCase();
const capitalName = cliArgs[0].charAt(0).toUpperCase() + cliArgs[0].slice(1);

const templateController = `import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { prisma } from '@ioc:Adonis/Addons/Prisma';
import { ${capitalName} } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export default class ${capitalName}Controller {
  public async read${capitalName}s({ bouncer }: HttpContextContract): Promise<${capitalName}[]> {
    await bouncer.with('DefaultAccessPolicy').authorize(TODO);

    const ${name}s = await prisma.${name}.findMany();

    return ${name}s;
  }

  public async create${capitalName}(
    { request, bouncer }: HttpContextContract): Promise<${capitalName}> {
      await bouncer.with('DefaultAccessPolicy').authorize(TODO);

    const payload = await request.validate(TODO);

    const ${name}Created = await prisma.${name}.create(TODO);

    return ${name}Created;
  }

  public async read${capitalName}({ request, bouncer }: HttpContextContract): Promise<${capitalName} | null> {
    await bouncer.with('DefaultAccessPolicy').authorize(TODO);

    const uuid = request.param('uuid', '');

    const ${name} = await prisma.${name}.findUnique(TODO);

    return ${name};
  }

  public async update${capitalName}({ request, bouncer }: HttpContextContract): Promise<${capitalName} | null> {
    await bouncer.with('DefaultAccessPolicy').authorize(TODO);

    const uuid = request.param('uuid', '');
    const payload = await request.validate(TODO);

    const ${name} = await prisma.${name}.update(TODO);

    return ${name};
  }

  public async updateAuth${capitalName}({
    request,
    bouncer,
    auth,
  }: HttpContextContract): Promise<${capitalName} | null> {
    await bouncer.with('DefaultAccessPolicy').authorize(TODO);

    const payload = await request.validate(TODO);

    const ${name} = await prisma.${name}.update(TODO);

    return ${name};
  }

  public async deleteAuth${capitalName}({ bouncer, auth }: HttpContextContract): Promise<${capitalName} | null> {
    await bouncer.with('DefaultAccessPolicy').authorize(TODO);

    const ${name} = await prisma.${name}.delete(TODO);

    return ${name};
  }

  public async delete${capitalName}({ request, bouncer }: HttpContextContract): Promise<${capitalName} | null> {
    await bouncer.with('DefaultAccessPolicy').authorize(TODO);

    const uuid = request.param('uuid', '');

    const ${name} = await prisma.${name}.delete(TODO);

    return ${name};
  }
}
`;

fs.writeFile(`./app/Controllers/Http/${capitalName}Controller.ts`, templateController, () => {});
