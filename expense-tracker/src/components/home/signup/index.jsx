import { Card, Form, Button, Input } from "antd";
import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Homelayout from "../../../layout/Homelayout";
import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const { Item } = Form;

export default function Signup() {
  const [_formData, _setFormData] = useState(null);
  const [_otp, _setOtp] = useState("");
  const [_loading, _setLoading] = useState(false);
  const navigate = useNavigate();

  // STEP 1: SIGNUP → SEND OTP
  const onSignup = async (values) => {
    try {
      _setLoading(true);

      await axios.post("/api/user/signup", {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        mobile: values.mobile,
      });

      // Save email temporarily for OTP verification
      _setFormData({ email: values.email });
    } catch (error) {
      alert(error?.response?.data?.message || "Signup failed");
    } finally {
      _setLoading(false);
    }
  };

  // STEP 2: VERIFY OTP
  const onVerifyOtp = async () => {
    try {
      _setLoading(true);

      await axios.post("/api/user/verify-otp", {
        email: _formData.email,
        otp: _otp,
      });

      alert("Account verified successfully");
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message || "Invalid OTP");
    } finally {
      _setLoading(false);
    }
  };

  return (
    <Homelayout>
      <div className="flex">
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <img src="/Bg_img.png" alt="Bank" className="w-4/5 object-contain" />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-6 bg-white">
          <Card className="w-full max-w-sm shadow-xl">
            <h2 className="font-bold text-[#418cd3] text-2xl text-center mb-6">
              Register To Track Your Expense
            </h2>

            {/* OTP STEP */}
            {_formData ? (
              <>
                <Input
                  placeholder="Enter OTP"
                  value={_otp}
                  onChange={(e) => _setOtp(e.target.value)}
                  className="mb-4"
                />

                <Button
                  loading={_loading}
                  onClick={onVerifyOtp}
                  className="bg-[#418cd3]! text-white! w-full font-bold!"
                >
                  Verify OTP
                </Button>
              </>
            ) : (
              // SIGNUP FORM
              <Form layout="vertical" onFinish={onSignup}>
                <Item
                  name="fullname"
                  label="Full Name"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<UserOutlined />} />
                </Item>

                <Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<UserOutlined />} />
                </Item>

                <Item
                  name="mobile"
                  label="Mobile Number"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<MobileOutlined />} />
                </Item>

                <Item
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                >
                  <Input.Password prefix={<LockOutlined />} />
                </Item>

                <Item>
                  <Button
                    loading={_loading}
                    htmlType="submit"
                    className="bg-[#418cd3]! text-white! w-full font-bold!"
                  >
                    Sign Up
                  </Button>
                </Item>

                <Link
                  to="/"
                  className="text-[#418cd3]! font-bold!"
                >
                  Already have an account?
                </Link>
              </Form>
            )}
          </Card>
        </div>
      </div>
    </Homelayout>
  );
}
