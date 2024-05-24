import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import IncomeProof from "../../assets/images/incomeProof.png";
import { useParams } from "react-router-dom";
import { getApplicationDetail } from "../../../apis/application";
import { approveRequest } from "../../../apis/application";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [applicationDetail, setApplicationDetail] = useState({});

  const handleApproveRequest = async () => {
    
    const response = await approveRequest(requestId);

    if (response?.status === 200) {
      navigate("/requests");

    }
  };

  const handleGetApplicationDetail = async () => {
    const response = await getApplicationDetail(requestId);

    if (response?.status === 200) {
      setApplicationDetail(response?.data?.applicationDetail);
    }
  };

  useEffect(() => {
    handleGetApplicationDetail();
  }, []);

  return (
    <div className={styles.formContainer}>
      {/* Personal Info */}
      <div className={styles.infoContainer}>
        <p className={styles.textHeading}>Personal Information</p>
        <div className={styles.infoContent}>
          <div className={styles.singleInfoContainer}>
            <p>
              First Name<span className={styles.star}>*</span>
            </p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.personalInformation?.firstName}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>
              Last Name<span className={styles.star}>*</span>
            </p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.personalInformation?.lastName}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>
              Home Telephone<span className={styles.star}>*</span>
            </p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.personalInformation?.homeTelephone}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Work Telephone</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.personalInformation?.workTelephone}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Cell Telephone</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.personalInformation?.cellTelephone}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Email Address</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.personalInformation?.email}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>SIN #</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.personalInformation?.SIN}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>
              Date At Birth<span className={styles.star}>*</span>
            </p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.personalInformation?.dob}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Marital Status</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.personalInformation?.maritalStatus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Info */}
      <div className={styles.infoContainer}>
        <p className={styles.textHeading}>Address Information</p>
        <div className={styles.singleUpperContainer}>
          <p>Street Address</p>
          <div className={styles.singleFullContainer}>
            <p>{applicationDetail?.addressInformation?.streetAddress}</p>
          </div>
        </div>

        <div className={styles.infoContent}>
          <div className={styles.singleInfoContainer}>
            <p>City</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.addressInformation?.city}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Province</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.addressInformation?.province}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Country</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.addressInformation?.country}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Postal Code</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.addressInformation?.postalCode}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Landlord</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.addressInformation?.landlord}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Landlord's Phone</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.addressInformation?.landlordsContact}</p>
            </div>
          </div>
        </div>

        <div className={styles.twoContentContainer}>
          <div className={styles.singleInfoContainer}>
            <p>How Long</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.addressInformation?.howLong} years</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Reason For Leaving</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.addressInformation?.reasonForLeaving}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Present Employer Information */}
      <div className={styles.infoContainer}>
        <p className={styles.textHeading}>Present Employer Information</p>

        <div className={styles.twoContentContainer}>
          <div className={styles.singleInfoContainer}>
            <p>Company Name</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.presentEmployerInfo?.companyName}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Company Address</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.presentEmployerInfo?.companyAddress}</p>
            </div>
          </div>
        </div>

        <div className={styles.infoContent}>
          <div className={styles.singleInfoContainer}>
            <p>Supervisor</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.presentEmployerInfo?.supervisor}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Company Phone</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.presentEmployerInfo?.companyPhone}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Yrs Employed</p>
            <div className={styles.singleContainer}>
              <p>
                {applicationDetail?.presentEmployerInfo?.yearsEmployed} Years
              </p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Approximate Salary</p>
            <div className={styles.singleContainer}>
              <p>${applicationDetail?.presentEmployerInfo?.approxSalary}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Position</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.presentEmployerInfo?.position}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Proposed Occupants */}
      <div className={styles.infoContainer}>
        <p className={styles.textHeading}>Other Proposed Occupants</p>

        {applicationDetail?.otherOccupants?.map((item, index) => {
          return (
            <div key={item._id}>
              <p className={styles.miniTextHeading}>Occupant {index + 1}</p>
              <div className={styles.infoContent}>
                <div className={styles.singleInfoContainer}>
                  <p>Name</p>
                  <div className={styles.singleContainer}>
                    <p>{item?.name}</p>
                  </div>
                </div>

                <div className={styles.singleInfoContainer}>
                  <p>Age</p>
                  <div className={styles.singleContainer}>
                    <p>{item?.age} Years</p>
                  </div>
                </div>

                <div className={styles.singleInfoContainer}>
                  <p>Relationship</p>
                  <div className={styles.singleContainer}>
                    <p>{item?.relationship}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Referred By */}
      <div className={styles.infoContainer}>
        <p className={styles.textHeading}>Referred By</p>
        <div className={styles.twoContentContainer}>
          <div className={styles.singleInfoContainer}>
            <p>Name</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.referredBy?.name}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Address</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.referredBy?.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pets Information */}
      <div className={styles.infoContainer}>
        <p className={styles.textHeading}>Pets Information</p>
        <div className={styles.infoContent}>
          <div className={styles.singleInfoContainer}>
            <p>Breed</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.petsInformation?.breed}</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Weight</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.petsInformation?.weight} kg</p>
            </div>
          </div>

          <div className={styles.singleInfoContainer}>
            <p>Sex</p>
            <div className={styles.singleContainer}>
              <p>{applicationDetail?.petsInformation?.sex}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Radio button container */}
      <div className={styles.infoContainer}>
        <div className={styles.radioContainer}>
          <p className={styles.questionText}>
            Have You Ever Had Eviction Papers Served To You, Been Evicted, Or
            Denied Lease Renewal?
          </p>

          <div className={styles.radioItem}>
            <div className={styles.oneRadioItem}>
              <input
                type="radio"
                name="firstQuestion"
                checked={applicationDetail?.wasEarlierEvicted}
              />
              <label>Yes</label>
            </div>

            <div className={styles.oneRadioItem}>
              <input
                type="radio"
                name="firstQuestion"
                checked={!applicationDetail?.wasEarlierEvicted}
              />
              <label>No</label>
            </div>
          </div>
        </div>

        <div className={styles.radioContainer}>
          <p className={styles.questionText}>
            Have You Ever Been Convicted Of A Crime?
          </p>
          <div className={styles.radioItem}>
            <div className={styles.oneRadioItem}>
              <input
                type="radio"
                name="secondQuestion"
                checked={applicationDetail?.hasCriminalRecord}
              />
              <label>Yes</label>
            </div>

            <div className={styles.oneRadioItem}>
              <input
                type="radio"
                name="secondQuestion"
                checked={!applicationDetail?.hasCriminalRecord}
              />
              <label>No</label>
            </div>
          </div>
        </div>
      </div>

      {/* checkbox container */}
      <div className={styles.infoContainer}>
        <p className={styles.questionText}>
          If You Were Referred To Rent With Us By A Current Mainstreet Tenant
          Please Provide Their Information
        </p>

        <p className={styles.checkboxText}>
          I warrant that the information supplied herein is true and correct. I
          am at least 18 years of age and my name is listed on this application
          as it appears on my government issued ID. I understand that false or
          intentional omission of requested information may result in automatic
          denial of this application.
        </p>

        <p className={styles.checkboxText}>
          I understand that all personal information collected from me may be
          collected, used and disclosed by Mainstreet Equity Corp for the
          purpose of my application assessment, for the purpose of debt
          collection, to uphold and maintain the rules and regulations of the
          property, to evaluate my tenancy, to comply with applicable law and in
          the ordinary course of Mainstreet Equity Corp's business, including
          but not limited to, any refinancing or potential sale of the property,
          and normal course dealing with providers of utilities and other like
          services. Any security deposit paid is to be considered as a rental
          deposit, forfeitable, in the event that the applicant does not take
          occupancy on the commencement date as agreed upon or fails to execute
          the standard lease agreement when present for execution.
        </p>

        <div className={styles.checkboxContainer}>
          <input
            className={styles.checkboxIcon}
            type="checkbox"
            name="checkInput"
            checked={true}
            readOnly
          />
          <label className={styles.checkboxText}>
            I Agree To The Terms Above.
          </label>
        </div>
      </div>

      {/* Proof Of Income */}
      <div className={styles.incomeInfoContainer}>
        <p className={styles.textHeading}>Proof Of Income</p>
        <img
          src={applicationDetail?.proofOfIncome}
          className={styles.incomeProofImage}
        />
      </div>

      {/* Button */}
      <button className={styles.btn} onClick={handleApproveRequest}>
        Approve Now
      </button>
    </div>
  );
};

export default Form;
