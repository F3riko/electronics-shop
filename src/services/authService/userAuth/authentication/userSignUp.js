import axios from "axios";

export const submitUser = async (userJson) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_SERVER_URL}/auth/register`,
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
