import { Layout, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Footer, Content } = Layout;

export default function Homelayout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔽 DROPDOWN MENU ITEMS
  const items = [
    {
      key: "profile",
      label: (
        <span className="font-medium">
          {user?.fullname}
        </span>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen">

      {/* 🔵 STICKY HEADER */}
      <Header
        className="bg-[#418cd3]! flex justify-between items-center px-6 shadow-md"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* APP TITLE */}
        <h1 className="text-white text-xl md:text-2xl font-bold tracking-wide">
          Expense Tracker
        </h1>

        {/* USER DROPDOWN */}
        {user && (
          <Dropdown menu={{ items }} placement="bottomRight">
            <div className="flex items-center gap-2 cursor-pointer text-white">
              <UserOutlined />
              <span className="font-medium hidden sm:block">
                {user.fullname}
              </span>
            </div>
          </Dropdown>
        )}
      </Header>

      {/* CONTENT */}
      <Content className="bg-white p-4 md:p-6">
        {children}
      </Content>

      {/* FOOTER */}
      <Footer className="bg-[#418cd3]! text-center text-white py-6">
        <p className="font-semibold">
          © {new Date().getFullYear()} Expense Tracker
        </p>
        <p className="text-sm opacity-90">
          Built with React, Node.js & MongoDB
        </p>
      </Footer>
    </Layout>
  );
}
