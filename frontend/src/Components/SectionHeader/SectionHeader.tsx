import styles from "./styles.module.css";

type Props = {
  title: string;
};

const SectionHeader = ({ title }: Props) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
    </div>
  );
};

export default SectionHeader;
