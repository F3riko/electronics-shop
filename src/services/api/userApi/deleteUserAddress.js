import axios from "axios";

export const deleteUserAddress = async (userId, addressId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_SERVER_URL}/auth/address?userId=${userId}&addressId=${addressId}`,
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
