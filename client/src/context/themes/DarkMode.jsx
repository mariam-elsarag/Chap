import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(Cookies.get("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.remove("light");
      Cookies.set("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      Cookies.set("theme", "light");
    }
  }, [theme]);
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <ThemeContext.Provider value={{ theme, handleThemeSwitch }}>
      {children}
    </ThemeContext.Provider>
  );
}
const useDarkMode = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("UseSearch use Outside SearchProvider");
  return context;
};
export { ThemeProvider, useDarkMode };
