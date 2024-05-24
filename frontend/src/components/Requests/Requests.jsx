import styles from "./Requests.module.css";
import React, { useState } from "react";
import MaintainenceTable from "../MaintainenceTable/MaintainenceTable";
import ContactRequestTable from "../ContactRequestTable/ContactRequestTable";
import TenantRequestTable from "../TenantRequestTable/TenantRequestTable";
import { useStoreContext } from "../../context/StoreContext";

const Requests = () => {
  const [selected, setSelected] = useState("Maintenance Requests");
  const { count, setCount } = useStoreContext();
  console.log(count);

  return (
    <div className={styles.requestsContainer}>
      <div className={styles.slideBar}>
        <div
          className={`${styles.maintaenanceBar} ${
            selected === "Maintenance Requests" ? styles.selected : ""
          }`}
          onClick={() => setSelected("Maintenance Requests")}
        >
          <p>
            Maintenance Requests
            <sup
              style={{
                backgroundColor: "#61AA96",
                borderRadius: "50%",
                height: "16px",
                width: "16px",
                padding: "0.15rem",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              { count?.maintainenceRequestCount }
            </sup>
          </p>
        </div>

        <div
          className={`${styles.ContactBar} ${
            selected === "Contact Request" ? styles.selected : ""
          }`}
          onClick={() => setSelected("Contact Request")}
        >
          <p>
            Contact Request
            <sup
              style={{
                backgroundColor: "#61AA96",
                borderRadius: "50%",
                height: "16px",
                width: "16px",
                padding: "0.15rem",
                textAlign: "center",
              }}
            >
            { count?.contactRequestCount }
            </sup>
          </p>
        </div>

        <div
          className={`${styles.TenantBar} ${
            selected === "Tenant Application" ? styles.selected : ""
          }`}
          onClick={() => setSelected("Tenant Application")}
        >
          <p>
            Tenant Application
            <sup
              style={{
                backgroundColor: "#61AA96",
                borderRadius: "50%",
                height: "16px",
                width: "16px",
                padding: "0.15rem",
                textAlign: "center",
              }}
            >
              {count?.applicationRequestCount}
            </sup>
          </p>
        </div>
      </div>

      <div className={styles.container}>
        {selected === "Maintenance Requests" ? (
          <MaintainenceTable />
        ) : selected === "Contact Request" ? (
          <ContactRequestTable />
        ) : (
          <TenantRequestTable />
        )}
      </div>
    </div>
  );
};

export default Requests;
