import { PATH } from "constants/environment";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(PATH.createSession, () => {
    return HttpResponse.json({ status: 204 });
  }),
  http.post(PATH.userLogin, () => {
    return HttpResponse.json(
      {
        message: "The email field is required. (and 1 more error)",
      },
      { status: 422 }
    );
  }),
  http.post(PATH.userLogin, () => {
    return HttpResponse.json(
      {
        status: "Request was successful.",
        message: null,
        data: {
          user: {
            id: 3,
            name: "Mark",
            email: "mark@myer.com",
            email_verified_at: null,
            created_at: "2023-12-04T02:34:28.000000Z",
            updated_at: "2023-12-04T02:34:28.000000Z",
          },
          token: "286|hCeCTn8ljJ4i7WDDePHt8fgKWr2Linu1EDlsTIDb269df61f",
        },
      },
      { status: 200 }
    );
  }),
];
