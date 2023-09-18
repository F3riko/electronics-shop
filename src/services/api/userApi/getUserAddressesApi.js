import axios from "axios";

export const getUserAddresses = async (userId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_SERVER_URL}/auth/address?userId=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
