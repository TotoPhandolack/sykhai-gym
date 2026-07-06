export type HotspotType = "link" | "info";

export type Hotspot = {
  id: string;
  type: HotspotType;
  yaw: number;
  pitch: number;
  label?: string;
  content?: string;
  icon?: string;
  /** Required when type is "link": the TourStop.id to jump to. */
  targetStopId?: string;
};

export type TourStop = {
  id: string;
  title: string;
  image: string;
  hotspots: Hotspot[];
};

export const tourStops: TourStop[] = [
  { id: "free-weights-wall", title: "Free Weights Wall", image: "/virtual/04.jpeg", hotspots: [] },
  { id: "cardio-entrance", title: "Cardio & Entrance", image: "/virtual/01.jpeg", hotspots: [] },
  { id: "front-desk", title: "Front Desk Area", image: "/virtual/02.jpeg", hotspots: [] },
  { id: "strength-machines", title: "Strength Machines", image: "/virtual/03.jpeg", hotspots: [] },
  { id: "functional-rig", title: "Functional Training Rig", image: "/virtual/05.jpeg", hotspots: [] },
  { id: "cable-station", title: "Cable Station", image: "/virtual/06.jpeg", hotspots: [] },
  { id: "treadmill-row", title: "Treadmill Row", image: "/virtual/07.jpeg", hotspots: [] },
  { id: "machine-circuit", title: "Machine Circuit", image: "/virtual/08.jpeg", hotspots: [] },
  { id: "weight-room", title: "Weight Room", image: "/virtual/09.jpeg", hotspots: [] },
  { id: "dumbbell-bench", title: "Dumbbell & Bench Area", image: "/virtual/10.jpeg", hotspots: [] },
];
