import { useAppDispatch } from "hooks/useAppDispatch";
import GetCategories from "modules/settings/services/categories.services";
import GetSources from "modules/settings/services/sources.services";
import { useEffect, useRef } from "react";

const Home = () => {
  const dispatch = useAppDispatch();

  const shouldLog = useRef(true);
  
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      dispatch(GetCategories());
      dispatch(GetSources());
    }
  }, [dispatch]);

  return <div>Home</div>;
};

export default Home;
