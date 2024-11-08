import cookies from "js-cookie";

export let currentLanguageCode = cookies.get("i18next") || "ar";
