const HTTP = {
  async GET(url: string) {
    return await fetch(url);
  },
  async POST(url: string, body: unknown) {
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  },
};

export default HTTP;
