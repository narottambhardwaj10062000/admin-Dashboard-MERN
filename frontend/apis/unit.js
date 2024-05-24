import axios from "axios";

const backendURL = "http://localhost:7000/unit";

// Get all Tenant applications API
export const getAllUnits = async () => {
    try {
        const reqUrl = `${backendURL}/all`;

        const response = await axios.get(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
        return error?.response;
    }
} 

//Get Unit Details
export const getUnitDetail = async (unitId) => {
    try {
        const reqUrl = `${backendURL}/${unitId}`;

        const response = await axios.get(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
        return error?.response;
    }
} 

// Get due amount for current month
export const getDueAmount = async (unitId) => {
    try {
        const reqUrl = `${backendURL}/due-amount/${unitId}`;

        const response = await axios.get(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
        return error?.response;
    }
} 