import "@testing-library/jest-dom";

import { server } from "./mocks/server";

// Cache Storage Mocking :

const mockCacheStorage = {
  open: vi.fn(() =>
    Promise.resolve({
      match: vi.fn(() => Promise.resolve("cachedResponse")),
    })
  ),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).caches = {
  open: mockCacheStorage.open,
};

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
