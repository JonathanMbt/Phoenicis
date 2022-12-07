import { BaseCommand } from '@adonisjs/core/build/standalone';
import { GenSwagger, AdonisRoute } from '@phoenicis/adonis-to-swagger';
import swagger from '../app/Providers/swagger';

export default class DocsGenerate extends BaseCommand {
  public static commandName = 'docs:generate';

  public static description = '';

  public static settings = {
    loadApp: true,

    stayAlive: false,
  };

  public async run() {
    const Router = this.application.container.use('Adonis/Core/Route');
    Router.commit();
    const genSwagger = GenSwagger.getInstance(
      Router.toJSON() as { [domain: string]: AdonisRoute[] },
      swagger
    );
    console.log(await genSwagger.writeFile());
  }
}
