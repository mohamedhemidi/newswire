import actions from "redux/actions";

type StateT = {
  loading: boolean;
  success?: boolean;
  error: object;
  data: object;
};

const SignupReducer = (
  state: StateT | object = {},
  action: SignupActionProps
) => {
  switch (action.type) {
    case actions.SIGNUP_USER:
      return {
        ...state,
        loading: true,
      };
    case actions.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        success: true,
        loading: false,
      };
    case actions.SIGNUP_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export default SignupReducer;

export type SignupActionProps = {
  type: string;
  payload: unknown;
};
