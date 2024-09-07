import { useContext } from "react";
import { GlobalContext } from "../context/context";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { setSearched, token, setToken } = useContext(GlobalContext);

  function handleLogout() {
    sessionStorage.removeItem("token");
    setToken(null);
  }

  return (
    <header className="w-full pt-10">
      <nav className="box-content flex justify-between items-center gap-10 py-4 px-6 text-sm w-10/12 m-auto text-white rounded-md shadow-2 shadow-[inset_0px_0px_4px_4px_rgb(182,182,182,.4)] backdrop-blur-xl">
        <div className="flex">
          <p className="cursor-pointer" onClick={() => setSearched(false)}>
            Homepage
          </p>
        </div>
        <ul className="flex items-center gap-5">
          <li>
            {token ? (
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          <li className=" border-2 py-1 px-3 rounded-md text-nowrap ">
            <Link to="/signup">Create Account</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
