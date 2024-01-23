import { useAppDispatch } from "hooks/useAppDispatch";
import { HomeSection } from "modules/news/components/HomeSection";
import GetCategories from "modules/news/services/categories.services";
import { useEffect, useRef } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      dispatch(GetCategories());
    }
  }, [dispatch]);

  return (
    <main className="main-section">
      <HomeSection />
    </main>
  );
};

export default Home;
