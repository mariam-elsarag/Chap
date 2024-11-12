export const apiKey = import.meta.env.VITE_REACT_APP_BASE_URL;

export function truncateText(text, length, more) {
  if (text.length <= length) {
    return text;
  }

  return `${text.substring(0, length)} ...`;
}
// formate hour
export const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let formattedHours = hours % 12 || 12;
  const amPm =
    hours >= 12
      ? `${currentLanguageCode === "en" ? "PM" : "م"}`
      : `${currentLanguageCode === "en" ? "AM" : "ص"}`;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${amPm}`;
};
export const autoExpandTextarea = (textarea, max_height = "100") => {
  const maxHeight = (parseInt(max_height, 10) * window.innerHeight) / 100;

  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";

  return textarea.style.height;
};
