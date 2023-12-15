/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "utils/ReduxHooks";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

const ProfileCard = () => {
  const { user } = useAppSelector<any>((state) => state.users);
  const [name, setName] = useState("")

  useEffect(() => {
    setName(user.name)
  }, [user])
  

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Hi!, {name}</h3>
    </div>
  );
};

export default ProfileCard;
