import axios from "axios";

export const resetPassMsg = async (userEmail) => {
  try {
    const response = await axios.post(
      "http://localhost:3100/auth/passResetToken/",
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
