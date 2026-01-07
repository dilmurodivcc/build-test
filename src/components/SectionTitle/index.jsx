import styles from "./index.module.scss";


const SectionTitle = ({ children, className }) => {
  return (
    <div className={`${styles.title} ${className}`}>{children}</div>
  );
};

export default SectionTitle;