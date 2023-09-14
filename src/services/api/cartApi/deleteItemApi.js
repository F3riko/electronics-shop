import axios from "axios";

export const delItem = async (itemId) => {
  try {
    console.log("hi");
    const response = await axios.delete(
      `http://localhost:3100/cart?id=${itemId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.contents;
  } catch (error) {
    throw error;
  }
};
