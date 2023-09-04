import axios from "axios";

export const addItem = async (itemId) => {
  try {
    const response = await axios.get(
      `http://localhost:3100/api/cart/add?id=${itemId}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data.contents;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
