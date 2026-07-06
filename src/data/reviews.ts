export type Review = {
  name: string;
  meta: string;
  timeAgo: string;
  text: string;
};

export const featuredQuote =
  "It's no way you gonna find 20,000 day pass gym in Vientiane like this.";

export const reviews: Review[] = [
  {
    name: "Dinesh Chaudhary",
    meta: "6 reviews · 4 photos",
    timeAgo: "2 years ago",
    text: "What an amazing gym with full of equipments and Crystal clean, new English exercise motivated music. Price is so attractive 10000kips…",
  },
  {
    name: "Quentin Daguerre",
    meta: "Local Guide · 33 reviews · 7 photos",
    timeAgo: "1 year ago",
    text: "Great gym, but 2 problems (in my opinion): bad music (the music is always the same style, modern american rnb/pop/hiphop)…",
  },
  {
    name: "Maurice Oftana",
    meta: "Local Guide · 15 reviews · 16 photos",
    timeAgo: "2 years ago",
    text: "Clean, very affordable, friendly staff and members of the gym. Highly recommended. Sabai sabai!",
  },
  {
    name: "john erwin castro",
    meta: "Local Guide · 11 reviews",
    timeAgo: "7 years ago",
    text: "Affordable Price with Nice amount of Gym Equipment",
  },
  {
    name: "Vũ Victor",
    meta: "Local Guide · 56 reviews · 43 photos",
    timeAgo: "5 years ago",
    text: "Ok",
  },
  {
    name: "Thammalat KHAMPASERT (Kop Xieng)",
    meta: "Local Guide · 19 reviews · 31 photos",
    timeAgo: "9 years ago",
    text: "Good",
  },
];

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
