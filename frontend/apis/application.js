import axios from "axios";

const backendURL = "http://localhost:7000/application";

// Get all Tenant applications API
export const getAllApplications = async () => {
    try {
        const reqUrl = `${backendURL}/all`;

        const response = await axios.get(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
        // return error?.response;
    }
} 

//Get single application form details API
export const getApplicationDetail = async (requestId) => {
    try {
        const reqUrl = `${backendURL}/${requestId}`;
        // console.log(reqUrl);
        const response = await axios.get(reqUrl);
        return response;    
    } catch ( error ) {
        console.log(error);
        return error?.response;
    }
}

// Approve Application Request
export const approveRequest = async (applicationId) => {
    try {
        const reqUrl = `${backendURL}/approve/${applicationId}`;

        const response = await axios.post(reqUrl);
        return response;  
    } catch ( error ) {
        console.log(error);
        return error?.response;
    }
}