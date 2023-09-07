import axios from "axios";
import { Buffer } from "buffer";

export const getProductImg = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3100/products/img?id=${id}`,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const imageBuffer = response.data;
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      const dataUrl = `data:image/jpeg;base64,${base64Image}`;
      return dataUrl;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
