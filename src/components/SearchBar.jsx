import { useContext } from "react";
import searchIcon from "../icons/search.svg";
import { GlobalContext } from "../context/context";
import { useForm } from "react-hook-form";

export default function SearchBar() {
  const { fetchImages, searched, setSearched, saveHistory } =
    useContext(GlobalContext);

  const { register, handleSubmit, reset } = useForm();

  function handleSearch(data) {
    const searchFormat = data.search
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    saveHistory(searchFormat);
    setSearched(true);
    fetchImages(searchFormat);
    reset({
      search: "",
    });
  }

  return (
    <section className="mt-20 m-auto w-8/12 lg:w-7/12 text-white ">
      <form
        noValidate
        onSubmit={handleSubmit((data, e) => {
          e.preventDefault();
          handleSearch(data);
        })}
        className="relative group flex justify-center bg-[#D9D9D9] bg-opacity-5 backdrop-blur-xl items-center "
      >
        <input
          type="text"
          placeholder={searched ? "Start new Search" : "Search"}
          className="placeholder-white placeholder:text-sm pl-16 bg-transparent shadow-2 shadow-[inset_0px_0px_4px_4px_rgb(182,182,182,.4)] w-full rounded-md py-4 px-6"
          {...register("search", {
            required: "Search Term is required",
          })}
          required
        />
        <img
          src={searchIcon}
          alt=""
          className="left-4 pr-3 py-1 border-r-2 absolute"
        />
        <button
          type="submit"
          className="absolute border-2 px-2 rounded-md right-5"
        >
          GO!
        </button>
      </form>
    </section>
  );
}
