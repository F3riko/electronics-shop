import axios from "axios";

export const delItem = async (itemId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_SERVER_URL}/cart?id=${itemId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.contents;
  } catch (error) {
    throw error;
  }
};
