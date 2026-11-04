import { z } from "zod";

/**
 * RFC 9457 (Problem Details for HTTP APIs) standard response structure.
 */
export const problemDetailsSchema = z.object({
  type: z.string().default("about:blank"),
  title: z.string(),
  status: z.number().int().min(400).max(599),
  detail: z.string(),
  instance: z.string().optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

export type ProblemDetails = z.infer<typeof problemDetailsSchema>;

export function createProblemDetails(params: {
  status: number;
  title: string;
  detail: string;
  type?: string;
  instance?: string;
  errors?: Record<string, string[]>;
}): ProblemDetails {
  return {
    type: params.type ?? `https://tempest-archive.vercel.app/probs/http-${params.status}`,
    title: params.title,
    status: params.status,
    detail: params.detail,
    ...(params.instance ? { instance: params.instance } : {}),
    ...(params.errors ? { errors: params.errors } : {}),
  };
}
