import { AUTH_TOKEN } from "modules/authentication/constants/auth";
import actions from "redux/actions";

type StateT = {
  isLoggedIn: boolean;
  loading: boolean;
  error: Pick<LoginActionProps, "payload">;
  data: Pick<LoginActionProps, "payload">;
};

const LoginReducer = (
  state: StateT | object = {},
  action: LoginActionProps
) => {
  switch (action.type) {
    case actions.LOGIN_USER:
      return { ...state, loading: true, isLoggedIn: false };
    case actions.LOGIN_USER_SUCCESS:
      localStorage.setItem(AUTH_TOKEN, action.payload.data.token);
      return {
        ...state,
        data: action.payload,
        loading: false,
        isLoggedIn: true,
      };
    case actions.LOGIN_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isLoggedIn: false,
      };
    case actions.LOGOUT_USER:
      return { ...state, loading: false, isLoggedIn: false };
    default:
      return state;
  }
};

export default LoginReducer;

export type LoginActionProps = {
  payload: {
    status: string;
    message: string;
    data: {
      token: string;
      user: {
        id: number;
        name: string;
        email: string;
      };
    };
  };
  type: string;
};
