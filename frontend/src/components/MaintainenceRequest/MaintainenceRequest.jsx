import React from "react";
import styles from "./MaintainenceRequest.module.css";
import HouseImg from "../../assets/images/HouseImg.png";
import { useStoreContext } from "../../context/StoreContext";
import moment from "moment";

const MaintainenceRequest = () => {
  const { unitDetails, setUnitDetails } = useStoreContext();

  return (
    <div className={styles.manitainanceRequestContainer}>
      <div className={styles.TitleBox}>
        <p>Maintenance Requests</p>
      </div>

      {unitDetails?.maintainenceRequests?.slice(0, 1).map((item) => {
        return <div key={item?._id} className={styles.secondContainer}>
          <div className={styles.issueContainer}>
            <img src={item?.image} alt="House Pic" />

            <div className={styles.infoContainer}>
              <h4>{item?.problem}</h4>
              <p>{ moment(item?.date).format('D MMM YYYY')}</p>
            </div>
          </div>

          <div className={styles.textContainer}>
            <p>
              {item?.description}
            </p>
          </div>
        </div>;
      })}
    </div>
  );
};

export default MaintainenceRequest;
