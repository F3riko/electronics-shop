// Add name submission
// Add error handling

export const submitUser = async (userJson) => {
  try {
    const response = await fetch("http://localhost:3100/api/add/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userJson),
    });
    // Response handling
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};
