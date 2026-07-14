import type { Hotspot } from "@/data/tour-stops";

const STORAGE_KEY = "sykhai-gym:tour-hotspots";

export type StopOverride = {
  hotspots: Hotspot[];
  defaultYaw?: number;
  defaultPitch?: number;
};

export type HotspotOverrides = Record<string, StopOverride>;

export function loadHotspotOverrides(): HotspotOverrides {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HotspotOverrides) : {};
  } catch {
    return {};
  }
}

export function saveHotspotOverrides(overrides: HotspotOverrides) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export function clearHotspotOverrides() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
