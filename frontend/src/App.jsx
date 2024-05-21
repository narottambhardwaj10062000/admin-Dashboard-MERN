import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home/Home'
import UnitList from './components/UnitList/UnitList';
import TenantRequestTable from "./components/TenantRequestTable/TenantRequestTable";
import Form  from './components/Form/Form';
import Requests from './components/Requests/Requests';




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/unitlist' element={<UnitList />} />
        <Route path='/applications' element={<TenantRequestTable />} />
        <Route path='/applicationdetail/:requestId' element={<Form />} />
        <Route path='/requests' element={<Requests />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
