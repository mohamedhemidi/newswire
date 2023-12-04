import { useAppSelector } from "@Utils/ReduxHooks";
import styles from "./styles.module.css";
import HappyIcon from "@Assets/icons/happy";


const ProfileCard = () => {
  const { user } = useAppSelector((state) => state.users);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Hi!, {user.name}</h3>
      <HappyIcon />
    </div>
  );
};

export default ProfileCard;
