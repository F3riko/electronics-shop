import axios from "axios";

export const logOutUser = async () => {
  try {
    const response = await axios.get("http://localhost:3100/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.status);
    return response.status;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
