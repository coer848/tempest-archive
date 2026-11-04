import { z } from "zod";

export const USER_ROLES = ["reader", "editor", "moderator", "admin"] as const;
export const userRoleSchema = z.enum(USER_ROLES);
export type UserRole = z.infer<typeof userRoleSchema>;

export const ENTITY_TYPES = [
  "character",
  "race",
  "skill",
  "nation",
  "organization",
  "arc",
  "location",
  "item",
] as const;
export const entityTypeSchema = z.enum(ENTITY_TYPES);
export type EntityType = z.infer<typeof entityTypeSchema>;

export const SPOILER_LEVELS = ["none", "anime", "novel"] as const;
export const spoilerLevelSchema = z.enum(SPOILER_LEVELS);
export type SpoilerLevel = z.infer<typeof spoilerLevelSchema>;

export const REVISION_STATUSES = ["pending", "approved", "rejected"] as const;
export const revisionStatusSchema = z.enum(REVISION_STATUSES);
export type RevisionStatus = z.infer<typeof revisionStatusSchema>;

export const RELATION_TYPES = [
  "evolves_into",
  "member_of",
  "serves",
  "rules",
  "ally_of",
  "enemy_of",
  "family_of",
  "has_skill",
  "belongs_to_race",
  "appears_in",
  "located_in",
] as const;
export const relationTypeSchema = z.enum(RELATION_TYPES);
export type RelationType = z.infer<typeof relationTypeSchema>;

export const systemStatusRecordSchema = z.object({
  key: z.string().min(1),
  title: z.string().min(1),
  message: z.string().min(1),
  phase: z.string().min(1),
  updatedAt: z.string(),
});
export type SystemStatusRecord = z.infer<typeof systemStatusRecordSchema>;
