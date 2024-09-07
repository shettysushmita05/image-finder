import { useContext } from "react";
import { CircleLoader } from "react-spinners";
import { GlobalContext } from "../context/context";
import Modal from "./modal/Modal";

export default function SearchResult() {
  const {
    dataSet,
    searchTerm,
    searched,
    loading,
    searchHistory,
    handleHistory,
    showModal,
    handleModal,
  } = useContext(GlobalContext);

  return loading ? (
    <CircleLoader
      color="white"
      loading={loading}
      size={100}
      className="m-auto mt-20"
    />
  ) : (
    <section className="mt-5 w-full">
      {searched && (
        <div className="bg-[#F5F5F5] overflow-hidden text-sm lg:text-lg md:text-base w-full p-5">
          {searchHistory && searchHistory.length > 0 && (
            <div className="flex gap-5 justify-center items-center">
              {searchHistory.map((historyItem, index) => (
                <div
                  key={index}
                  className="border w-fit py-2 px-5  text-[#767676] text-center cursor-pointer h-fit"
                  onClick={() => handleHistory(historyItem)}
                >
                  {historyItem}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div
        className={
          dataSet.length > 0
            ? "bg-white pt-8 w-full md:flex md:flex-wrap"
            : null
        }
      >
        {!loading && dataSet.length > 0
          ? dataSet.map((item) => {
              return (
                <div key={item.id} className=" md:w-1/2 lg:w-4/12">
                  <div className="px-4 py-2">
                    <img
                      src={item.largeImageURL}
                      alt={`${searchTerm} - ${item.id}`}
                      className="rounded-md md:h-[250px] md:w-[400px] m-auto cursor-pointer"
                      onClick={() => handleModal(item)}
                    />
                    <ul className="flex gap-5 justify-center">
                      {item.tags.split(",").map((tag, tagIndex) => (
                        <li
                          key={tagIndex}
                          className="bg-[#F5F5F5] text-[#767676] rounded-md h-fit p-1 px-3 mt-2 cursor-pointer text-center"
                          onClick={() => handleHistory(tag)}
                        >
                          {tag
                            .toLowerCase()
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })
          : searched && (
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold text-center mt-20 md:m-auto md:mt-20">
                No Image Found!
              </h1>
            )}
      </div>
      {showModal && <Modal />}
    </section>
  );
}
