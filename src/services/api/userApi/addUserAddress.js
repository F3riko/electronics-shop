import axios from "axios";

export const addUserAddress = async (userId, addressData) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_SERVER_URL}/auth/address`,
      { userId, address: addressData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.status;
  } catch (error) {
    throw error;
  }
};
