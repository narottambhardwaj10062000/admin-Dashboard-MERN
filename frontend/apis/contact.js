import axios from "axios";

const backendURL = "http://localhost:7000/contact";

// Get all Maintainence Requests API
export const getAllContactRequests = async () => {
    try {
        const reqUrl = `${backendURL}/all`;

        const response = await axios.get(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
        return error?.response;
    }
} 