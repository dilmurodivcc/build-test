import styles from './index.module.scss';


const Container = ({ children, className,...props }) => {

  return <div className={`${styles.container} ${className}`} {...props} >
    {children}
  </div>
}

export default Container;