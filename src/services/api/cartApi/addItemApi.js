import axios from "axios";

export const addItem = async (itemId) => {
  try {
    const response = await axios.get(
      `http://localhost:3100/cart/add?id=${itemId}`,

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
