import React,{useState} from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiMenu,BiSolidHome,BiLogIn,BiLogOut } from "react-icons/bi";
import { FaInfoCircle } from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux';
import { authAction } from '../../store/authSlice';

const Navbar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate= useNavigate();

    const logoutHandler=()=>{
      dispatch(authAction.logout());
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("numberOfMails");
        navigate('/login');
    }

    const toggleMenu = () => {
        setMenuActive(!menuActive);
      };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <div className={styles.navbarTitle}><Link to="/about" className={styles.title}>Mail Box Client </Link> </div>
      </div>
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
      <span className={styles.hamburgerIcon}><BiMenu/></span>
    </button>
      <ul  className={`${styles.navbarNav} ${menuActive ? styles.active : ''}`}>
        <li className={styles.navItem}><Link to="/home" className={styles.navLink}><p><BiSolidHome/></p> Home</Link></li>
        <li className={styles.navItem}><Link to="/about" className={styles.navLink}><p><FaInfoCircle/></p> About</Link></li>
        {!isLoggedIn&& <li className={styles.navItem}><Link to="/login" className={styles.navLink}><p><BiLogIn/></p> Login</Link></li>}
        {isLoggedIn&& <li className={styles.navItem}><button  className={styles.navLink} onClick={logoutHandler}><p><BiLogOut/></p> Logout</button></li>}
        </ul>
    </nav>
  );
};

export default Navbar;
