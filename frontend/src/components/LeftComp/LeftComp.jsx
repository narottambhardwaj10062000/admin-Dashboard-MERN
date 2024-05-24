import React from "react";
import styles from "./LeftComp.module.css";
import dashboardImage from "../../assets/logos/dashboardImage.svg";
import unitlist from "../../assets/logos/unitlist.svg";
import requests from "../../assets/logos/requests.svg";
import logoutImage from "../../assets/logos/logout.svg";
import { useNavigate } from "react-router-dom";
import { useStoreContext  } from "../../context/StoreContext";

const LeftComp = () => {

  const navigate = useNavigate();
  const { headerTitle, setHeaderTitle } = useStoreContext ();

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>
          LO<span>GO</span>
        </h1>
      </div>

      <div className={styles.nav}>

        <div className={`${styles.navItem} ${
            headerTitle === "Dashboard" ? styles.headerTitle : ""
          }`} onClick={() => {
          setHeaderTitle("Dashboard") 
          navigate("/")
        }} >
          <img src={dashboardImage} alt="dashboard-image" />
          <p style={{ fontSize: "24px", fontFamily: "Schibsted Grotesk" }}>Dashboard</p>
        </div>

        <div className={`${styles.navItem} ${
            headerTitle === "Unit List" ? styles.headerTitle : ""
          }`}
          onClick={() => {
          setHeaderTitle("Unit List")
          navigate("/unitlist")
        }}>
          <img src={unitlist} alt="unitlist-image" />
          <p>Unit List</p>
        </div>

        <div 
           className={`${styles.navItem} ${
            headerTitle === "Requests" ? styles.headerTitle : ""
          }`}
          onClick={() => {
          setHeaderTitle("Requests") 
          navigate("/requests")
        }}>
          <img src={requests} alt="requests-image" />
          <p>Requests</p>
        </div>

        <div 
          className={`${styles.navItem} ${
            headerTitle === "Payments" ? styles.headerTitle : ""
          }`}
          onClick={() => {
          setHeaderTitle("Payments") 
          navigate("/payments")
        }}>
          <img src={unitlist} alt="payments-image" />
          <p>Payments</p>
        </div>

        <div className={styles.navItem}>
          <img src={logoutImage} alt="logout-image" />
          <p>Logout</p>
        </div>
        
      </div>
    </div>
  );
};

export default LeftComp;
