export type Order = 'asc' | 'desc' | null;

export function filterAndSort<T extends { title?: string; name?: string }>(
  items: T[],
  query: string,
  order: Order,
  key: keyof T = 'title'
): T[] {
  const q = query.trim().toLowerCase();
  let out = items;

  if (q) {
    out = out.filter((i) => {
      const val = String(i[key] ?? '').toLowerCase();
      return val.includes(q);
    });
  }

  if (order) {
    out = out.slice().sort((a, b) => {
      const A = String(a[key] ?? '');
      const B = String(b[key] ?? '');
      if (A < B) return order === 'asc' ? -1 : 1;
      if (A > B) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return out;
}
