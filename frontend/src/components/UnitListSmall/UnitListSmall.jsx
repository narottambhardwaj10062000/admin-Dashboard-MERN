import styles from "./UnitListSmall.module.css";
import React, { useState, useEffect } from "react";
import doubleRightArrowIcon from "../../assets/logos/doubleRightArrowIcon.svg";
import singleUnitImage from "../../assets/images/singleUnitImage.png";
import plusIcon from "../../assets/logos/plusIcon.png";
import { getAllUnits } from "../../../apis/unit";
import { useNavigate} from "react-router-dom";

const UnitListSmall = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);

  const handleGetAllUnits = async () => {
    const response = await getAllUnits();
    if (response?.status === 200) {
      setUnits(response?.data?.allUnits);
    }
  };

  useEffect(() => {
    handleGetAllUnits();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.TitleBox}>
        <p className={styles.title}>Unit List</p>

        <p className={styles.viewAll} onClick={() => navigate("/unitlist")}>
          View All{" "}
          <span>
            <img src={doubleRightArrowIcon} alt="double-right-arrow-icon" />
          </span>
        </p>
      </div>

      {units?.slice(0,3).map((unit, index) => {
        return (
          <div className={styles.singleUnit} key={index}>
            <img src={unit?.image} alt="single-unit-image" />
            <div>
              <div>
                <p>{unit?.unitName}</p>
              </div>
              <p>{unit?.address}</p>
            </div>
          </div>
        );
      })}

      <button>
        <div>
          <img src={plusIcon} alt="plus-icon" />
          <span>Add New Unit</span>
        </div>
      </button>
    </div>
  );
};

export default UnitListSmall;
