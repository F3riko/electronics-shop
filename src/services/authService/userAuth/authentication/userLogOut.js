import axios from "axios";

export const logOutUser = async () => {
  try {
    const response = await axios.get("http://localhost:3100/auth/logout", {
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
