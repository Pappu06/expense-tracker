import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");

  // if user exists → allow
  if (user) {
    return children;
  }

  // else → redirect to login
  return <Navigate to="/" replace />;
}
