import styles from "./ContactRequestTable.module.css";
import React, { useState, useEffect } from "react";
import { getAllContactRequests } from "../../../apis/contact";
import moment from "moment";

const ContactRequestTable = () => {
  const [allRequests, setAllRequests] = useState([]);

  const handleGetAllContactRequests = async () => {
    const response = await getAllContactRequests();

    if (response?.status === 200) {
      setAllRequests(response?.data?.allContactRequests);
    }
  };

  useEffect(() => {
    handleGetAllContactRequests();
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
            <th style={{ paddingLeft: "2rem" }}>Unit Name</th>
            <th>Subjects</th>
            <th>Details</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {allRequests?.map((request) => {
            return (
              
                <tr key={request?._id}>
                  <td>{request?.unitName}</td>
                  <td>{request?.subject}</td>
                  <td>{request?.message} </td>
                  <td>{moment(request?.date).format('D MMM YYYY')}</td>
                </tr>
              
            );
          })}

        </tbody>
      </table>
    </div>
  );
};

export default ContactRequestTable;
