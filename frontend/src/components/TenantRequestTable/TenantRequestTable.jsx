import styles from "./TenantRequestTable.module.css";
import { getAllApplications } from "../../../apis/application";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";

const TenantRequestTable = () => {

  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  // console.log(applications);

  const handleGetAllApplications = async () => {
    const response = await getAllApplications();

    // console.log(response);
    if(response?.status === 200) {
      setApplications(response?.data?.allApplications);
    }

  }

  useEffect(() => {
    handleGetAllApplications()
  }, [])

  return (
    <div className={styles.container}>
      <table style={{ width: "100%", borderRadius: "10px 10px 10px 10px", borderCollapse: "collapse" }}>
        <thead>
            <tr className={styles.labels}>
                <th style={{ paddingLeft: "2rem" }}>Unit Name</th>
                <th >Name</th>
                <th >Details</th>
                <th >Request Date</th>
            </tr>
        </thead>

       <tbody>

          {
            applications?.map((item) => {
              return <tr key={item._id}>
                <td>{item?.unitName}</td>
                <td>
                  {item?.personalInformation?.firstName + " " + item?.personalInformation?.lastName}
                </td>
                <td>
                    Lorem Ipsum Dolor Sit Amet
                    Amet..{" "}
                </td>
                <td>
                  {item?.requestDate}
                  <button onClick={() => navigate(`/applicationdetail/${item?._id}`)}>Review</button>
                </td>
            </tr>
            })
          }
            
       </tbody>

      </table>
    </div>
  );
};

export default TenantRequestTable;
