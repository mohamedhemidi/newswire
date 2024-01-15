import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { HomeSection } from "modules/news/components/HomeSection";
import GetNews from "modules/news/services/news.services";
import { useEffect, useRef } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const shouldRun = useRef(true);

  const { query } = useAppSelector((state) => state.search);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      dispatch(GetNews(query));
    }
  }, [dispatch, query]);

  return (
    <main className="main-section">
      <HomeSection />
    </main>
  );
};

export default Home;
