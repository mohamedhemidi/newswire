import actions from "redux/actions";

const LoginReducer = (state = {}, action: LoginActionProps) => {
  switch (action.type) {
    case actions.LOGIN_USER:
      return { ...state, loading: true, isLoggedIn: false };
    case actions.LOGIN_USER_SUCCESS:
      localStorage.setItem("auth_token", action.payload.data.token);
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
