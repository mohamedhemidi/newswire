const HTTP = {
  /*
  //  GET Requests:
  */
  async GET(url: string) {
    try {
      const response = await fetch(url);
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
  },
  /*
  //  POST Requests:
  */
  async POST(url: string, body: unknown) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
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
  },
};

export default HTTP;
