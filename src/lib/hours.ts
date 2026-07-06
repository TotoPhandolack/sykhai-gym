export type DayHours = {
  day: string;
  thai: string;
  open: string | null;
  close: string | null;
};

export const weeklyHours: DayHours[] = [
  { day: "Monday", thai: "วันจันทร์", open: "15:00", close: "20:30" },
  { day: "Tuesday", thai: "วันอังคาร", open: "15:00", close: "20:30" },
  { day: "Wednesday", thai: "วันพุธ", open: "15:00", close: "20:30" },
  { day: "Thursday", thai: "วันพฤหัสบดี", open: "15:00", close: "20:30" },
  { day: "Friday", thai: "วันศุกร์", open: "15:00", close: "20:30" },
  { day: "Saturday", thai: "วันเสาร์", open: "15:00", close: "20:30" },
  { day: "Sunday", thai: "วันอาทิตย์", open: null, close: null },
];

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function getVientianeNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Vientiane",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Monday";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0") % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");

  return { weekday, minutes: hour * 60 + minute };
}

export function getOpenStatus(now = getVientianeNow()) {
  const today = weeklyHours.find((d) => d.day === now.weekday);
  if (!today || !today.open || !today.close) {
    return { openNow: false, today: today?.day ?? now.weekday };
  }
  const openNow =
    now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close);
  return { openNow, today: today.day };
}
