import styles from "./UnitList.module.css";
import React, { useEffect, useState } from 'react'
import UnitCard from "../UnitCard/UnitCard";
import { getAllUnits } from "../../../apis/unit";
import { useStoreContext } from "../../context/StoreContext";

const UnitList = () => {

  const [units, setUnits] = useState([]);

  const handleGetAllUnits = async () => {
    const response = await getAllUnits();
    if(response?.status === 200) {
      setUnits(response?.data?.allUnits);
    }
  }

  useEffect(() => {
    handleGetAllUnits();
  }, [])

  return (
    <div className={styles.container}>
        <div>
            {
              units?.map((unit) => {
                return <UnitCard key={unit._id} {...unit} />
              })
            }
        </div>
    </div>
  )
}

export default UnitList