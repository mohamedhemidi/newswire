import { useAppDispatch } from "hooks/useAppDispatch";
import GetCategories from "modules/news/services/categories.services";
import GetSources from "modules/news/services/sources.services";
import { useEffect, useRef } from "react";

const Home = () => {
  const dispatch = useAppDispatch();

  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      dispatch(GetCategories());
      dispatch(GetSources());
    }
  }, [dispatch]);

  return <div>Home</div>;
};

export default Home;
