export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Opacity that fades in over [inStart, inEnd], holds at 1, then fades out over [outStart, outEnd]. */
export function bandOpacity(
  progress: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number,
) {
  const fadeIn = clamp((progress - inStart) / (inEnd - inStart), 0, 1);
  const fadeOut = clamp((outEnd - progress) / (outEnd - outStart), 0, 1);
  return Math.min(fadeIn, fadeOut);
}
