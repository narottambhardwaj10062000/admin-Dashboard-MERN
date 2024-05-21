import styles from "./Header.module.css";
import React from 'react'
import menuIcon from "../../assets/logos/menuIcon.svg";
import notificationIcon from "../../assets/logos/notificationIcon.svg";
import profileIcon from "../../assets/logos/profileIcon.svg";
import downArrow from "../../assets/logos/downArrow.svg";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
        <div className={styles.leftNav}>
            <img src={menuIcon} alt="menu-icon"/>
            <p>Dashboard</p>
        </div>

        <div className={styles.rightNav}>
            <img src={notificationIcon} alt="notification-icon" />
            <div>
                <span>
                    <img src={profileIcon} alt="profile-icon" />
                </span>
                <span>
                    John Doe
                </span>
                <span>
                    <img src={downArrow} alt="downArrow" />
                </span>
            </div>
        </div>

    </div>
  )
}

export default Header