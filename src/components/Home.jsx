import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/context";
import home1 from "../images/home1.png";
import home2 from "../images/home2.png";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

export default function Home() {
  const { searchTerm, searched } = useContext(GlobalContext);
  const homeBg = [home1, home2];

  const [backgroundImage, setBackgroundImage] = useState(homeBg[0]);

  const getNextBackgroundImage = () => {
    const currentIndex = homeBg.indexOf(backgroundImage);
    const nextIndex = (currentIndex + 1) % homeBg.length;
    return homeBg[nextIndex];
  };

  // Pre Loading Start
  useEffect(() => {
    const preloadImage = (url) => {
      const img = new Image();
      img.src = url;
    };

    const preloadNextImage = () => {
      const nextImage = getNextBackgroundImage();
      preloadImage(nextImage);
    };

    const intervalId = setInterval(() => {
      preloadNextImage();
      const newImage = getNextBackgroundImage();
      setBackgroundImage(newImage);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [backgroundImage]);
  // Pre Loading End

  // Normal Loading Start
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     const newImage = getNextBackgroundImage();
  //     setBackgroundImage(newImage);
  //   }, 8000);

  //   return () => clearTimeout(timeoutId);
  // }, [backgroundImage, searchTerm]);
  // Normal Loading End

  return (
    <main
      className="bg-cover bg-center h-screen font-euclid"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />

      {!searched && (
        <section>
          <h1 className="text-3xl mt-20 text-white font-bold text-center m-auto md:text-4xl md:w-6/12 lg:text-5xl lg:w-/12">
            Discover over 2,000,000 free Stock Images
          </h1>
        </section>
      )}

      <SearchBar />

      {searched && (
        <section className="mt-5 text-center">
          <h2 className="text-xl text-white font-semibold md:text-2xl lg:text-3xl">
            Results: {searchTerm}
          </h2>
        </section>
      )}

      {!searched && (
        <section className=" text-white p-2 text-center rounded-md w-4/12 text-wrap mt-5 m-auto text-xs shadow-2 shadow-[inset_0px_0px_4px_4px_rgb(182,182,182,.4)] bg-[#D9D9D9] bg-opacity-5 md:w-fit md:text-nowrap md:px-4">
          <p>
            <span className="font-semibold">Trending: </span>
            flowers, love, forest, river
          </p>
        </section>
      )}

      {searched && <SearchResult />}
    </main>
  );
}
