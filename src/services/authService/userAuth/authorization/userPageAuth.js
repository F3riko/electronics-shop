import axios from "axios";

export const authUser = async () => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}/user/info`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      throw new Error("Bad response");
    }
  } catch (error) {
    throw error;
  }
};
