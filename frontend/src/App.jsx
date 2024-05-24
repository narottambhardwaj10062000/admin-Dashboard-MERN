import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import UnitList from "./components/UnitList/UnitList";
import TenantRequestTable from "./components/TenantRequestTable/TenantRequestTable";
import Form from "./components/Form/Form";
import Requests from "./components/Requests/Requests";
import Dashboard from "./components/Dashboard/Dashboard";
import Payments from "./components/Payments/Payments";
import UnitDetail from "./components/UnitDetail/UnitDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/unitlist" element={<UnitList />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/applicationdetail/:requestId" element={<Form />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/unitdetail/:unitId" element={<UnitDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
