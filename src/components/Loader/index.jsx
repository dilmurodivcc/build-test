"use client";

import styles from "./index.module.scss";

const Loader = () => {
  const logoSrc = "/logoDark.png" 

  return (
    <div className={styles.loaderWrapper}>
      <img src={logoSrc} alt="Tasnim Travel" className={styles.logo} />
      <div className={styles.loader}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default Loader;
