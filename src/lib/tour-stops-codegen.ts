import { tourStops, type Hotspot } from "@/data/tour-stops";
import type { HotspotOverrides } from "@/lib/hotspot-storage";

function formatHotspot(h: Hotspot): string {
  const parts = [
    `id: ${JSON.stringify(h.id)}`,
    `type: ${JSON.stringify(h.type)}`,
    `yaw: ${h.yaw.toFixed(4)}`,
    `pitch: ${h.pitch.toFixed(4)}`,
  ];
  if (h.label) parts.push(`label: ${JSON.stringify(h.label)}`);
  if (h.content) parts.push(`content: ${JSON.stringify(h.content)}`);
  if (h.icon) parts.push(`icon: ${JSON.stringify(h.icon)}`);
  if (h.targetStopId) parts.push(`targetStopId: ${JSON.stringify(h.targetStopId)}`);
  return `{ ${parts.join(", ")} }`;
}

export function generateTourStopsCode(hotspotsByStop: HotspotOverrides): string {
  const lines = tourStops.map((stop) => {
    const hs = hotspotsByStop[stop.id] ?? [];
    const hotspotsCode = hs.length
      ? `[\n${hs.map((h) => `      ${formatHotspot(h)},`).join("\n")}\n    ]`
      : "[]";
    return `  { id: ${JSON.stringify(stop.id)}, title: ${JSON.stringify(stop.title)}, image: ${JSON.stringify(stop.image)}, hotspots: ${hotspotsCode} },`;
  });
  return `export const tourStops: TourStop[] = [\n${lines.join("\n")}\n];`;
}
