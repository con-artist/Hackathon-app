import styles from './header.module.scss';
import logo from '../../assets/logo/logo.png' 

const Header = () => {
  return (
    <header className={`container ${styles.header}`}>
      <div className={styles.slogan}>
        <img src={logo} alt="logo" />
      </div>
      <div className={`link-bold-m ${styles.name}`}>DPhi</div>
    </header>
  )
}

export default Header;
