import { TypedUseSelectorHook, useSelector } from "react-redux";
import reducers from "redux/reducers";
export type RootState = ReturnType<typeof reducers>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
