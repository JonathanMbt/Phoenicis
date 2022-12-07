import { OpenAPIV3 } from "openapi-types";

export interface SchemaProvider {
  parseSchemas(): Promise<{ [key: string]: OpenAPIV3.SchemaObject }>;
}
