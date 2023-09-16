import React, { useEffect } from "react";
import { useAuth } from "../../contextProviders/AuthProvider";
import { useNavigate, Outlet } from "react-router-dom";
import { orderAuth } from "../../services/authService/orderPageAuth";
import { useParams } from "react-router-dom";

const OrderAuth = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (!orderId) {
          throw new Error("Order ID is missing");
        }
        await orderAuth(orderId);
      } catch (error) {
        if (
          error.response.data.error === "Unauthorized: Token missing" &&
          user
        ) {
          logout();
          navigate("/");
        } else {
          navigate("/");
        }
      }
    };

    checkAuthentication();
  });

  return <Outlet />;
};

export default OrderAuth;
