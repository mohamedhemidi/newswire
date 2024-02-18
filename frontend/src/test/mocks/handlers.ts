import { PATH } from "constants/environment";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(PATH.createSession, () => {
    return HttpResponse.json({ status: 204 });
  }),
  http.post(PATH.userLogin, () => {
    return HttpResponse.json(
      {
        status: "Request was successful.",
        data: {
          user: {
            id: 3,
            name: "Mark",
            email: "mark@myer.com",
            email_verified_at: null,
          },
        },
      },
      { status: 200 }
    );
  }),
];
