import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/home/login";
import Signup from "./components/home/signup";
import VerifyOtp from "./components/home/verify-otp";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./components/home";

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN (ROOT) */}
        <Route path="/" element={<Homepage/>} />

        {/* SIGNUP */}
        <Route path="/signup" element={<Signup />} />

        {/* OTP VERIFICATION */}
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* DASHBOARD (PROTECTED) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
