import { useAppDispatch } from "hooks/useAppDispatch";
import styles from "./styles.module.css";

import { useAppSelector } from "hooks/useAppSelector";
import { search } from "modules/search/services/search.services";

type Category = {
  [key: string]: string;
};

const CategoryBar = () => {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.categories) as {
    data: {
      categories: Category[];
    };
  };

  const handleCategorySelect = (category: string) => {
    const selecetdCategory = [category];
    dispatch(search({ categories: selecetdCategory }));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Categories</h2>
      <nav className={styles.links}>
        {data
          ? data.categories.map((category, index) => {
              const [categoryKey, categoryValue] = Object.entries(category)[0];
              return (
                <p
                  key={index}
                  onClick={() => handleCategorySelect(categoryValue)}
                >
                  {categoryKey}
                </p>
              );
            })
          : null}
      </nav>
    </div>
  );
};

export default CategoryBar;
