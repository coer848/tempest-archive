import { afterEach, describe, expect, it, vi } from "vitest";
import { getSupabasePublicConfig } from "../lib/env";

describe("getSupabasePublicConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns isConfigured = false when env vars are missing", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");

    const config = getSupabasePublicConfig();
    expect(config.isConfigured).toBe(false);
    expect(config.reason).toBeDefined();
  });

  it("returns isConfigured = false when template placeholders are used", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://tu-proyecto-ref.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "tu-clave-publica-anon-o-publishable");

    const config = getSupabasePublicConfig();
    expect(config.isConfigured).toBe(false);
  });

  it("returns isConfigured = true for valid Supabase URL and public key", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://abcdefghijklm.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.valid_anon");

    const config = getSupabasePublicConfig();
    expect(config.isConfigured).toBe(true);
    expect(config.url).toBe("https://abcdefghijklm.supabase.co");
  });
});
