import axios from "axios";

export const authUser = async () => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get("http://localhost:3100/user/info", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
