import actions from "redux/actions";

const UserReducer = (state = {}, action: UserActionProps) => {
  switch (action.type) {
    case actions.USER_PROFILE:
      return { ...state, loading: true, isLoggedIn: false };
    case actions.USER_PROFILE_SUCCESS:
      return { ...state, ...action.payload, loading: false, isLoggedIn: true };
    case actions.USER_PROFILE_ERROR:
      return { ...state, ...action.payload, loading: false, isLoggedIn: false };

    default:
      return state;
  }
};

export default UserReducer;

export type UserActionProps = {
  type: string;
};
