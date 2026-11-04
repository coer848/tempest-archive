import { describe, expect, it } from "vitest";
import {
  createProblemDetails,
  entityTypeSchema,
  relationTypeSchema,
  spoilerLevelSchema,
  userRoleSchema,
} from "../index";

describe("@tempest-archive/shared schemas", () => {
  it("validates domain enums accurately", () => {
    expect(userRoleSchema.parse("admin")).toBe("admin");
    expect(entityTypeSchema.parse("skill")).toBe("skill");
    expect(spoilerLevelSchema.parse("anime")).toBe("anime");
    expect(relationTypeSchema.parse("evolves_into")).toBe("evolves_into");
    expect(() => userRoleSchema.parse("superuser")).toThrow();
  });

  it("constructs RFC 9457 Problem Details payloads", () => {
    const problem = createProblemDetails({
      status: 422,
      title: "Datos de entrada inválidos",
      detail: "El resumen supera los 280 caracteres permitidos.",
      instance: "/api/v1/entities",
    });

    expect(problem.status).toBe(422);
    expect(problem.title).toBe("Datos de entrada inválidos");
    expect(problem.instance).toBe("/api/v1/entities");
    expect(problem.type).toContain("http-422");
  });
});
