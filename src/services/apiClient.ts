/**
 * Every service resolves data through this helper. Today it always
 * resolves the provided mock factory after a small artificial delay, so
 * loading states behave like a real network call. When a real endpoint is
 * ready, swap the body for a `fetch(...)` call — consumers (hooks, pages)
 * do not need to change, since they only see the returned Promise<T>.
 */
export async function resolve<T>(mockFactory: () => T, delayMs = 220): Promise<T> {
  await new Promise((r) => setTimeout(r, delayMs))
  return mockFactory()
}
