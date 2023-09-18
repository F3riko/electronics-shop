import axios from "axios";

export const getCart = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data.contents;
  } catch (error) {
    throw error;
  }
};
