import { Navigate } from "react-router-dom";

const OwnerRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "owner") {
    return <Navigate to="/" />;
  }

  return children;
};

export default OwnerRoute;