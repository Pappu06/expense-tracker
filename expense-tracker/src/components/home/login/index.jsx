import { Card, Form, Button, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// axios base url (same as signup)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const { Item } = Form;

export default function Login() {
  const [_loading, _setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔐 LOGIN HANDLER
  const onFinish = async (values) => {
    try {
      _setLoading(true);

      const { data } = await axios.post("/api/user/login", {
        email: values.email,
        password: values.password,
      });

      // ✅ Save logged-in user profile
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    } finally {
      _setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT IMAGE */}
      <div className="w-1/2 hidden md:flex items-center justify-center">
        <img
          src="/Bg_img.png"
          alt="Bank"
          className="w-4/5 object-contain"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-6 bg-white">
        <Card className="w-full max-w-sm shadow-xl">
          <h2 className="font-bold text-[#418cd3] text-2xl text-center mb-6">
            Track Your Expense
          </h2>

          <Form
            name="login-form"
            layout="vertical"
            onFinish={onFinish}   // IMPORTANT
          >
            <Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
              />
            </Item>

            <Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Item>

            <Item>
              <Button
                loading={_loading}
                htmlType="submit"
                className="bg-[#418cd3]! text-white! w-full font-bold!"
              >
                Login
              </Button>
            </Item>

            <div className="flex items-center justify-between">
              <Link
                style={{ textDecoration: "underline" }}
                to="#"
                className="text-[#418cd3]! font-bold!"
              >
                Forgot Password?
              </Link>

              <Link
                style={{ textDecoration: "underline" }}
                to="/signup"
                className="text-[#418cd3]! font-bold!"
              >
                Don't have an account?
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
