import styles from "./MaintainenceTable.module.css";
import tableImage from "../../assets/images/tableImage.png";
import React, { useEffect, useState } from "react";
import { getAllMaintainenceRequests } from "../../../apis/maintainence";
import moment from "moment";

const MaintainenceTable = () => {
  const [allRequests, setAllRequests] = useState([]);

  const handleGetAllMaintainenceRequests = async () => {
    const response = await getAllMaintainenceRequests();

    if (response?.status === 200) {
      setAllRequests(response?.data?.allMaintainenceRequests);
    }
  };

  useEffect(() => {
    handleGetAllMaintainenceRequests();
  }, []);

  const trimDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length <= wordLimit) return description;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className={styles.container}>
      {/* <h1>Maintainence Requests</h1> */}
      <table
        style={{
          width: "100%",
          borderRadius: "10px 10px 10px 10px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr className={styles.labels}>
            <th style={{ paddingLeft: "2rem" }}>Unit Name</th>
            <th >Photos</th>
            <th >Details</th>
            <th style={{ paddingLeft: "3rem" }}>Date</th>
          </tr>
        </thead>

        <tbody>
          {allRequests?.map((request) => {
            return (
              <tr key={request?._id}>
                <td>{request?.unitName}</td>
                <td>
                  <img
                    src={request?.image}
                    alt="table-image"
                    className={styles.img}
                  />
                </td>
                <td>
                  <span className={styles.tooltip}>
                    {trimDescription(request?.description, 8)}
                    <span className={styles.tooltipText}>
                      {request?.description}
                    </span>
                  </span>
                </td>
                <td>{moment(request?.date).format("D MMMM YYYY")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MaintainenceTable;
