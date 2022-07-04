import React, { useEffect, useState } from "react";
import { AUTH } from "../../utils/helpers/AuthCookies";
import jsCookie from "js-cookie";

function Theme() {
  const [darkMode, setDarkMode] = useState(false);
  const handleToggle = () => {
    setDarkMode(!darkMode);
    if (darkMode === true) {
      jsCookie.set("color-theme", "dark");
    } else {
      jsCookie.set("color-theme", "light");
    }
  };

  useEffect(() => {
    if (AUTH.getTheme() === "dark") {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (AUTH.getTheme() === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <button className="w-8 h-8 dark:bg-yellow-400 rounded-full" onClick={handleToggle}>
      {darkMode !== true ? <img src={require("../../assets/img/sun.png")} className="overflow-auto" alt="sun icon" /> : <img src={require("../../assets/img/moon.png")} alt="moon icon" />}
    </button>
  );
}

export default Theme;
