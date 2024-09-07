import { createContext, useState } from "react";
import useLocalStorage from "../custom-hook/useLocalStorage";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSet, setDataSet] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [token, setToken] = useState(null);

  const [searchHistory, setSearchHistory] = useLocalStorage(
    "searchHistory",
    []
  );

  const api = import.meta.env.VITE_PIXABAY_API;

  async function fetchImages(searchVal) {
    setSearchTerm(searchVal);
    try {
      setLoading(true);
      const response = await fetch(
        `https://pixabay.com/api/?key=${api}&q=${searchVal}`
      );
      const data = await response.json();
      setDataSet(data.hits);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function saveHistory(searchItem) {
    const updatedHistory = [searchItem, ...searchHistory].slice(0, 10);
    setSearchHistory(updatedHistory);
  }

  // onclick history
  function handleHistory(search) {
    const strFormat = search
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setSearchTerm(strFormat);
    saveHistory(strFormat);
    fetchImages(strFormat);
  }

  function handleModal(imageData) {
    setShowModal(true);
    setSelectedImage(imageData);
  }

  return (
    <GlobalContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        fetchImages,
        dataSet,
        searched,
        setSearched,
        loading,
        searchHistory,
        setSearchHistory,
        handleHistory,
        saveHistory,
        showModal,
        setShowModal,
        handleModal,
        selectedImage,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
