export type TourStopIcon = "weights" | "cardio" | "machine" | "locker";

export type TourStop = {
  id: string;
  title: string;
  description: string;
  icon: TourStopIcon;
  gradient: string;
};

export const tourStops: TourStop[] = [
  {
    id: "free-weights",
    title: "Free Weights Floor",
    description:
      "Full racks of dumbbells and barbells, crystal clean and always stocked.",
    icon: "weights",
    gradient: "from-yellow-500/25 via-zinc-900 to-black",
  },
  {
    id: "cardio-zone",
    title: "Cardio Zone",
    description: "Treadmills, bikes, and rowers to get your heart rate up.",
    icon: "cardio",
    gradient: "from-zinc-800 via-zinc-900 to-black",
  },
  {
    id: "strength-machines",
    title: "Strength Machines",
    description: "Modern machines covering every muscle group.",
    icon: "machine",
    gradient: "from-yellow-500/15 via-zinc-900 to-black",
  },
  {
    id: "locker-rooms",
    title: "Locker Rooms",
    description: "Clean, secure lockers and showers to freshen up after.",
    icon: "locker",
    gradient: "from-zinc-800 via-zinc-900 to-black",
  },
];
