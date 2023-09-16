import axios from "axios";

export const processOrderPayment = async (
  userId,
  orderId,
  paymentId,
  addressId,
  deliveryMethod
) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      "http://localhost:3100/order/payment",
      { userId, orderId, paymentId, addressId, deliveryMethod },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.orderId;
  } catch (error) {
    throw error;
  }
};
