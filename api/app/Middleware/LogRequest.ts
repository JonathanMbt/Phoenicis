import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class LogRequest {
  public async handle({ request, logger, auth }: HttpContextContract, next: () => Promise<void>) {
    logger.info(`(${auth.user?.uuid ?? 'Not Logged In'}) ${request.method()}: ${request.url()}`);

    await next();
  }
}
