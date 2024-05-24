import React from "react";
import styles from "./MemberList.module.css";
import JohnDoe from "../../assets/images/JohnDoe.png";
import { useStoreContext } from "../../context/StoreContext";

const MemberList = () => {
  const { unitDetails, setUnitDetails } = useStoreContext();

  return (
    <div className={styles.memberContainer}>
      <div className={styles.TitleBox}>
        <p>Member List</p>
      </div>

      {unitDetails?.occupants?.length === 0 ? (
        <h3>Not Available</h3>
      ) : (
        unitDetails?.occupants?.map((item) => {
          return (
            <div className={styles.members}>
              <img src={JohnDoe} alt="Profile Pic" />
              <div className={styles.informationContainer}>
                <h4>
                  {item?.name} <span>{item?.age}</span>
                </h4>
                <p>{item?.relationship}</p>
              </div>
            </div>
          );
        })
      )}

    </div>
  );
};

export default MemberList;
