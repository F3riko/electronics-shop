export default function formatDate(inputDateString) {
  const date = new Date(inputDateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

export function calculateDaysTillNow(givenDateStr) {
  const givenDate = new Date(givenDateStr);
  const currentDate = new Date();
  const timeDifferenceMs = currentDate - givenDate;
  const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
  return daysDifference;
}
