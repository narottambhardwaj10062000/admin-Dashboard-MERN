import styles from "./ContactRequestTable.module.css";
import React, { useState, useEffect } from "react";
import { getAllContactRequests } from "../../../apis/contact";

const ContactRequestTable = () => {
  const [allRequests, setAllRequests] = useState([]);
  console.log(allRequests);

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
              <div key={request?._id}>
                <tr>
                  <td>{request?.unitName}</td>
                  <td>{request?.subject}</td>
                  <td>{request?.message} </td>
                  <td>{request?.date}</td>
                </tr>
              </div>
            );
          })}

          {/* <tr>
            <td>Unit-1</td>
            <td>Lorem Ipsum Dolor Sit</td>
            <td>Lorem Ipsum Dolor Sit Amet Amet.. </td>
            <td>5 May 2024 </td>
          </tr> */}

          {/* <tr>
            <td>Unit-2</td>
            <td>
            Sit Amet
                Amet..{" "}
            </td>
            <td>
                Lorem Ipsum Dolor Sit Amet
                Amet..{" "}
            </td>
            <td>5 May 2024 </td>
            </tr>

            <tr>
            <td>Unit-3</td>
            <td>
            Lorem Ipsum Dolor Sit
            </td>
            <td>
                Lorem Ipsum Dolor Sit Amet
                Amet..{" "}
            </td>
            <td>5 May 2024 </td>
            </tr>

            <tr>
            <td>Unit-4</td>
            <td>
            Amet
                Amet..{" "}
            </td>
            <td>
                Lorem Ipsum Dolor Sit Amet
                Amet..{" "}
            </td>
            <td>5 May 2024 </td>
            </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default ContactRequestTable;
