export const apiKey = import.meta.env.VITE_REACT_APP_BASE_URL;

export function truncateText(text, length, more) {
  if (text.length <= length) {
    return text;
  }

  return `${text.substring(0, length)} ...`;
}
// formate hour
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
};
export const autoExpandTextarea = (textarea, max_height = "100") => {
  const maxHeight = (parseInt(max_height, 10) * window.innerHeight) / 100;

  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";

  return textarea.style.height;
};
