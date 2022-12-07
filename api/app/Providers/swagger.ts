import { GenOptions } from '@phoenicis/adonis-to-swagger';
import { ValidatorSchema } from '../Providers/ValidatorSchema';
import { PrismaSchema } from './PrismaSchema';

const swagger: GenOptions = {
  title: 'Forgotten Shores API',
  version: '0.1.0',
  excludedRoutes: ['/doc/swagger', '/doc'],
  servers: [{ url: 'https://phoenicis-game.com/api' }],
  schemaProviders: [new PrismaSchema(), new ValidatorSchema()],
};

export default swagger;
