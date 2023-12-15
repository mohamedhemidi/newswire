/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "utils/ReduxHooks";
import styles from "./styles.module.css";

const CategoryBar = ({ onCategoryClick }: any) => {
  const { categories } = useAppSelector((state) => state.settings.data);

  const selectCategory = (data: any) => {
    onCategoryClick(data);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Categories</h2>
      <nav className={styles.links}>
        {categories.map((category, index) => {
          const [categoryKey, categoryValue] = Object.entries(category)[0];
          return (
            <p key={index} onClick={() => selectCategory(categoryValue)}>
              {categoryKey}
            </p>
          );
        })}
      </nav>
    </div>
  );
};

export default CategoryBar;
