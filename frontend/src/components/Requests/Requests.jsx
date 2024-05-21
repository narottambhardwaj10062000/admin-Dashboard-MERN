import styles from "./Requests.module.css";
import React from 'react'
import MaintainenceTable from "../MaintainenceTable/MaintainenceTable";
import ContactRequestTable from "../ContactRequestTable/ContactRequestTable";
import TenantRequestTable from "../TenantRequestTable/TenantRequestTable";

const Requests = () => {
  return (
    <>
        <MaintainenceTable />
        <ContactRequestTable />
        <TenantRequestTable />
    </>
  )
}

export default Requests

