import React, { useEffect } from "react";
import { useAuth } from "../../contextProviders/AuthProvider";
import { useNavigate, Outlet } from "react-router-dom";
import { orderAuth } from "../../services/authService/orderPageAuth";
import { useParams } from "react-router-dom";

const OrderAuth = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { userOk, orderOk } = await orderAuth(orderId);
        console.log(userOk, orderOk);
        if (!userOk) {
          logout();
          navigate("/");
        } else if (!orderOk) {
          navigate("/");
          // Some message here - no access - you don't have this one on your acc
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkAuthentication();
  });

  return <Outlet />;
};

export default OrderAuth;
