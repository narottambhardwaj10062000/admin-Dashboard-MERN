import styles from "./OverviewMenu.module.css";
import React from 'react'
import contactRequestIcon from "../../assets/logos/contactRequestIcon.svg";
import goldenWalletIcon from "../../assets/logos/goldenWalletIcon.svg";
import ledgerIcon from "../../assets/logos/ledgerIcon.svg";
import maintainenceIcon from "../../assets/logos/maintainenceIcon.svg";


const OverviewMenu = () => {
  return (
    <div className={styles.container}>
        <div className={styles.menuCard}>
            <div>
                <img src={goldenWalletIcon} alt="golden-wallet-icon" />
                <p><span>5 </span>Due Payment</p>
            </div>
        </div>

        <div className={styles.menuCard}>
            <div>
                <img src={maintainenceIcon} alt="maintainence-icon" />
                <p><span>2 </span>Maintenance Request</p>
            </div>
        </div>

        <div className={styles.menuCard}>
            <div>
                <img src={contactRequestIcon} alt="contact-request-icon" />
                <p><span>4 </span>contact Request</p>
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