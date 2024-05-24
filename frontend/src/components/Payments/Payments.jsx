import styles from "./Payments.module.css";
import React, { useState, useEffect } from "react";
import PaymentTable from "../PaymentTable/PaymentTable";
import { getAllPayments } from "../../../apis/payment";
import { getAllUnits } from "../../../apis/unit";

const Payments = () => {
  const [allPayments, setAllPayments] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("all")

  console.log(allPayments);

  const handleGetAllPayments = async (type) => {
    if (type === "all") {
      const response = await getAllPayments();

      if (response?.status === 200) {
        const newPayments = response?.data?.map(({ _id, ...rest }) => rest);
        setAllPayments(newPayments);
      }
      else if (response?.status === 404) {
        setAllPayments([])
      }
    }
    else {
      const response = await getAllPayments(type);

      if (response?.status === 200) {
        const newPayments = response?.data?.map(({ _id, ...rest }) => rest);
        setAllPayments(newPayments);
      }
      else if (response?.status === 404) {
        setAllPayments([])
      }
    }
  };

  const handleGetAllUnits = async () => {
    const response = await getAllUnits();
    // console.log(response);
    if(response?.status === 200) {
      setUnits(response?.data?.allUnits);
    }
  }

  useEffect(() => {
    handleGetAllPayments(selectedUnit);
  }, [selectedUnit]);

  useEffect(() => {
    handleGetAllUnits();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <select name="headphoneType" value={selectedUnit} onChange={(event) => setSelectedUnit(event.target.value)}>
          <option value="" disabled selected hidden>
            Selected Unit
          </option>
          {
            units?.map((unit) => {
              {/* console.log(unit?._id) */}
              return <option value={unit?._id}>{unit?.unitName}</option>
            })
          }
        </select>
      </div>

      <h3>Payment Details</h3>

      {
        allPayments.length === 0 ? <div style={{ textAlign: "center" }}><h1>No Payments Found</h1></div> : <PaymentTable allPayments = {allPayments}/>
      }
      
    </div>
  );
};

export default Payments;
