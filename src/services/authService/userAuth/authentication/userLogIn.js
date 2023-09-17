// Add name submission
// Add error handling

import axios from "axios";

export const loginUser = async (userJson) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(
      "http://localhost:3100/auth/login",
      JSON.stringify(userJson),
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
