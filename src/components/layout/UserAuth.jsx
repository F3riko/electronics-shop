import React, { useEffect } from "react";
import { authUser } from "../../services/authService/userAuth/authorization/userPageAuth";
import { useAuth } from "../../contextProviders/AuthProvider";
import { useNavigate, Outlet } from "react-router-dom";

const UserAuth = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await authUser();
        if (!isAuthenticated) {
          logout();
          navigate("/");
        }
      } catch (error) {
        throw error;
      }
    };

    checkAuthentication();
  });

  return <Outlet />;
};

export default UserAuth;
