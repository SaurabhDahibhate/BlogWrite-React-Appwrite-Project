import React from "react";
import useTheme from "../contexts/theme";

export default function ThemeBtn() {
  const { themeMode, LightTheme, darkTheme } = useTheme();
  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      LightTheme();
    }
  };
  return (
    <label className="relative items-center sm:mt-1 sm:mr-4 xl:mt-1 xl:mr-6 2xl:mt-1 2xl:mr-4 lg:mt-1 lg:mr-4 mt-4 inline-flex  cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={themeMode === "dark"}
      />

      <div className="w-11 h-6 bg-blue-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
      <span className="ml-2 text-sm font-bold dark:text-gray-200">
        {themeMode.charAt(0).toUpperCase() + themeMode.slice(1)} Mode
      </span>
    </label>
  );
}
