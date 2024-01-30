const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

type ParamsT = {
  body?: unknown;
  signal?: AbortSignal | null;
  headers?: Record<string, string>;
  enableCache?: boolean;
  cacheName?: "cache";
  withCredentials?: boolean;
  cacheTime?: number; // 15 minutes
};

class HTTP {
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
    url: RequestInfo | URL,
    {
      signal = null,
      headers,
      enableCache = false,
      cacheName = "cache",
      withCredentials = false,
      cacheTime = 900,
    }: ParamsT = {}
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
        credentials: withCredentials ? "include" : "omit",
      });
      if (!response.ok) throw response;

      const data = await response.json();

      if (enableCache) {
        await cache.put(
          cachedKey,
          new Response(
            JSON.stringify({
              timestamp: Date.now(),
              data,
            })
          )
        );
      }
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
    url: RequestInfo | URL,
    { body, headers, signal = null, withCredentials = false }: ParamsT
  ) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: this.HEADERS(headers),
        credentials: withCredentials ? "include" : "omit",
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

export default HTTP;
