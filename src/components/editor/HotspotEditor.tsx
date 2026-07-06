"use client";

import { useEffect, useState } from "react";
import {
  tourStops,
  type Hotspot,
  type HotspotType,
} from "@/data/tour-stops";
import {
  loadHotspotOverrides,
  saveHotspotOverrides,
  type HotspotOverrides,
} from "@/lib/hotspot-storage";
import HotspotCanvas, { type PlacingMode } from "./HotspotCanvas";
import { HOTSPOT_ICONS } from "./hotspotIcons";

type HotspotDraft = {
  id?: string;
  type: HotspotType;
  yaw: number;
  pitch: number;
  label: string;
  content: string;
  icon: string;
  targetStopId: string;
};

function baseHotspots(): HotspotOverrides {
  const base: HotspotOverrides = {};
  for (const stop of tourStops) base[stop.id] = stop.hotspots;
  return base;
}

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

function makeId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `hotspot-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function generateExportCode(hotspotsByStop: HotspotOverrides): string {
  const lines = tourStops.map((stop) => {
    const hs = hotspotsByStop[stop.id] ?? [];
    const hotspotsCode = hs.length
      ? `[\n${hs.map((h) => `      ${formatHotspot(h)},`).join("\n")}\n    ]`
      : "[]";
    return `  { id: ${JSON.stringify(stop.id)}, title: ${JSON.stringify(stop.title)}, image: ${JSON.stringify(stop.image)}, hotspots: ${hotspotsCode} },`;
  });
  return `export const tourStops: TourStop[] = [\n${lines.join("\n")}\n];`;
}

export default function HotspotEditor() {
  const [hotspotsByStop, setHotspotsByStop] = useState<HotspotOverrides>(
    baseHotspots,
  );
  const [selectedId, setSelectedId] = useState(tourStops[0].id);
  const [placing, setPlacing] = useState<PlacingMode>(null);
  const [draft, setDraft] = useState<HotspotDraft | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Local edits are drafted here; localStorage is only the editor's own
  // staging area, not what the public site reads. Load any earlier session's
  // overrides once we're safely past hydration.
  useEffect(() => {
    const overrides = loadHotspotOverrides();
    if (Object.keys(overrides).length > 0) {
      setHotspotsByStop((prev) => ({ ...prev, ...overrides }));
    }
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDraft(null);
        setPlacing(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const selected = tourStops.find((s) => s.id === selectedId) ?? tourStops[0];
  const hotspots = hotspotsByStop[selectedId] ?? [];
  const otherStops = tourStops.filter((s) => s.id !== selectedId);

  function selectStop(id: string) {
    setSelectedId(id);
    setDraft(null);
    setPlacing(null);
  }

  function flashSaved() {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1200);
  }

  function persist(next: HotspotOverrides) {
    setHotspotsByStop(next);
    saveHotspotOverrides(next);
  }

  function handlePlace(pos: { yaw: number; pitch: number }) {
    if (placing === "move" && draft) {
      setDraft({ ...draft, yaw: pos.yaw, pitch: pos.pitch });
      setPlacing(null);
      return;
    }
    if (placing === "new") {
      setDraft({
        type: "link",
        yaw: pos.yaw,
        pitch: pos.pitch,
        label: "",
        content: "",
        icon: "",
        targetStopId: "",
      });
      setPlacing(null);
    }
  }

  function editHotspot(id: string) {
    const h = hotspots.find((x) => x.id === id);
    if (!h) return;
    setDraft({
      id: h.id,
      type: h.type,
      yaw: h.yaw,
      pitch: h.pitch,
      label: h.label ?? "",
      content: h.content ?? "",
      icon: h.icon ?? "",
      targetStopId: h.targetStopId ?? "",
    });
    setPlacing(null);
    setError(null);
  }

  function cancelDraft() {
    setDraft(null);
    setPlacing(null);
    setError(null);
  }

  function saveHotspot() {
    if (!draft) return;
    if (draft.type === "link" && !draft.targetStopId) {
      setError("Pick a destination scene for this link hotspot.");
      return;
    }
    const hotspot: Hotspot = {
      id: draft.id ?? makeId(),
      type: draft.type,
      yaw: draft.yaw,
      pitch: draft.pitch,
      label: draft.label.trim() || undefined,
      content:
        draft.type === "info" ? draft.content.trim() || undefined : undefined,
      icon: draft.icon || undefined,
      targetStopId: draft.type === "link" ? draft.targetStopId : undefined,
    };
    const current = hotspotsByStop[selectedId] ?? [];
    const next = draft.id
      ? current.map((h) => (h.id === hotspot.id ? hotspot : h))
      : [...current, hotspot];
    persist({ ...hotspotsByStop, [selectedId]: next });
    setDraft(null);
    setError(null);
    flashSaved();
  }

  function deleteHotspot(id: string) {
    const current = hotspotsByStop[selectedId] ?? [];
    persist({ ...hotspotsByStop, [selectedId]: current.filter((h) => h.id !== id) });
    if (draft?.id === id) setDraft(null);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generateExportCode(hotspotsByStop));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-zinc-950 text-white">
      <header className="flex shrink-0 items-center gap-4 border-b border-white/10 px-5 py-3">
        <a
          href="/"
          className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
        >
          ← Back to site
        </a>
        <span className="text-white/30">·</span>
        <h1 className="font-display text-lg tracking-wide text-white">
          Hotspot Editor
        </h1>
        {savedFlash && (
          <span className="text-xs font-medium text-green-400">Saved ✓</span>
        )}
        <button
          onClick={() => setExportOpen(true)}
          className="ml-auto rounded-full bg-brand px-4 py-2 text-xs font-semibold text-black hover:bg-brand-dim"
        >
          Export code
        </button>
      </header>

      {error && (
        <div className="flex shrink-0 items-center justify-between border-b border-red-500/20 bg-red-500/10 px-5 py-2 text-xs text-red-300">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="px-1">
            ✕
          </button>
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        <aside className="w-64 shrink-0 overflow-y-auto border-r border-white/10">
          <div className="p-4">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
              Scenes
            </h2>
            <ul className="space-y-1.5">
              {tourStops.map((s) => {
                const count = (hotspotsByStop[s.id] ?? []).length;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => selectStop(s.id)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors ${
                        s.id === selectedId
                          ? "bg-brand/15 text-brand"
                          : "text-white/70 hover:bg-white/5"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.image}
                        alt=""
                        className="h-9 w-14 shrink-0 rounded object-cover"
                      />
                      <span className="min-w-0 flex-1 truncate text-sm">
                        {s.title}
                      </span>
                      {count > 0 && (
                        <span className="shrink-0 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-white/50">
                          {count}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className="relative min-w-0 flex-1 bg-black">
          <HotspotCanvas
            src={selected.image}
            hotspots={hotspots}
            placing={placing}
            draftPosition={draft ? { yaw: draft.yaw, pitch: draft.pitch } : null}
            onPlace={handlePlace}
            onSelectHotspot={editHotspot}
            className="absolute inset-0"
          />

          {placing && (
            <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-center">
              <span className="rounded-full border border-brand/40 bg-black/80 px-4 py-2 text-sm font-medium text-brand">
                {placing === "new"
                  ? "Click anywhere on the panorama to place the hotspot"
                  : "Click the panorama to move this hotspot there"}
              </span>
            </div>
          )}

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/90 px-3 py-2 shadow-xl backdrop-blur">
            {placing ? (
              <button
                onClick={() => setPlacing(null)}
                className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/20"
              >
                Cancel placing
              </button>
            ) : (
              <button
                onClick={() => {
                  setDraft(null);
                  setPlacing("new");
                }}
                className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-black hover:bg-brand-dim"
              >
                + Add Hotspot
              </button>
            )}
          </div>
        </main>

        <aside className="w-80 shrink-0 overflow-y-auto border-l border-white/10">
          {draft ? (
            <div
              className="border-b border-white/10 bg-brand/5 p-4"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !(e.target instanceof HTMLTextAreaElement)) {
                  e.preventDefault();
                  saveHotspot();
                }
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-brand">
                  {draft.id ? "Edit hotspot" : "New hotspot"}
                </h3>
                <button
                  onClick={cancelDraft}
                  title="Close (Esc)"
                  className="px-1 text-sm leading-none text-white/50 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["link", "info"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setDraft({ ...draft, type: t })}
                        className={`rounded-lg py-2 text-xs font-medium transition-colors ${
                          draft.type === t
                            ? "bg-brand text-black"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
                        }`}
                      >
                        {t === "link" ? "Link" : "Info"}
                      </button>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[10px] text-white/40">
                    {draft.type === "link"
                      ? "Takes visitors to another scene."
                      : "Shows a small text popup in place."}
                  </p>
                </div>

                {draft.type === "link" ? (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-white/50">Goes to scene</span>
                    <div className="flex max-h-44 flex-col gap-1 overflow-y-auto">
                      {otherStops.map((s) => {
                        const active = draft.targetStopId === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => setDraft({ ...draft, targetStopId: s.id })}
                            className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 text-left transition-colors ${
                              active
                                ? "border-brand/60 bg-brand/15"
                                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.08]"
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={s.image}
                              alt=""
                              className="h-7 w-10 shrink-0 rounded object-cover bg-zinc-800"
                            />
                            <span className="flex-1 truncate text-xs font-medium">
                              {s.title}
                            </span>
                            {active && <span className="shrink-0 text-brand">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-white/50">Content</span>
                    <textarea
                      value={draft.content}
                      onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                      rows={3}
                      placeholder="Describe what's here…"
                      className="resize-none rounded-lg border border-white/10 bg-zinc-900 px-2.5 py-1.5 text-sm outline-none focus:border-white/30"
                    />
                  </label>
                )}

                <label className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-white/50">
                    Label <span className="text-white/30">(tooltip, optional)</span>
                  </span>
                  <input
                    autoFocus
                    value={draft.label}
                    onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                    placeholder={draft.type === "link" ? "Go to the cardio zone" : "Info"}
                    className="rounded-lg border border-white/10 bg-zinc-900 px-2.5 py-1.5 text-sm outline-none focus:border-white/30"
                  />
                </label>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-white/50">Icon</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setDraft({ ...draft, icon: "" })}
                      title="Default for this type"
                      className={`flex h-9 items-center justify-center rounded-lg text-[10px] font-medium transition-colors ${
                        draft.icon === ""
                          ? "bg-brand text-black"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      Auto
                    </button>
                    {HOTSPOT_ICONS.map((ic) => (
                      <button
                        key={ic.id}
                        type="button"
                        onClick={() => setDraft({ ...draft, icon: ic.id })}
                        title={ic.label}
                        className={`flex h-9 items-center justify-center rounded-lg transition-colors ${
                          draft.icon === ic.id
                            ? "bg-brand text-black"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4.5 w-4.5"
                          dangerouslySetInnerHTML={{ __html: ic.svg }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-white/50">Position</span>
                    <span className="font-mono text-[10px] text-white/40">
                      yaw {draft.yaw.toFixed(2)} · pitch {draft.pitch.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => setPlacing((p) => (p === "move" ? null : "move"))}
                    title="Pick a new spot on the panorama"
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      placing === "move"
                        ? "bg-brand text-black"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {placing === "move" ? "Click canvas…" : "Move"}
                  </button>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={saveHotspot}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold text-black transition-colors ${
                      draft.type === "link" && !draft.targetStopId
                        ? "cursor-not-allowed bg-brand/40"
                        : "bg-brand hover:bg-brand-dim"
                    }`}
                  >
                    {draft.id ? "Save changes" : "Add hotspot"}
                  </button>
                  <button
                    onClick={cancelDraft}
                    className="rounded-lg px-3 py-2 text-xs font-medium text-white/60 hover:bg-white/10 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
                Hotspots on this scene ({hotspots.length})
              </h3>
              {hotspots.length === 0 ? (
                <p className="text-xs text-white/40">
                  No hotspots yet. Click “+ Add Hotspot” below the photo, then
                  click a spot on the panorama.
                </p>
              ) : (
                <ul className="space-y-2">
                  {hotspots.map((h) => (
                    <li
                      key={h.id}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                    >
                      <span className="min-w-0 flex-1 truncate text-xs font-medium">
                        {h.label || (h.type === "link" ? "Link hotspot" : "Info hotspot")}
                      </span>
                      <span className="shrink-0 text-[10px] uppercase text-white/40">
                        {h.type}
                      </span>
                      <button
                        onClick={() => editHotspot(h.id)}
                        className="shrink-0 text-xs text-white/60 hover:text-brand"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteHotspot(h.id)}
                        className="shrink-0 text-xs text-white/60 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </aside>
      </div>

      {exportOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setExportOpen(false)}
        >
          <div
            className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl text-white">Export hotspot data</h2>
              <button
                onClick={() => setExportOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="mb-4 text-sm text-white/60">
              Copy this and paste it over the{" "}
              <code className="text-brand">tourStops</code> array in{" "}
              <code className="text-brand">src/data/tour-stops.ts</code> to make
              these hotspots permanent.
            </p>
            <pre className="max-h-96 overflow-auto rounded-lg bg-black p-4 text-xs text-white/80">
              <code>{generateExportCode(hotspotsByStop)}</code>
            </pre>
            <button
              onClick={handleCopy}
              className="mt-4 w-full rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black hover:bg-brand-dim"
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
