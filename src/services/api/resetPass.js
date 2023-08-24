import axios from "axios";

export const resetPass = async (newUserPassowrd, resetToken) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(
      "http://localhost:3100/user/passReset/",
      { newUserPassowrd, resetToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      
    return { status: response.status };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};