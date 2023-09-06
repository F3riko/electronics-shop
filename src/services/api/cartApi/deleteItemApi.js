import axios from "axios";

export const delItem = async (itemId) => {
  try {
    const response = await axios.get(
      `http://localhost:3100/api/cart/delete?id=${itemId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.contents;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
