import { OpenAPIV3 } from "openapi-types";
import { AdonisRoute, Route } from "./Route";
import { Annotations, PathAnnotations } from "./Annotations";
import { SchemaProvider } from "./SchemaProvider";

type Router = {
  [domain: string]: AdonisRoute[];
};

export type GenOptions = {
  title: string;
  version: string;
  servers: { url: string }[];
  excludedRoutes: string[];
  schemaProviders: SchemaProvider[];
};

export class GenSwagger {
  static instance: GenSwagger | null = null;

  private routes: Route[] = [];
  private config: GenOptions;
  private default: OpenAPIV3.Document = {
    openapi: "3.0.3",
    info: {
      title: "default",
      version: "0.0.0",
    },
    servers: [],
    tags: [],
    paths: {},
    components: { schemas: {} },
  };

  static getInstance(router: Router, options: GenOptions) {
    if (this.instance === null) return new GenSwagger(router, options);
    return this.instance;
  }

  private constructor(router: Router, options: GenOptions) {
    this.routes = router["root"].map((aRoute) => new Route(aRoute));
    this.config = options;

    this.default.info.title = this.config.title;
    this.default.info.version = this.config.version;
    this.default.servers = this.config.servers;
  }

  async writeFile(): Promise<string> {
    const YAML = require("json-to-pretty-yaml");
    this.generateTags();
    await Promise.all(
      this.config.schemaProviders.map(async (schemaProvider) => {
        const customSchemas = await schemaProvider.parseSchemas();

        if (this.default.components === undefined) return;
        this.default.components.schemas = {
          ...this.default.components.schemas,
          ...customSchemas,
        };
      })
    );
    this.generateRoutes();
    await this.generateFromAnnotations();
    return YAML.stringify(this.default);
  }

  public generateTags(): void {
    const tags: string[] = [];
    this.routes.forEach((route) => {
      tags.push(route.getTag() || "default");
    });

    this.default.tags = Array.from(new Set(tags))
      .map((tag) => ({ name: tag }))
      .sort((a, b) => {
        // put default tag last
        if (a.name === "default") return 1;
        if (b.name === "default") return -1;

        // alphabetical sort
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;

        return 0;
      });
  }

  public generateRoutes(): void {
    this.routes.forEach((route) => {
      if (this.config.excludedRoutes.includes(route.getPattern())) return;
      this.default.paths[route.getPattern()] = {
        ...this.default.paths[route.getPattern()],
        ...route.generate(),
      };
    });
  }

  public isHTTPMethod(object: any): object is OpenAPIV3.OperationObject {
    return (object as OpenAPIV3.OperationObject).responses !== undefined;
  }

  public async generateFromAnnotations(): Promise<void> {
    const dynamicConfig = new Annotations(this.routes);
    const annotations: PathAnnotations = await dynamicConfig.generate();
    Object.entries(this.default.paths).forEach(([_, path]) => {
      if (path == undefined) return;
      Object.entries(path).forEach(([_, option]) => {
        if (this.isHTTPMethod(option)) {
          const annotationKey = Object.keys(annotations).find((annotationKey) =>
            option.summary?.includes(annotationKey)
          );
          if (annotationKey === undefined) return;
          option.responses = annotations[annotationKey].responses;
          option.requestBody = annotations[annotationKey].requestBody;
        }
      });
    });
  }
}
