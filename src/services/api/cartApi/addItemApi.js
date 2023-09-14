import axios from "axios";

export const addItem = async (itemId) => {
  try {
    const response = await axios.post(
      `http://localhost:3100/cart?id=${itemId}`,

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
