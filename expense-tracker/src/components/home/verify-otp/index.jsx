import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("verifyEmail");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!otp) return alert("OTP is required");

    try {
      setLoading(true);

      await api.post("/user/verify-otp", {
        email,
        otp,
      });

      // cleanup
      localStorage.removeItem("verifyEmail");

      alert("Account verified successfully");
      navigate("/login");
    } catch (error) {
      alert(
        error?.response?.data?.message || "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">
          Verify OTP
        </h2>

        <input
          type="number"
          className="border p-2 w-full mb-4"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
