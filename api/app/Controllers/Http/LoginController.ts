import { prisma } from '@ioc:Adonis/Addons/Prisma';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { User } from '@prisma/client';
import { LoginUserValidator } from '../../Validators/';

export default class LoginController {
  /**
   * @login
   * @requestBody {LoginUserValidator} required
   * @responseBody {{"type": "object", "properties": {"token": {"type": "string"}}}} 200
   */
  public async login({ request, response, auth }: HttpContextContract): Promise<{ token: string }> {
    const payload = await request.validate(LoginUserValidator);

    const tk = await auth.use('api').attempt(payload.email, payload.password, { expiresIn: '1h' });

    response.status(200);
    return { token: tk.token };
  }

  /**
   * @register
   * @requestBody {CreateUserValidator} required
   * @responseBody {{"type": "object", "properties": {"token": {"type": "string"}}}} 201
   */
  public async register(httpContext: HttpContextContract): Promise<{ token: string }> {
    const { default: UsersController } = await import('./UsersController');

    const admin = await prisma.user.findUnique({ where: { mail: 'admin@phoenicis-game.com' } });
    const adminAuth = httpContext.bouncer.forUser(admin);

    const user = await new UsersController().createUser(httpContext, adminAuth);

    const token = await httpContext.auth.use('api').loginViaId(user.uuid, { expiresIn: '1h' });
    httpContext.response.status(201);
    return { token: token.token };
  }

  /**
   * @me
   * @responseBody {DefaultUserSelect} 200
   * @responseBody {null} 401 Unauthorized
   * @responseBody {null} 404
   */
  public async me({ auth, response, bouncer }: HttpContextContract): Promise<User | null> {
    await bouncer.with('DefaultAccessPolicy').authorize('user');
    const me = auth.user;
    if (me) {
      response.status(200);
      return me;
    }

    response.status(404);
    return null;
  }
}
