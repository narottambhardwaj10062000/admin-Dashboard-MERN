import styles from "./UnitCard.module.css";
import React from "react";
import unitImage from "../../assets/images/unitImage.png";
import tenantImage from "../../assets/images/tenantImage.png";

const UnitCard = ({ _id, address, image, rent, tenantId, unitName }) => {
  return (
    <div className={styles.cardContainer}>
      <img
        src={image}
        alt="unit-image"
      />

      <div className={styles.infoContainer}>
        <p className={styles.unitName}>{unitName}</p>
        <p className={styles.address}>{address}</p>
        <div>
          <img src={tenantImage} alt="tenant-image" />
          <span className={styles.name}>John Doe</span>
          <span className={styles.tenant}>Tenant</span>
        </div>
      </div>
    </div>
  );
};

export default UnitCard;
