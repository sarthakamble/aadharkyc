
import React, { useState } from "react";
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import UserContext from './session';
import { Login_Page, Landing_Page, Search_Page } from './constants/routes';
import Login from '../src/views/LoginPage/Login';
import AadharAuthentication from '../src/components/AadharAuthentication/AadharAuthentication';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <UserContext.Provider value={{ value, setValue }}>
        <Router>
          <Routes>
            <Route path={Login_Page} element={<Login />} exact />
            <Route path={Landing_Page} element={<AadharAuthentication />}exact/>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
