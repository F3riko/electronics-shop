import axios from "axios";

export const addItem = async (itemId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_SERVER_URL}/cart?id=${itemId}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data.contents;
  } catch (error) {
    throw error;
  }
};
