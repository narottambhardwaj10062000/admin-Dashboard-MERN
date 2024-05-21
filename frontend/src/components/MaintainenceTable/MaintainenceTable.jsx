import styles from "./MaintainenceTable.module.css";
import tableImage from "../../assets/images/tableImage.png";
import React, { useEffect, useState } from "react";
import { getAllMaintainenceRequests } from "../../../apis/maintainence";

const MaintainenceTable = () => {
  const [allRequests, setAllRequests] = useState([]);
  // console.log(allRequests);

  const handleGetAllMaintainenceRequests = async () => {
    const response = await getAllMaintainenceRequests();

    if (response?.status === 200) {
      setAllRequests(response?.data?.allMaintainenceRequests);
    }
  };

  useEffect(() => {
    handleGetAllMaintainenceRequests();
  }, []);

  return (
    <div className={styles.container}>
      <table
        style={{
          width: "100%",
          borderRadius: "10px 10px 10px 10px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr className={styles.labels}>
            <th style={{ paddingLeft: "4rem" }}>Unit Name</th>
            <th style={{ paddingLeft: "0.5rem" }}>Photos</th>
            <th style={{ paddingLeft: "3.3rem" }}>Details</th>
            <th style={{ paddingLeft: "1rem" }}>Date</th>
          </tr>
        </thead>

        <tbody>
          {allRequests?.map((request) => {
            return (
              <div key={request?._id}>
                <tr>
                  <td>{request?.unitName}</td>
                  <td>
                    <img src={request?.image} alt="table-image" className={styles.img} />
                  </td>
                  <td>{request?.description}</td>
                  <td>{request?.date}</td>
                </tr>
              </div>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MaintainenceTable;
