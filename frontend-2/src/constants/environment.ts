const BASE_URL = {
  dev: "http://localhost:8000",
  //test: "",
  //prod: "",
};

const ENV: ObjectKey = import.meta.env.VITE_APP_ENV || "prod";
type ObjectKey = keyof typeof BASE_URL;

const API_ENDPOINT = BASE_URL[ENV];

export const PATH = {
  // News
  fetchNews: `${API_ENDPOINT}/api/news`,
  fetchArticle: `${API_ENDPOINT}/api/news`,
  fetchCategories: `${API_ENDPOINT}/api/getCategories`,
  fetchSources: `${API_ENDPOINT}/api/getSources`,
  // Users
  userLogin: `${API_ENDPOINT}/api/auth/login`,
  userSignup: `${API_ENDPOINT}/api/auth/register`,
  userProfile: `${API_ENDPOINT}/api/user`,
  updateSettings: `${API_ENDPOINT}/api/user/settings/update`,
};
