import React, { createContext, useContext, useState, useEffect } from "react";
import { getRequestsCount } from "../../apis/common";
import { getDueAmountCount } from "../../apis/common"; 

// Create a context
const StoreContext = createContext();

// Create a provider component
export const StoreProvider = ({ children }) => {
    
  const [headerTitle, setHeaderTitle] = useState(() => {
    return localStorage.getItem("headerTitle") || "Dashboard";
  });
  const [count, setCount] = useState({});
  const [unitDetails, setUnitDetails] = useState({});
  const [alerts, setAlerts] = useState([]); 

  const handleGetRequestsCount = async () => {
    const response = await getRequestsCount();

    if (response?.status === 200) {
      setCount(response?.data?.data);
    }
  };

  const handleGetDueAmountCount = async () => {
    const response = await getDueAmountCount();

    if(response?.status === 200) {
      setAlerts(response?.data)
    }
  }

  useEffect(() => {
    handleGetRequestsCount();
    handleGetDueAmountCount();
  }, []);

  useEffect(() => {
    localStorage.setItem("headerTitle", headerTitle);
  }, [headerTitle]);

  return (
    <StoreContext.Provider
      value={{
        headerTitle,
        setHeaderTitle,
        unitDetails,
        setUnitDetails,
        count,
        setCount,
        alerts, 
        setAlerts
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the store context
export const useStoreContext = () => {
  return useContext(StoreContext);
};
