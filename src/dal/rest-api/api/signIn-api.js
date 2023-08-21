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
        withCredentials: true,
      }
    );

    const result = response.data;
    return { status: response.status, data: result };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// export const loginUser = async (userJson) => {
//   try {
//     const response = await fetch("http://localhost:3100/api/auth/user", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userJson),
//     });

//     const result = await response.json();
//     console.log(result);

//     return { status: response.status, data: result };
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };
