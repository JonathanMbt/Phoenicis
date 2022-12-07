import { Route } from "./Route";
import * as fs from "fs/promises";
import * as path from "path";
import { parse, Spec } from "comment-parser";
import { OpenAPIV3 } from "openapi-types";

export type PathAnnotations = {
  [functionName: string]: {
    responses: OpenAPIV3.ResponsesObject;
    requestBody: OpenAPIV3.RequestBodyObject;
  };
};

export class Annotations {
  private controllersFilePath: string[];

  constructor(routes: Route[]) {
    const handlers = routes.map((route) => route.getHandler());
    this.controllersFilePath = Array.from(new Set(handlers));
  }

  private async readFile(filePath: string) {
    const formattedControllerPath = filePath.split("/").slice(1);
    formattedControllerPath[formattedControllerPath.length - 1] = `${
      formattedControllerPath[formattedControllerPath.length - 1]
    }.ts`;

    const relativePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "api",
      "app",
      ...formattedControllerPath
    );
    return await fs.readFile(relativePath, "utf8");
  }

  private parseType(type: string): Object {
    return type.startsWith("{")
      ? JSON.parse(type)
      : type.includes("[]")
      ? {
          type: "array",
          items: { $ref: `#/components/schemas/${type.split("[]")[0]}` },
        }
      : { $ref: `#/components/schemas/${type}` };
  }

  private parseAnnotation(
    annotation: Spec
  ): OpenAPIV3.ResponsesObject | OpenAPIV3.RequestBodyObject | null {
    switch (annotation.tag) {
      case "requestBody":
        const request: OpenAPIV3.RequestBodyObject = {
          required: annotation.name === "required",
          description: annotation.description,
          content: {
            "application/json": {
              schema: this.parseType(annotation.type),
            },
          },
        };
        return request;
      case "responseBody":
        const response: OpenAPIV3.ResponsesObject = {
          [annotation.name]: {
            description: annotation.description,
            content:
              annotation.type === "null"
                ? undefined
                : {
                    "application/json": {
                      schema: this.parseType(annotation.type),
                    },
                  },
          },
        };
        return response;
    }
    return null;
  }

  private isResponseObject(
    object: OpenAPIV3.ResponsesObject | OpenAPIV3.RequestBodyObject
  ): object is OpenAPIV3.ResponsesObject {
    return (object as OpenAPIV3.ResponsesObject).required === undefined;
  }

  public async generate(): Promise<PathAnnotations> {
    const annotations: PathAnnotations = {};
    await Promise.all(
      this.controllersFilePath.map(async (controller) => {
        if (controller === undefined) return;

        const fileContent = await this.readFile(controller);
        const parsedFileComments = parse(fileContent);

        if (parsedFileComments.length !== 0) {
          parsedFileComments.forEach((comment) => {
            const functionName = comment.tags.find(
              (annotation) =>
                annotation.name.length === 0 && annotation.type.length === 0
            );
            if (functionName === undefined) return;

            annotations[functionName.tag] = {
              responses: {} as OpenAPIV3.ResponsesObject,
              requestBody: {} as OpenAPIV3.RequestBodyObject,
            };

            comment.tags.forEach((annotation) => {
              // already fetch, annotation to link with function
              if (annotation.tag === functionName.tag) return;

              const annotationOpenAPI = this.parseAnnotation(annotation);
              if (annotationOpenAPI === null) return;

              if (this.isResponseObject(annotationOpenAPI)) {
                annotations[functionName.tag].responses = {
                  ...annotations[functionName.tag].responses,
                  ...annotationOpenAPI,
                };
              } else {
                annotations[functionName.tag].requestBody = annotationOpenAPI;
              }
            });
          });
        }
      })
    );
    return annotations;
  }
}
