import styles from "./UnitCard.module.css";
import React from "react";
import unitImage from "../../assets/images/unitImage.png";
import tenantImage from "../../assets/images/tenantImage.png";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../../context/StoreContext";

const UnitCard = ({
  _id,
  address,
  image,
  rent,
  tenantId,
  unitName,
  personalInformation,
}) => {

  const { headerTitle, setHeaderTitle } = useStoreContext();
  const navigate = useNavigate();

  return (
    <div className={styles.cardContainer} onClick={() => {
      setHeaderTitle(unitName);
      navigate(`/unitdetail/${_id}`)
    }}>
      <img src={image} alt="unit-image" />

      <div className={styles.infoContainer}>
        <p className={styles.unitName}>{unitName}</p>
        <p className={styles.address}>{address}</p>
        {tenantId === undefined ? (
          <div style={{ color: "red", fontSize: "22px" }}>Unalloted</div>
        ) : (
          <div>
            <img src={tenantImage} alt="tenant-image" />
            <span className={styles.name}>
              {personalInformation?.firstName +
                " " +
                personalInformation?.lastName}
            </span>
            <span className={styles.tenant}>Tenant</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitCard;
