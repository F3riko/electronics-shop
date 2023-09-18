import axios from "axios";

export const resetPass = async (newUserPassowrd, resetToken) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_SERVER_URL}/auth/passReset/`,
      { newUserPassowrd, resetToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.status;
  } catch (error) {
    throw error;
  }
};
