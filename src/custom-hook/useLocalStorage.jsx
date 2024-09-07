import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(localStorage.getItem(key)) || defaultValue;
    } catch (error) {
      console.error("Error parsing stored value:", error);
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error storing value in local storage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
