import axios from "axios";

export const logOutUser = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};
