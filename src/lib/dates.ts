/** Returns today's date as a YYYY-MM-DD string in UTC. */
export function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Returns an array of YYYY-MM-DD strings for the last `n` days,
 * oldest first (index 0 = n-1 days ago, last index = today).
 */
export function getLastNDays(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return d.toISOString().slice(0, 10);
  });
}
