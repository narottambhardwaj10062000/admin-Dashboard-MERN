import React from "react";
import styles from "./LeftComp.module.css";
import dashboardImage from "../../assets/logos/dashboardImage.svg";
import unitlist from "../../assets/logos/unitlist.svg";
import requests from "../../assets/logos/requests.svg";
import logoutImage from "../../assets/logos/logout.svg";

const LeftComp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>
          LO<span>GO</span>
        </h1>
      </div>

      <div className={styles.nav}>

        <div className={styles.dashboard}>
          <img src={dashboardImage} alt="dashboard-image" />
          <p>Dashboard</p>
        </div>

        <div>
          <img src={unitlist} alt="unitlist-image" />
          <p>Unit List</p>
        </div>

        <div>
          <img src={requests} alt="requests-image" />
          <p>Requests</p>
        </div>

        <div>
          <img src={unitlist} alt="payments-image" />
          <p>Payments</p>
        </div>

        <div>
          <img src={logoutImage} alt="logout-image" />
          <p>Logout</p>
        </div>
        
      </div>
    </div>
  );
};

export default LeftComp;
