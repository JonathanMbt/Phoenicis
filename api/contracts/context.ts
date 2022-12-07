import { ForgottenShores } from '@phoenicis/core';

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    playerFS: ForgottenShores.PlayerFS | null;
  }
}
