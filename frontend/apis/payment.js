import axios from "axios";

const backendURL = "http://localhost:7000/payment";

export const createPayment = async (body) => {
  try {
    const reqUrl = `${backendURL}/create`;

    const reqPayload = body;
    const response = await axios.post(reqUrl, reqPayload);
    return response;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

export const getAllPayments = async (unitId) => {
  try {
    var reqUrl;

    if (unitId) {
      reqUrl = `${backendURL}/all/?unitId=${unitId}`;
      console.log(reqUrl);
    } else {
        reqUrl = `${backendURL}/all`;
    }

    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

// edit payment api
export const editPayment = async (unitId, paymentId, editPaymentData) => {
  try {

    const reqUrl = `${backendURL}/edit/${unitId}/payments/${paymentId}`;
    const reqPayload = editPaymentData;

    const response = await axios.put(reqUrl, reqPayload);
    return response;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};
