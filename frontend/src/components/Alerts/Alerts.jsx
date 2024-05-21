import styles from "./Alerts.module.css";
import sendIcon from "../../assets/logos/sendIcon.svg";
import React from "react";

const Alerts = () => {
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

      <div>
        <p
          style={{
            color: "#1D1D1D",
            fontSize: "18px",
            fontWeight: "700",
            fontFamily: "Schibsted Grotesk",
          }}
        >
          Unit 2 Payment pending
        </p>
        <p
          style={{
            color: "#8B8B8B",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "Schibsted Grotesk",
          }}
        >
          Payment Pending For The Month Of March
        </p>
        <p
          style={{
            color: "#B3A05C",
            fontSize: "18px",
            fontWeight: "700",
            fontFamily: "Schibsted Grotesk",
          }}
        >
          $3350.00
        </p>
      </div>

      <button>
        <span>
          <img src={sendIcon} alt="send-icon" />
        </span>
        Send Request
      </button>
    </div>
  );
};

export default Alerts;
