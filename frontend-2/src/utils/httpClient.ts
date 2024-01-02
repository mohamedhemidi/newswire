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
    headers?: Record<string, string>
  ) {
    // Caching mechanism:
    const cache = await caches.open("cache");
    const cachedKey = `${url}:${JSON.stringify(headers)}`;
    const cachedResponse = await cache.match(cachedKey);
    if (cachedResponse) return cachedResponse.json();

    try {
      const response = await fetch(url, {
        signal,
        headers: this.HEADERS(headers),
        cache: "no-store",
      });
      if (!response.ok) throw response;

      await cache.put(cachedKey, response.clone());
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
