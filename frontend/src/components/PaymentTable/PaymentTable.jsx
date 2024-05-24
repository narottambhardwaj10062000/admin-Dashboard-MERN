import styles from "./PaymentTable.module.css";
import CheckboxMarked from "../../assets/logos/checkboxMarked.svg";
import React from "react";
import { getAllPayments } from "../../../apis/payment";
import moment from "moment";

const PaymentTable = ({ allPayments }) => {
  console.log(allPayments);

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
            <th style={{ paddingLeft: "2rem" }}>
              <img src={CheckboxMarked} />
            </th>
            <th>Date</th>
            <th>Method</th>
            <th>Rent/Payment</th>
            <th>Charges</th>
            <th>Amount Paid</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {allPayments?.map((payment) => {
            return (
              <tr key={payment._id}>
                <td>
                  <input type="checkbox" />
                </td>
                
                <td>{payment?.paymentDate}</td>
                <td>{payment?.method}</td>
                <td>{payment?.paymentType}</td>
                <td>${payment?.charges}</td>
                <td>${payment?.amountPaid}</td>
                <td>${payment?.balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
