import axios from "axios";

export const orderAuth = async (orderId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `http://localhost:3100/api/auth/userOrder?orderId=${orderId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const { userOk, orderOk } = response.data;
      return { userOk, orderOk };
    }
  } catch (error) {
    return { userOk: false, orderOk: false };
  }
};
