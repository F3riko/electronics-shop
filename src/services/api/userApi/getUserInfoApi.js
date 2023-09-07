import axios from "axios";

export const getProfileInfo = async () => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get("http://localhost:3100/auth/profile", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data[0];
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
