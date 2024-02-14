import { PATH } from "constants/environment";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(PATH.createSession, () => {
    return HttpResponse.json(
      { status: 204 }
    );
  }),
  http.post(PATH.userLogin, () => {
    return HttpResponse.json(
      {
        message: "The email field is required. (and 1 more error)",
      },
      { status: 422 }
    );
  }),
];
