import axios from "axios";

export const resetPassMsg = async (userEmail) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_SERVER_URL}/auth/passResetToken/`,
      { userEmail },
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
