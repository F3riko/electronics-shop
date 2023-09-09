import axios from "axios";

export const getProfileInfo = async () => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get("http://localhost:3100/auth/profile", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data[0];
  } catch (error) {
    throw error;
  }
};
