import axios from "axios";

export const getCalcCart = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_SERVER_URL}/cart/details`,
      {
        withCredentials: true,
      }
    );
    return response.data.info;
  } catch (error) {
    throw error;
  }
};
