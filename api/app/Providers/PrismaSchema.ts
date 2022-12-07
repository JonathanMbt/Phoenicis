import * as Schemas from '@phoenicis/core';
import { Prisma } from '@prisma/client';
import { SchemaProvider } from '@phoenicis/adonis-to-swagger';
import { OpenAPIV3 } from 'openapi-types';

export class PrismaSchema implements SchemaProvider {
  private prismaSchema: { [key: string]: OpenAPIV3.SchemaObject };
  private addedPrismaSchema: { [key: string]: OpenAPIV3.SchemaObject };

  private getModuleContent(module: object) {
    const content = {};
    Object.keys(module).forEach((subKey) => {
      if (typeof module[subKey] === 'object') {
        content[subKey] = this.getModuleContent(module[subKey]);
      } else {
        if (subKey.startsWith('__esModule')) return;
        content[subKey] = module[subKey];
      }
    });
    return content;
  }

  private isSchema(object: object): boolean {
    let result = false;
    Object.values(object).forEach((objectValue) => {
      if (typeof objectValue !== 'object') result = true;
    });
    return result;
  }

  private isSchemaObject(
    object: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
  ): object is OpenAPIV3.SchemaObject {
    return (object as OpenAPIV3.SchemaObject).type !== undefined;
  }

  private getModelFromBody(body: object): [string, OpenAPIV3.SchemaObject] | undefined {
    return Object.entries(this.prismaSchema).find(([_, schemaBody]) => {
      return Object.keys(body)
        .map((bodyKey) => {
          return Object.keys(schemaBody.properties ?? {}).includes(bodyKey);
        })
        .every((element) => element === true);
    });
  }

  private generateSelectSchema(module: object): { [schemaName: string]: OpenAPIV3.SchemaObject } {
    let content: { [schemaName: string]: OpenAPIV3.SchemaObject } = {};
    Object.keys(module).forEach((modelName) => {
      if (this.isSchema(module[modelName])) {
        const baseSchema = this.getModelFromBody(module[modelName]);
        if (baseSchema === undefined) return;

        const props = {};
        Object.keys(module[modelName]).forEach((property) => {
          const sc = baseSchema[1];
          if (sc === undefined) return {};
          if (sc.properties === undefined) return {};
          if (typeof module[modelName][property] === 'object') {
            const prop = sc.properties[property];
            if (this.isSchemaObject(prop)) {
              props[property] = {
                type: 'array',
                items: this.generateSelectSchema(module[modelName][property])['select'],
              };
            } else {
              props[property] = this.generateSelectSchema(module[modelName][property])['select'];
            }
          } else {
            props[property] = sc.properties[property];
          }
        });
        content[modelName] = {
          type: 'object',
          properties: props,
        };
      } else {
        content = { ...content, ...this.generateSelectSchema(module[modelName]) };
      }
    });
    return content;
  }

  private parseType(type: string) {
    switch (type) {
      case 'BigInt':
      case 'Int':
        return 'integer';
      case 'Float':
      case 'Decimal':
        return 'number';
      case 'DateTime':
      case 'String':
        return 'string';
      case 'Boolean':
        return 'boolean';
      default:
        return 'object';
    }
  }

  private getBodyFromField(
    field: Prisma.DMMF.Field
  ): OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject {
    let body: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject = {};
    if (field.isList) {
      body = { type: 'array', items: {} };
      if (field.kind === 'scalar') {
        body.items = { type: this.parseType(field.type) };
      } else {
        body.items = { $ref: `#/components/schemas/${field.type}` };
      }
    } else {
      if (field.kind === 'scalar') {
        body = { type: this.parseType(field.type) };
      } else {
        body = { $ref: `#/components/schemas/${field.type}` };
      }
    }
    return body;
  }

  private generateSchema(): { [schemaName: string]: OpenAPIV3.SchemaObject } {
    const schema: { [schemaName: string]: OpenAPIV3.SchemaObject } = {};
    const prismaDefinition = Prisma.dmmf.datamodel;

    const keys = ['models', 'types'];

    keys.forEach((key) => {
      prismaDefinition[key].forEach((model) => {
        schema[model.name] = { type: 'object', properties: {} };
        model.fields.forEach((field) => {
          schema[model.name].properties = {
            ...schema[model.name].properties,
            [field.name]: this.getBodyFromField(field),
          };
        });
      });
    });

    prismaDefinition.enums.forEach((model) => {
      schema[model.name] = { type: 'string', enum: [] };
      model.values.forEach((value) => {
        const previous = schema[model.name].enum;
        if (previous === undefined) return;
        schema[model.name].enum = [...previous, value.name];
      });
    });

    return schema;
  }

  public async parseSchemas(): Promise<{ [key: string]: OpenAPIV3.SchemaObject }> {
    this.prismaSchema = this.generateSchema();
    const schemas = this.getModuleContent(Schemas);
    this.addedPrismaSchema = this.generateSelectSchema(schemas);
    return { ...this.prismaSchema, ...this.addedPrismaSchema };
  }
}
