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

global.caches = {
  open: mockCacheStorage.open,
};

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
