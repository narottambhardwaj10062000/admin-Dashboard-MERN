import styles from "./Alerts.module.css";
import sendIcon from "../../assets/logos/sendIcon.svg";
import React from "react";
import { useStoreContext } from "../../context/StoreContext";
import { handlePaymentRequest } from "../../../apis/common";

const Alerts = () => {
  const { alerts, setAlerts } = useStoreContext();

  const requestPayment = async (unitId, month, amount) => {
    await handlePaymentRequest(unitId, month, amount );
  }

  return (
    <div className={styles.alertsContainer}>
      <p
        style={{
          color: "#1D1D1D",
          fontSize: "22px",
          fontWeight: "500",
          fontFamily: "Schibsted Grotesk",
        }}
      >
        Alerts
      </p>

      {alerts?.map((alert, index) => {
        return (
          <div key={index} className={styles.alerts}>
            <div>
              <p
                style={{
                  color: "#1D1D1D",
                  fontSize: "18px",
                  fontWeight: "700",
                  fontFamily: "Schibsted Grotesk",
                }}
              >
                {alert?.unitName} Payment pending
              </p>
              <p
                style={{
                  color: "#8B8B8B",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Schibsted Grotesk",
                }}
              >
                Payment Pending For The Month Of {alert?.currentMonth}
              </p>
              <p
                style={{
                  color: "#B3A05C",
                  fontSize: "18px",
                  fontWeight: "700",
                  fontFamily: "Schibsted Grotesk",
                }}
              >
                ${alert?.totalDueAmount}
              </p>
            </div>

            <button onClick={() => requestPayment(alert?.unitId, alert?.currentMonth, alert?.totalDueAmount)}>
              <span>
                <img src={sendIcon} alt="send-icon" />
              </span>
              Send Request
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Alerts;
