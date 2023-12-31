import actions from "redux/actions";

const initialState = {
  loading: false,
  error: null,
  data: {},
};

const SignupReducer = (state = initialState, action: SignupActionProps) => {
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
        loading: false,
      };
    case actions.SIGNUP_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
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
