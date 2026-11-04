import { describe, expect, it } from "vitest";
import {
  createProblemDetails,
  ENTITY_TYPES,
  ENTITY_VISUAL_TOKENS,
  entityTypeSchema,
  RELATION_TYPES,
  RELATION_VISUAL_TOKENS,
  relationTypeSchema,
  SPOILER_LEVEL_LABELS,
  spoilerLevelSchema,
  userRoleSchema,
} from "../index";

describe("@tempest-archive/shared schemas & design tokens", () => {
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

  it("defines visual tokens for every entity_type and relation_type", () => {
    for (const type of ENTITY_TYPES) {
      const token = ENTITY_VISUAL_TOKENS[type];
      expect(token).toBeDefined();
      expect(token.lightHex).toMatch(/^#[0-9A-F]{6}$/i);
      expect(token.darkHex).toMatch(/^#[0-9A-F]{6}$/i);
    }

    for (const rel of RELATION_TYPES) {
      const token = RELATION_VISUAL_TOKENS[rel];
      expect(token).toBeDefined();
      expect(token.labelEs.length).toBeGreaterThan(2);
    }

    expect(SPOILER_LEVEL_LABELS.none.rank).toBeLessThan(SPOILER_LEVEL_LABELS.anime.rank);
    expect(SPOILER_LEVEL_LABELS.anime.rank).toBeLessThan(SPOILER_LEVEL_LABELS.novel.rank);
  });
});
