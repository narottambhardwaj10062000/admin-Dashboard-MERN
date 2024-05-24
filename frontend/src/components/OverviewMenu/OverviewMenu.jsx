import styles from "./OverviewMenu.module.css";
import React, { useState, useEffect } from 'react'
import contactRequestIcon from "../../assets/logos/contactRequestIcon.svg";
import goldenWalletIcon from "../../assets/logos/goldenWalletIcon.svg";
import ledgerIcon from "../../assets/logos/ledgerIcon.svg";
import maintainenceIcon from "../../assets/logos/maintainenceIcon.svg";
import { getRequestsCount } from "../../../apis/common";
import { useStoreContext } from "../../context/StoreContext";


const OverviewMenu = () => {

    const { count, setCount, alerts, setAlerts } = useStoreContext();

  return (
    <div className={styles.container}>
        <div className={styles.menuCard}>
            <div>
                <img src={goldenWalletIcon} alt="golden-wallet-icon" />
                <p><span>{alerts?.length} </span>Due Payment</p>
            </div>
        </div>

        <div className={styles.menuCard}>
            <div>
                <img src={maintainenceIcon} alt="maintainence-icon" />
                <p><span>{ count?.maintainenceRequestCount } </span>Maintenance Request</p>
            </div>
        </div>

        <div className={styles.menuCard}>
            <div>
                <img src={contactRequestIcon} alt="contact-request-icon" />
                <p><span>{ count?.contactRequestCount } </span>contact Request</p>
            </div>
        </div>

        <div className={styles.menuCard}>
           <div>
                <img src={ledgerIcon} alt="ledger-icon" />
                <p>Generate Ledger</p>
           </div>
        </div>
    </div>
  )
}

export default OverviewMenu