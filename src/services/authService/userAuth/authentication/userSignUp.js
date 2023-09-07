// Add name submission
// Add error handling
// Do I need cookies here?

import axios from "axios";

export const submitUser = async (userJson) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      "http://localhost:3100/auth/register",
      JSON.stringify(userJson),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = response.data;
    return { status: response.status, data: result };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
