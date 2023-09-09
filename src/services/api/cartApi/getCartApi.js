import axios from "axios";

export const getCart = async () => {
  try {
    const response = await axios.get("http://localhost:3100/cart", {
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
