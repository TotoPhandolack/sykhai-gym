import { readFile, writeFile } from "fs/promises";
import path from "path";
import { tourStops, type Hotspot } from "@/data/tour-stops";
import type { HotspotOverrides } from "@/lib/hotspot-storage";
import { generateTourStopsCode } from "@/lib/tour-stops-codegen";

const DATA_FILE = path.join(process.cwd(), "src", "data", "tour-stops.ts");
const ARRAY_MARKER = "export const tourStops: TourStop[] = [";

function isHotspot(value: unknown): value is Hotspot {
  if (typeof value !== "object" || value === null) return false;
  const h = value as Record<string, unknown>;
  return (
    typeof h.id === "string" &&
    (h.type === "link" || h.type === "info") &&
    typeof h.yaw === "number" &&
    Number.isFinite(h.yaw) &&
    typeof h.pitch === "number" &&
    Number.isFinite(h.pitch)
  );
}

function parseOverrides(body: unknown): HotspotOverrides | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return null;
  const knownIds = new Set(tourStops.map((s) => s.id));
  const overrides: HotspotOverrides = {};
  for (const [stopId, hotspots] of Object.entries(body)) {
    if (!knownIds.has(stopId)) return null;
    if (!Array.isArray(hotspots) || !hotspots.every(isHotspot)) return null;
    overrides[stopId] = hotspots;
  }
  return overrides;
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "The hotspot editor can only save files in development." },
      { status: 403 },
    );
  }

  const overrides = parseOverrides(await request.json().catch(() => null));
  if (!overrides) {
    return Response.json({ error: "Invalid hotspot data." }, { status: 400 });
  }

  const source = await readFile(DATA_FILE, "utf8");
  const markerIndex = source.indexOf(ARRAY_MARKER);
  if (markerIndex === -1) {
    return Response.json(
      { error: `Could not find the tourStops array in ${DATA_FILE}.` },
      { status: 500 },
    );
  }

  const header = source.slice(0, markerIndex);
  await writeFile(
    DATA_FILE,
    `${header}${generateTourStopsCode(overrides)}\n`,
    "utf8",
  );
  return Response.json({ ok: true });
}
