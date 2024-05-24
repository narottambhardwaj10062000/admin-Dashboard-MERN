import styles from "./Home.module.css";
import LeftComp from "../LeftComp/LeftComp";
import Header from "../Header/Header";
import React, { useEffect, useState } from "react";
import Alerts from "../Alerts/Alerts";
import UnitListSmall from "../UnitListSmall/UnitListSmall";
import OverviewMenu from "../OverviewMenu/OverviewMenu";
import MaintainenceTable from "../MaintainenceTable/MaintainenceTable";

import { Outlet } from "react-router-dom";
import { useStoreContext } from "../../context/StoreContext";
import MemberList from "../MemberList/MemberList";
import MaintainenceRequest from "../MaintainenceRequest/MaintainenceRequest";

const Home = () => {
  
  const { headerTitle, setHeaderTitle } = useStoreContext();

 

  return (
    <div className={styles.homeContainer}>
      <LeftComp />
      <Header />

      <div className={styles.midContainer}>
        <Outlet />
      </div>

      {headerTitle === "Dashboard" ||
      headerTitle === "Unit List" ||
      headerTitle === "Requests" ||
      headerTitle === "Payments" ? (
        <div className={styles.rightContainer}>
          <Alerts />
          <UnitListSmall />
        </div>
      ) : (
        <div className={styles.rightContainer}>
          <MemberList />
          <MaintainenceRequest />
        </div>
      )}
    </div>
  );
};

export default Home;
