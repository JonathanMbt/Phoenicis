import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Rank, SubscribeRank } from '@prisma/client';

export default class UpdatePlayerFSValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    token: schema.string.optional({ escape: true }),
    subscribeRank: schema.enum.optional(Object.values(SubscribeRank)),
    money: schema.object.optional().members({
      gold: schema.number.optional(),
      custom: schema.number.optional(),
    }),
    level: schema.number.optional(),
    rank: schema.enum.optional(Object.values(Rank)),
    user: schema.string.optional({ escape: true }, [rules.uuid({ version: 4 })]),
    skills: schema.array
      .optional()
      .members(schema.string({ escape: true }, [rules.uuid({ version: 4 })])),
    pets: schema.array
      .optional()
      .members(schema.string({ escape: true }, [rules.uuid({ version: 4 })])),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {};
}
