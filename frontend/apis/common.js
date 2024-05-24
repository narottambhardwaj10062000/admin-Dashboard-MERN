import axios from "axios";

const backendURL = "http://localhost:7000";

// Get maintainence and contact requests count
export const getRequestsCount = async () => {
    try {
        const reqUrl = `${backendURL}/api/count-requests`;
        
        const response = await axios.get(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
        return error?.response;
    }
} 

export const handleDocumentRequest = async (tenantId) => {
    try {
        const response = await axios.post(`${backendURL}/request/documents/${tenantId}`);
        alert(response.data.message);
    } catch (error) {
        console.error('Error requesting documents:', error);
        alert('Failed to send document request email');
    }
};

export const handlePaymentRequest = async (unitId) => {
    try {
        const response = await axios.post(`${backendURL}/request/alert/${unitId}`);
        alert(response.data.message);
    } catch (error) {
        console.error('Error requesting documents:', error);
        alert('Failed to send document request email');
    }
};

// get all due dates
export const getDueAmountCount = async () => {
    try {
        const reqUrl = `${backendURL}/api/due-amount`;
        
        const response = await axios.get(reqUrl);
        return response;
    } catch (error) {
        console.log(error);
        return error?.response;
    }
} 
