import axios from "axios";

export const getProfileInfo = async () => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/auth/profile`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data[0];
  } catch (error) {
    throw error;
  }
};
