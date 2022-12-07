import { SchemaProvider } from '@phoenicis/adonis-to-swagger';
import { OpenAPIV3 } from 'openapi-types';
import * as Validators from '../Validators';
import {
  ParsedSchemaTree,
  SchemaObject,
  SchemaArray,
  SchemaLiteral,
} from '@ioc:Adonis/Core/Validator';

export class ValidatorSchema implements SchemaProvider {
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

  private parseType(type: string) {
    switch (type) {
      case 'string':
      case 'enum':
        return 'string';
      case 'number':
        return type;
    }
  }

  private getBodyFromTree(
    propertyTree: SchemaLiteral | SchemaArray | SchemaObject
  ): OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject {
    let body: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject = {};
    switch (propertyTree.type) {
      case 'literal':
        body = { type: this.parseType(propertyTree.subtype) };
        if (propertyTree.subtype === 'enum')
          body['enum'] = propertyTree.rules[0].compiledOptions.choices;
        break;
      case 'object':
        const childrens = propertyTree.children;
        const props = {};
        if (childrens) {
          Object.keys(childrens).forEach((property) => {
            props[property] = this.getBodyFromTree(childrens[property]);
          });
          body = {
            type: 'object',
            properties: props,
          };
        }
        break;
      case 'array':
        if (propertyTree.each) {
          body = {
            type: 'array',
            items: this.getBodyFromTree(propertyTree.each),
          };
        }
        break;
    }
    return body;
  }

  public async generateSchema(
    module: object
  ): Promise<{ [schemaName: string]: OpenAPIV3.SchemaObject }> {
    const schemas: { [schemaName: string]: OpenAPIV3.SchemaObject } = {};
    Object.keys(module).forEach((validator) => {
      const validatorSchema: ParsedSchemaTree = new module[validator]().schema.tree;
      schemas[validator] = { type: 'object', properties: {}, required: [] };
      Object.keys(validatorSchema).forEach((property) => {
        schemas[validator].properties = {
          ...schemas[validator].properties,
          [property]: this.getBodyFromTree(validatorSchema[property]),
        };
        if (!validatorSchema[property].optional) {
          schemas[validator].required = [...(schemas[validator].required || []), property];
        }
      });
    });
    return schemas;
  }

  public async parseSchemas(): Promise<{ [key: string]: OpenAPIV3.SchemaObject }> {
    const validators = this.getModuleContent(Validators);
    return this.generateSchema(validators);
  }
}
