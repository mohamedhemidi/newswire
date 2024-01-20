import styles from "./styles.module.css";

import { useAppSelector } from "hooks/useAppSelector";

type Category = {
  [key: string]: string;
};

const CategoryBar = () => {
  const { data } = useAppSelector((state) => state.categories) as {
    data: {
      categories: Category[];
    };
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
                  onClick={() => console.log("Clicked on ", categoryValue)}
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
