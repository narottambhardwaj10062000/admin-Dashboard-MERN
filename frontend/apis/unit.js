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
        // return error?.response;
    }
} 