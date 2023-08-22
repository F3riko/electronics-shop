// Add name submission
// Add error handling

import axios from "axios";

export const loginUser = async (userJson) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(
      "http://localhost:3100/api/auth/user",
      JSON.stringify(userJson),
      {
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      }
    );

    const result = response.data;
    return { status: response.status, data: result };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};