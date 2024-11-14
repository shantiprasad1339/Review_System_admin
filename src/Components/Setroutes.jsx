import React from 'react';
import ClientDetails from './AdminPages/ClientDetails';
import UserHistory from './AdminPages/UserHistory';
import ReviewPrices from './AdminPages/ReviewPrices';
import CustomUser from './AdminPages/CustomUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from "jquery";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../Components/Style.css'
import Addclientform from './AdminPages/Addclientform';
import Login from './AdminPages/Login';
function Setroutes() {
  return (
    <Router>
      <Routes>
        <Route path='/cleintdetails' element={<ClientDetails />} />
        <Route path='userhistory' element={<UserHistory />} />
        <Route path='addclients' element={<Addclientform />} />
        <Route path='/' element={<Login/>} />
        <Route path='/customuser' element={<CustomUser />} />
        <Route path='/reviewprices' element={<ReviewPrices />} />
      </Routes>
    </Router>
  );
}

export default Setroutes;
