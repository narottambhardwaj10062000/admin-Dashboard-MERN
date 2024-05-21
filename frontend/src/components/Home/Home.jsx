import styles from "./Home.module.css";
import LeftComp from "../LeftComp/LeftComp";
import Header from "../Header/Header";
import React from 'react'
import Alerts from "../Alerts/Alerts";
import UnitListSmall from "../UnitListSmall/UnitListSmall";
import OverviewMenu from "../OverviewMenu/OverviewMenu";
import MaintainenceTable from "../MaintainenceTable/MaintainenceTable";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
        <div className={styles.leftContainer}>
            <LeftComp />
        </div>
        <div className={styles.rightContainer}>
            <Header />

            <div className={styles.test}>
              <OverviewMenu />
              <Alerts />
            </div>

            <p>Maintenance Requests</p>

            <MaintainenceTable />
            {/* <Alerts /> */}
            <UnitListSmall />
            {/* <OverviewMenu /> */}
        </div>
    </div>
  )
}

export default Home
