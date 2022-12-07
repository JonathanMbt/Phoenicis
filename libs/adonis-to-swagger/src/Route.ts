import { OpenAPIV3 } from "openapi-types";

export type AdonisRoute = {
  methods: ("HEAD" | "OPTIONS" | "GET" | "PUT" | "PATCH" | "DELETE" | "POST")[];
  pattern: string;
  handler: string;
  meta: {
    namespace: string;
    resolvedHandler: {
      type: string;
      namespace: string;
      method: string;
    };
    resolvedMiddleware: any;
    finalHandler: any;
  };
  middleware: string[];
  name: string;
  params: string[];
};

export class Route {
  private adonisRoute: AdonisRoute;

  constructor(aRoute: AdonisRoute) {
    this.adonisRoute = aRoute;
  }

  public getTag(): string {
    return this.adonisRoute.pattern.split("/")[2] || "default";
  }

  public getPattern(): string {
    return this.adonisRoute.pattern;
  }

  public getParams(): OpenAPIV3.ParameterObject[] {
    return this.adonisRoute.params.map((param) => ({
      name: param,
      in: "path",
      schema: {
        type: "string",
      },
      required: true,
    }));
  }

  public getMethods(): (
    | "HEAD"
    | "OPTIONS"
    | "GET"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "POST"
  )[] {
    return this.adonisRoute.methods;
  }

  public getHandler(): string {
    return this.adonisRoute.meta.resolvedHandler.namespace;
  }

  public generate() {
    let result: OpenAPIV3.PathItemObject = {};
    this.getMethods().forEach((method) => {
      switch (method) {
        case "GET":
          result = {
            ...result,
            get: {
              tags: [this.getTag()],
              responses: {},
              summary: this.adonisRoute.handler,
              parameters: this.getParams(),
            },
          };
          break;
        case "POST":
          result = {
            ...result,
            post: {
              tags: [this.getTag()],
              responses: {},
              summary: this.adonisRoute.handler,
              parameters: this.getParams(),
              requestBody: {
                content: {
                  "application/json": {
                    schema: {},
                  },
                },
              },
            },
          };
          break;
        case "PUT":
          result = {
            ...result,
            put: {
              tags: [this.getTag()],
              responses: {},
              summary: this.adonisRoute.handler,
              parameters: this.getParams(),
              requestBody: {
                content: {
                  "application/json": {
                    schema: {},
                  },
                },
              },
            },
          };
          break;
        case "PATCH":
          result = {
            ...result,
            patch: {
              tags: [this.getTag()],
              responses: {},
              summary: this.adonisRoute.handler,
              parameters: this.getParams(),
              requestBody: {
                content: {
                  "application/json": {
                    schema: {},
                  },
                },
              },
            },
          };
          break;
        case "DELETE":
          result = {
            ...result,
            delete: {
              tags: [this.getTag()],
              responses: {},
              summary: this.adonisRoute.handler,
              parameters: this.getParams(),
            },
          };
          break;
      }
    });
    return result;
  }
}
