import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer';
import { Policies, User } from '@prisma/client';

export default class DefaultAccessPolicy extends BasePolicy {
  public async before(user: User | null) {
    if (user && user.policy === Policies.ADMIN) {
      return true;
    }
  }

  public async unity(user: User) {
    return user.policy === Policies.UNITY;
  }

  public async user(user: User) {
    return user.policy === Policies.USER;
  }

  public async admin(user: User) {
    return user.policy === Policies.ADMIN;
  }
}
