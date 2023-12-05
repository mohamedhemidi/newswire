const ENV: ObjectKey = import.meta.env.VITE_APP_ENV;

const BASE_URL = {
  dev: "http://localhost:8000",
  test: "",
  prod: "",
};

type ObjectKey = keyof typeof BASE_URL;

export const PATH = {
  // News
  fetchNews: `${BASE_URL[ENV]}/api/news`,
  fetchArticle: `${BASE_URL[ENV]}/api/news`,
  fetchCategories: `${BASE_URL[ENV]}/api/getCategories`,
  fetchSources: `${BASE_URL[ENV]}/api/getSources`,
  // Users
  userLogin: `${BASE_URL[ENV]}/api/auth/login`,
  userSignup: `${BASE_URL[ENV]}/api/auth/register`,
  userProfile: `${BASE_URL[ENV]}/api/user`,
  updateSettings: `${BASE_URL[ENV]}/api/user/settings/update`,
};
