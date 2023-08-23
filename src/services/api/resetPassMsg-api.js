import axios from "axios";

export const resetPassMsg = async (userEmail) => {
  try {
    const response = await axios.post(
      "http://localhost:3100/user/passReset/",
      { userEmail },
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
