import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserLogout from "./pages/UserLogout.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import UserProtectWrapper  from "./pages/protectUser.jsx";
import CaptainHomePage from "./pages/CaptainHomePage.jsx";

import UserHomePage from "./pages/UserHomePage.jsx";
import Userriding from "./pages/Userriding.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/user/home" element={<UserHomePage/>} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/riding" element={ <Userriding /> } />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route path="/captain/home" element={<CaptainHomePage />} />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />{" "}
            </UserProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
