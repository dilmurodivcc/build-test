import styles from './index.module.scss';


const PrimaryButton = ({ children, className, ...props }) => {

  return <button className={`${styles.button} ${className}`} {...props} >
    {children}
  </button>
}


export default PrimaryButton;