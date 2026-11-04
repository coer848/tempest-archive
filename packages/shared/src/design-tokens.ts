import type { EntityType, RelationType, SpoilerLevel, UserRole } from "./schemas";

export interface EntityVisualToken {
  type: EntityType;
  labelEs: string;
  labelPluralEs: string;
  iconName: string;
  lightHex: string;
  darkHex: string;
  templateNameEs: string;
}

export const ENTITY_VISUAL_TOKENS: Record<EntityType, EntityVisualToken> = {
  character: {
    type: "character",
    labelEs: "Personaje",
    labelPluralEs: "Personajes",
    iconName: "UserCheck",
    lightHex: "#0D9488",
    darkHex: "#2DD4BF",
    templateNameEs: "Ficha de Estado Analítica",
  },
  skill: {
    type: "skill",
    labelEs: "Habilidad",
    labelPluralEs: "Habilidades",
    iconName: "Sparkles",
    lightHex: "#0369A1",
    darkHex: "#38BDF8",
    templateNameEs: "Informe Técnico del Gran Sabio",
  },
  race: {
    type: "race",
    labelEs: "Raza",
    labelPluralEs: "Razas",
    iconName: "Dna",
    lightHex: "#15803D",
    darkHex: "#4ADE80",
    templateNameEs: "Entrada Taxonómica de Jura",
  },
  nation: {
    type: "nation",
    labelEs: "Nación",
    labelPluralEs: "Naciones",
    iconName: "Landmark",
    lightHex: "#B45309",
    darkHex: "#FBBF24",
    templateNameEs: "Expediente Cartográfico de la Federación",
  },
  organization: {
    type: "organization",
    labelEs: "Organización",
    labelPluralEs: "Organizaciones",
    iconName: "Shield",
    lightHex: "#9F1239",
    darkHex: "#FB7185",
    templateNameEs: "Registro de Facción y Consejo",
  },
  arc: {
    type: "arc",
    labelEs: "Arco argumental",
    labelPluralEs: "Arcos argumentales",
    iconName: "Milestone",
    lightHex: "#4338CA",
    darkHex: "#818CF8",
    templateNameEs: "Registro Cronológico",
  },
  location: {
    type: "location",
    labelEs: "Lugar",
    labelPluralEs: "Lugares",
    iconName: "MapPin",
    lightHex: "#4D7C0F",
    darkHex: "#A3E635",
    templateNameEs: "Coordenada Topográfica",
  },
  item: {
    type: "item",
    labelEs: "Objeto",
    labelPluralEs: "Objetos",
    iconName: "Sword",
    lightHex: "#57534E",
    darkHex: "#D6D3D1",
    templateNameEs: "Catálogo de Artefacto Mágico",
  },
};

export interface RelationVisualToken {
  type: RelationType;
  labelEs: string;
  directed: boolean;
  lineStyle: "solid" | "dashed" | "dotted";
  lightHex: string;
  darkHex: string;
}

export const RELATION_VISUAL_TOKENS: Record<RelationType, RelationVisualToken> = {
  evolves_into: {
    type: "evolves_into",
    labelEs: "Evoluciona en",
    directed: true,
    lineStyle: "solid",
    lightHex: "#0F766E",
    darkHex: "#2DD4BF",
  },
  has_skill: {
    type: "has_skill",
    labelEs: "Posee habilidad",
    directed: true,
    lineStyle: "solid",
    lightHex: "#0369A1",
    darkHex: "#38BDF8",
  },
  belongs_to_race: {
    type: "belongs_to_race",
    labelEs: "Pertenece a raza",
    directed: true,
    lineStyle: "dotted",
    lightHex: "#15803D",
    darkHex: "#4ADE80",
  },
  rules: {
    type: "rules",
    labelEs: "Gobierna",
    directed: true,
    lineStyle: "solid",
    lightHex: "#B45309",
    darkHex: "#FBBF24",
  },
  serves: {
    type: "serves",
    labelEs: "Sirve a",
    directed: true,
    lineStyle: "dashed",
    lightHex: "#475569",
    darkHex: "#94A3B8",
  },
  member_of: {
    type: "member_of",
    labelEs: "Miembro de",
    directed: true,
    lineStyle: "dashed",
    lightHex: "#9F1239",
    darkHex: "#FB7185",
  },
  ally_of: {
    type: "ally_of",
    labelEs: "Aliado de",
    directed: false,
    lineStyle: "solid",
    lightHex: "#059669",
    darkHex: "#34D399",
  },
  enemy_of: {
    type: "enemy_of",
    labelEs: "Enemigo de",
    directed: false,
    lineStyle: "dashed",
    lightHex: "#DC2626",
    darkHex: "#F87171",
  },
  family_of: {
    type: "family_of",
    labelEs: "Vínculo familiar",
    directed: false,
    lineStyle: "solid",
    lightHex: "#7E22CE",
    darkHex: "#C084FC",
  },
  appears_in: {
    type: "appears_in",
    labelEs: "Aparece en arco",
    directed: true,
    lineStyle: "dotted",
    lightHex: "#4338CA",
    darkHex: "#818CF8",
  },
  located_in: {
    type: "located_in",
    labelEs: "Ubicado en",
    directed: true,
    lineStyle: "dotted",
    lightHex: "#4D7C0F",
    darkHex: "#A3E635",
  },
};

export const SPOILER_LEVEL_LABELS: Record<
  SpoilerLevel,
  { labelEs: string; descriptionEs: string; rank: number }
> = {
  none: {
    labelEs: "Sin spoilers",
    descriptionEs: "Solo premisa inicial y datos básicos sin revelaciones de trama.",
    rank: 0,
  },
  anime: {
    labelEs: "Al día con el anime",
    descriptionEs: "Incluye eventos, evoluciones y personajes mostrados en el anime.",
    rank: 1,
  },
  novel: {
    labelEs: "Novela ligera completa",
    descriptionEs: "Muestra todos los registros, incluidos arcos avanzados de la novela ligera.",
    rank: 2,
  },
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  reader: "Lector",
  editor: "Editor",
  moderator: "Moderador",
  admin: "Administrador",
};
