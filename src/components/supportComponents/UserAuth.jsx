import React, { useEffect } from "react";
import { authUser } from "../../services/api/userAuth-api";
import { useAuth } from "./AuthProvider";
import { useNavigate, Outlet } from "react-router-dom";

const UserAuth = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await authUser();
        console.log(isAuthenticated);
        if (!isAuthenticated) {
          logout();
          navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkAuthentication();
  }, []);

  return <Outlet />;
};

export default UserAuth;
