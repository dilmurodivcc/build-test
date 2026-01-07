


import styles from './index.module.scss';


const SecondaryButton = ({ children, ...props }) => {

  return <button className={styles.button} {...props} >
    {children}
  </button>
}


export default SecondaryButton;