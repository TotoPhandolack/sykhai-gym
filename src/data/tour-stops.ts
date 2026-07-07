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
  { id: "free-weights-wall", title: "Free Weights Wall", image: "/virtual/04.jpeg", hotspots: [
      { id: "f7a71739-0de6-4918-9c13-a8ad6b58720f", type: "link", yaw: 3.0825, pitch: -0.3106, label: "Training Rig", icon: "ring", targetStopId: "functional-rig" },
      { id: "ffe304fd-c2c8-442e-9e44-a5827c940447", type: "link", yaw: 4.1969, pitch: -0.6250, targetStopId: "dumbbell-bench" },
    ] },
  { id: "cardio-entrance", title: "Cardio & Entrance", image: "/virtual/01.jpeg", hotspots: [
      { id: "3b0027a3-7ba5-4587-8387-e09cd2cffa46", type: "link", yaw: 2.4931, pitch: -0.2987, label: "Front desk", targetStopId: "front-desk" },
      { id: "2279ad73-b278-45f1-a8e1-d83fa858b35f", type: "link", yaw: 3.7210, pitch: -0.3910, label: "Treadmill row", icon: "ring", targetStopId: "treadmill-row" },
    ] },
  { id: "front-desk", title: "Front Desk Area", image: "/virtual/02.jpeg", hotspots: [
      { id: "80259257-1ef2-4844-9c38-62271ac73b6b", type: "link", yaw: 3.4481, pitch: -0.2958, label: "Strength machine", icon: "ring", targetStopId: "strength-machines" },
      { id: "36f2be83-45e7-43ca-a426-e55916b57196", type: "link", yaw: 0.3865, pitch: -0.3508, label: "Cardio", icon: "ring", targetStopId: "cardio-entrance" },
    ] },
  { id: "strength-machines", title: "Strength Machines", image: "/virtual/03.jpeg", hotspots: [
      { id: "2cf52e44-b4e9-4bff-afdb-da85d72db528", type: "link", yaw: 1.1187, pitch: -0.5043, label: "Middle", icon: "ring", targetStopId: "weight-room" },
      { id: "c0cc38b0-1066-482c-ad54-49471bb5a3b9", type: "link", yaw: 2.9667, pitch: -0.3099, label: "Front desk", icon: "ring", targetStopId: "front-desk" },
    ] },
  { id: "functional-rig", title: "Functional Training Rig", image: "/virtual/05.jpeg", hotspots: [
      { id: "92cca1a6-daab-42b5-b276-728e3c76ad36", type: "link", yaw: 0.1166, pitch: -0.2241, label: "Free weigth wall", icon: "ring", targetStopId: "free-weights-wall" },
      { id: "ed89a7d5-fe99-44f4-b458-244d2fa0569c", type: "link", yaw: 4.8649, pitch: -0.3693, label: "Machine circuit", icon: "ring", targetStopId: "machine-circuit" },
      { id: "304ef06e-d548-4cb3-9893-092eaecc77a4", type: "link", yaw: 3.2876, pitch: -0.3247, label: "Cable station", icon: "ring", targetStopId: "cable-station" },
    ] },
  { id: "cable-station", title: "Cable Station", image: "/virtual/06.jpeg", hotspots: [
      { id: "b94aec60-6483-434a-9d50-e7ace923d54b", type: "link", yaw: 5.0906, pitch: -0.2810, label: "Training rig", icon: "ring", targetStopId: "functional-rig" },
      { id: "4c8acf81-ef2d-4031-9899-2e94acc03438", type: "link", yaw: 3.6056, pitch: -0.3443, label: "Treadill row", icon: "ring", targetStopId: "treadmill-row" },
    ] },
  { id: "treadmill-row", title: "Treadmill Row", image: "/virtual/07.jpeg", hotspots: [
      { id: "e8c51e98-e190-4360-8a39-ffd992b55fd4", type: "link", yaw: 4.8775, pitch: -0.3474, label: "Cable", icon: "ring", targetStopId: "cable-station" },
      { id: "8ee1224b-cc7c-43f7-93d9-e7a05d4b8c3a", type: "link", yaw: 1.4358, pitch: -0.4058, label: "Cardio", icon: "ring", targetStopId: "cardio-entrance" },
      { id: "6abdba3a-6425-4684-8a82-5530f84b2759", type: "link", yaw: 3.1282, pitch: -0.3350, label: "Machine circuit", icon: "ring", targetStopId: "machine-circuit" },
    ] },
  { id: "machine-circuit", title: "Machine Circuit", image: "/virtual/08.jpeg", hotspots: [
      { id: "3afe1135-582a-4bd4-9dd2-1bf43555d89a", type: "link", yaw: 3.3277, pitch: -0.3647, label: "Middle", icon: "ring", targetStopId: "weight-room" },
      { id: "db2fe625-4e11-4a38-941d-f276d35c49ec", type: "link", yaw: 4.8534, pitch: -0.3613, label: "Training rig", icon: "ring", targetStopId: "functional-rig" },
      { id: "aa4f77cc-36ec-4510-84e2-90227e7b37fd", type: "link", yaw: 1.4092, pitch: -0.5244, label: "Front desk", icon: "ring", targetStopId: "front-desk" },
      { id: "d0bdf9d2-6686-4af7-89ee-55f56aebce2f", type: "link", yaw: 0.1290, pitch: -0.1930, label: "Treadmill row", icon: "ring", targetStopId: "treadmill-row" },
    ] },
  { id: "weight-room", title: "Weight Room", image: "/virtual/09.jpeg", hotspots: [
      { id: "9a484230-f06c-4e2a-bf82-43b0f19c0fc0", type: "link", yaw: 3.9493, pitch: -0.5116, label: "Strength machine", icon: "ring", targetStopId: "strength-machines" },
      { id: "14021e31-333c-4022-b998-3647deebabf0", type: "link", yaw: 2.7909, pitch: -0.4735, label: "Machine circuit", targetStopId: "machine-circuit" },
      { id: "db2d76b5-1284-49ea-aa22-8cba625e8329", type: "link", yaw: 0.8292, pitch: -0.4411, label: "Dumbells", icon: "ring", targetStopId: "dumbbell-bench" },
    ] },
  { id: "dumbbell-bench", title: "Dumbbell & Bench Area", image: "/virtual/10.jpeg", hotspots: [
      { id: "c7e30c8e-0978-4c7a-9ed9-04f352c8eb7e", type: "link", yaw: 1.8994, pitch: -0.5408, label: "Middle", icon: "ring", targetStopId: "weight-room" },
      { id: "fd0947e0-a814-49db-afc4-ba4be56dd142", type: "link", yaw: 4.8623, pitch: -0.4720, label: "Wall Free weights", icon: "ring", targetStopId: "free-weights-wall" },
    ] },
];
