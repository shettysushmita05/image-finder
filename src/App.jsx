import { Routes, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/context";

function App() {
  const { token, setToken } = useContext(GlobalContext);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <Routes>
      <Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
