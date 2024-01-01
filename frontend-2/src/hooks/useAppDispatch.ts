import { useDispatch } from "react-redux";
import reducers from "redux/reducers";
export type RootState = ReturnType<typeof reducers>;
import { UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
type TypedDispatch<T> = ThunkDispatch<T, unknown, UnknownAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
