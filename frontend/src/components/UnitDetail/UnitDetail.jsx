import React, { useEffect, useState } from "react";
import styles from "./UnitDetail.module.css";
import WalletIcon from "../../assets/logos/WalletIcon.png";
import Arrow from "../../assets/logos/arrow.png";
import AddDocument from "../../assets/logos/AddDocument.png";
import { createPayment } from "../../../apis/payment";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getAllPayments } from "../../../apis/payment";
import { useForm } from "react-hook-form";
import PaymentTable from "../../components/PaymentTable/PaymentTable";
import { getUnitDetail } from "../../../apis/unit";
import { useStoreContext } from "../../context/StoreContext";
import { handleDocumentRequest } from "../../../apis/common";
import { editPayment } from "../../../apis/payment";
import { getDueAmount } from "../../../apis/unit";

const UnitDetail = () => {
  const { unitId } = useParams();
  const { unitDetails, setUnitDetails, setHeaderTitle, headerTitle } =
    useStoreContext();
  const [allPayments, setAllPayments] = useState([]);
  const [editPaymentId, setEditPaymentId] = useState(null);
  const [editPaymentData, setEditPaymentData] = useState({});
  const [dueAmount, setDueAmount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  // Watch the charges and amountPaid fields
  const charges = watch("charges", 0);
  const amountPaid = watch("amountPaid", 0);

  // Calculate balance whenever charges or amountPaid changes
  useEffect(() => {
    const chargesValue = parseFloat(charges) || 0;
    const amountPaidValue = parseFloat(amountPaid) || 0;
    const balance = (chargesValue - amountPaidValue).toFixed(2);
    setValue("balance", balance);
  }, [charges, amountPaid, setValue]);

  // get Due Amount
  const handleGetDueAmount = async () => {
    const response = await getDueAmount(unitId);
    // console.log(response);

    if (response?.status === 200) {
      setDueAmount(response?.data);
    }
  };

  const handleGetUnitDetail = async () => {
    const response = await getUnitDetail(unitId);

    if (response?.status === 200) {
      setUnitDetails(response?.data);
    }
  };

  // request document
  const requestDocument = async () => {
    await handleDocumentRequest(unitDetails?.tenant?._id);
  };

  const handleGetAllPayments = async () => {
    const response = await getAllPayments(unitId);

    if (response?.status === 200) {
      setAllPayments(response?.data);
    }
  };

  useEffect(() => {
    handleGetAllPayments();
    handleGetUnitDetail();
    handleGetDueAmount();
  }, []);

  const onSubmit = async (data) => {
    data.unitId = unitId;
    data.balance = data.charges - data.amountPaid;

    const response = await createPayment(data);

    if (response?.status === 200) {
      handleGetAllPayments();
      reset();
    }
    console.log(response);
  };

  // ------------All about Edit------------------------
  useEffect(() => {
    const updatedBalance = editPaymentData.charges - editPaymentData.amountPaid;
    setEditPaymentData((prev) => ({
      ...prev,
      balance: updatedBalance,
    }));
  }, [editPaymentData.charges, editPaymentData.amountPaid]);

  const handleEditPaymentChange = (e) => {
    const { name, value } = e.target;
    setEditPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = (payment) => {
    setEditPaymentId(payment._id);
    setEditPaymentData(payment);
  };

  const handleSaveClick = async (paymentId) => {
    const response = await editPayment(unitId, paymentId, editPaymentData);

    if (response?.status === 200) {
      handleGetAllPayments();
      setEditPaymentId(null);
      handleGetDueAmount();
    }
  };

  return (
    <div className={styles.container}>
      {/* Banner */}
      <div className={styles.topContainer}>
        <div className={styles.leftContainer}>
          <img src={unitDetails?.unit?.image} />
          <div className={styles.textContainer}>
            <h2>{unitDetails?.unit?.unitName}</h2>
            <p>Payment Pending For The Month Of {dueAmount?.currentMonth}</p>
          </div>
        </div>

        {unitDetails?.unit?.tenantId !== undefined ? (
          <div className={styles.rightContainer}>
            <div className={styles.iconContainer}>
              <img src={WalletIcon} />
            </div>
            <div className={styles.rightTextContainer}>
              <p>Balance Due</p>
              <h2>${dueAmount?.totalDueAmount}</h2>
            </div>
          </div>
        ) : null}
      </div>

      {unitDetails?.unit?.tenantId !== undefined ? (
        <div className={styles.documentContainer}>
          <div className={styles.headingContainer}>
            <h2>Document</h2>
            <button className={styles.btn}>
              View All
              <img src={Arrow} />
              <img src={Arrow} />
            </button>
          </div>

          <div className={styles.cardContainer}>
            {unitDetails?.tenant?.documents?.identification ? (
              <div className={styles.oneCard}>
                <img
                  className={styles.image}
                  src={unitDetails?.tenant?.documents?.identification}
                />
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Identification
                </p>
              </div>
            ) : null}

            {unitDetails?.tenant?.documents?.electricityBill ? (
              <div className={styles.oneCard}>
                <img
                  className={styles.image}
                  src={unitDetails?.tenant?.documents?.electricityBill}
                />
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Electricity Bill
                </p>
              </div>
            ) : null}

            {unitDetails?.tenant?.documents?.gasAccount ? (
              <div className={styles.oneCard}>
                <img
                  className={styles.image}
                  src={unitDetails?.tenant?.documents?.gasAccount}
                />
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Gas Account
                </p>
              </div>
            ) : null}

            <div className={styles.oneCard}>
              <div className={styles.addDocumentIconContainer}>
                <img src={AddDocument} />
              </div>

              <button
                className={styles.addDocumentButton}
                onClick={requestDocument}
              >
                Ask for Document
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Payment Detail */}
      {unitDetails?.unit?.tenantId !== undefined ? (
        <div className={styles.tableContainer}>
          <div className={styles.headingContainer}>
            <h2>Payment Details</h2>
            <div>
              <button className={styles.addDocumentButton}>
                Generate Ledger
              </button>
            </div>
          </div>

          {/* --------------------------Show all existing payment and edit that----------------------------------- */}
          <div className="table-container">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Rent/Payment</th>
                  <th>Charges</th>
                  <th>Amount Paid</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {allPayments?.map((payment) => (
                  <tr key={payment._id}>
                    {editPaymentId === payment._id ? (
                      <>
                        <td>
                          <input
                            style={{ width: "160px" }}
                            type="date"
                            name="date"
                            value={editPaymentData?.paymentDate?.split("T")[0]}
                            onChange={handleEditPaymentChange}
                          />
                        </td>
                        <td>
                          <select
                            className={styles.selectTag}
                            value={editPaymentData?.method}
                            onChange={handleEditPaymentChange}
                          >
                            <option value="cash">Cash</option>
                            <option value="upi">UPI</option>
                            <option value="cheque">Cheque</option>
                          </select>
                        </td>
                        <td>
                          <select
                            className={styles.selectTag}
                            value={editPaymentData?.paymentType}
                            onChange={handleEditPaymentChange}
                          >
                            <option value="rent">Rent</option>
                            <option value="payment">Payment</option>
                          </select>
                        </td>

                        <td>
                          <input
                            type="text"
                            name="charges"
                            value={editPaymentData?.charges}
                            onChange={handleEditPaymentChange}
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            name="amountPaid"
                            value={editPaymentData?.amountPaid}
                            onChange={handleEditPaymentChange}
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            name="balance"
                            value={editPaymentData?.balance}
                            readOnly
                          />
                        </td>
                        <td>
                          <button onClick={() => handleSaveClick(payment._id)}>
                            Save
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          {new Date(payment?.paymentDate).toLocaleDateString()}
                        </td>
                        <td>{payment.method}</td>
                        <td>{payment.paymentType}</td>
                        <td>{payment.charges}</td>
                        <td>{payment.amountPaid}</td>
                        <td>{payment.balance}</td>
                        <td>
                          <button onClick={() => handleEditClick(payment)}>
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------------------------------------------------------------------------------------------------- */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Add New Payment</h3>

            <table
              style={{
                width: "100%",
                borderRadius: "10px 10px 10px 10px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Rent/Payment</th>
                  <th>Charges</th>
                  <th>Amount Paid</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      {...register("paymentDate", {
                        required: "field required",
                      })}
                      className={styles.inputTextField}
                      type="date"
                    />
                  </td>

                  <td>
                    <select
                      className={styles.selectTag}
                      {...register("method", { required: "field required" })}
                    >
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="cheque">Cheque</option>
                    </select>
                  </td>

                  <td>
                    <select
                      className={styles.selectTag}
                      {...register("paymentType", {
                        required: "field required",
                      })}
                    >
                      <option value="rent">Rent</option>
                      <option value="payment">Payment</option>
                    </select>
                  </td>

                  <td>
                    <input
                      className={styles.inputTextField}
                      {...register("charges", { required: "field required" })}
                      type="number"
                      step="0.01"
                    />
                  </td>

                  <td>
                    <input
                      className={styles.inputTextField}
                      {...register("amountPaid", {
                        required: "field required",
                      })}
                      type="number"
                      step="0.01"
                    />
                  </td>

                  <td>
                    <input
                      className={styles.inputTextField}
                      {...register("balance")}
                      readOnly
                      type="number"
                      step="0.01"
                    />
                  </td>

                  <td>
                    <button type="submit">Add</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      ) : null}

      {unitDetails?.unit?.tenantId === undefined ? (
        <h1>Unit is Not Alloted Yet</h1>
      ) : null}
    </div>
  );
};

export default UnitDetail;
