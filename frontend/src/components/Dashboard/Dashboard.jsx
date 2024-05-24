import React from 'react'
import OverviewMenu from '../OverviewMenu/OverviewMenu'
import MaintainenceTable from '../MaintainenceTable/MaintainenceTable'
import styles from "./Dashboard.module.css";

export default function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <OverviewMenu />
            <p>Maintenance Requests</p>
            <MaintainenceTable />
        </div>
    )
}
