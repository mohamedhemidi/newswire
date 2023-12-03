const ENV: ObjectKey = import.meta.env.VITE_APP_ENV;

const BASE_URL = {
  dev: "http://localhost:8000/api",
  test: "",
  prod: "",
};

type ObjectKey = keyof typeof BASE_URL;

export const PATH = {
  // News
  fetchNews: `${BASE_URL[ENV]}/news`,
};
