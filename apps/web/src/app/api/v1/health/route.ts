import { NextResponse } from "next/server";
import { getSystemStatus } from "@/lib/system-status";

export const dynamic = "force-dynamic";

export async function GET() {
  const report = await getSystemStatus();

  return NextResponse.json(
    {
      status: "ok",
      service: "tempest-archive-web",
      timestamp: new Date().toISOString(),
      database: {
        connected: report.connected,
        source: report.source,
        latencyMs: report.latencyMs,
        record: report.record,
        ...(report.diagnosticNote ? { diagnosticNote: report.diagnosticNote } : {}),
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
