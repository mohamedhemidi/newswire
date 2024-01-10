import { useAppDispatch } from "hooks/useAppDispatch";
import GetCategories from "modules/news/services/categories.services";
import GetNews from "modules/news/services/news.services";
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

  const query = {
    keyword: "",
    sources: "",
    categories: "",
  };

  useEffect(() => {
    dispatch(GetNews(query));
  }, []);

  return <div>Home</div>;
};

export default Home;
