const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export default class HTTP {
  /*
  //  HEADERS:
  */
  HEADERS(headers?: Record<string, string>) {
    const mergedHeaders = new Headers({
      ...DEFAULT_HEADERS,
      ...headers,
    });
    return mergedHeaders;
  }
  /*
  //  GET Requests:
  */
  async GET(
    url: string,
    signal?: AbortSignal | null,
    headers?: Record<string, string>,
    enableCache = true,
    cacheName = "cache",
    cacheTime = 900 // 15 minutes
  ) {
    // Caching mechanism:
    const CACHE_NAME = cacheName;
    const CACHE_TTL = cacheTime;
    const cache = await caches.open(CACHE_NAME);
    const cachedKey = `${url}:${JSON.stringify(headers)}`;
    const cachedResponse = await cache.match(cachedKey);

    if (enableCache && cachedResponse) {
      const cachedData = await cachedResponse.json();
      const currentTime = Date.now();
      const timeDifference = (currentTime - cachedData.timestamp) / 1000;

      if (timeDifference < CACHE_TTL) {
        return cachedData.data;
      }
    }

    try {
      const response = await fetch(url, {
        signal,
        headers: this.HEADERS(headers),
        cache: "no-store",
      });
      if (!response.ok) throw response;

      await cache.put(
        cachedKey,
        new Response(
          JSON.stringify({
            timestamp: Date.now(),
            data: await response.json(),
          })
        )
      );
      const data = await response.json();

      return data;
    } catch (err) {
      if (err instanceof Response)
        throw {
          status: err.status,
          data: await err.json(),
        };
    }
  }
  /*
  //  POST Requests:
  */
  async POST(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
    signal?: AbortSignal
  ) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: this.HEADERS(headers),
        signal,
      });
      if (!response.ok) throw response;
      const data = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Response)
        throw {
          status: err.status,
          data: await err.json(),
        };
    }
  }
}
