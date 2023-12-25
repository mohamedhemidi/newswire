import actions from "redux/actions";

const SignupReducer = (state = {}, action: SignupActionProps) => {
  switch (action.type) {
    case actions.SIGNUP_USER:
      return {
        ...state,
        loading: true,
      };
    case actions.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case actions.SIGNUP_USER_ERROR:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default SignupReducer;

export type SignupActionProps = {
  type: string;
};
