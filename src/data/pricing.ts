export type Plan = {
  id: string;
  name: string;
  price: number;
  unit: string;
  months: number | null;
  highlight?: boolean;
};

export const plans: Plan[] = [
  { id: "day", name: "Day Pass", price: 20_000, unit: "/ day", months: null },
  { id: "1m", name: "1 Month", price: 350_000, unit: "/ month", months: 1 },
  { id: "3m", name: "3 Months", price: 800_000, unit: "/ 3 months", months: 3 },
  {
    id: "6m",
    name: "6 Months",
    price: 1_500_000,
    unit: "/ 6 months",
    months: 6,
  },
  {
    id: "1y",
    name: "1 Year",
    price: 2_300_000,
    unit: "/ year",
    months: 12,
    highlight: true,
  },
];

export const MONTHLY_BASELINE = 350_000;

export function formatKip(value: number) {
  return `₭${Math.round(value).toLocaleString("en-US")}`;
}

export function perMonth(plan: Plan) {
  if (!plan.months || plan.months <= 1) return null;
  return Math.round(plan.price / plan.months / 1000) * 1000;
}

export function savingsPercent(plan: Plan) {
  if (!plan.months || plan.months <= 1) return null;
  const baseline = MONTHLY_BASELINE * plan.months;
  const savings = baseline - plan.price;
  if (savings <= 0) return null;
  return Math.round((savings / baseline) * 100);
}
