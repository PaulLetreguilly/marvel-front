import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Favorite from "./pages/Favorite";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faStar, faHeart);

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              library={library}
              faStar={faStar}
              faHeart={faHeart}
              token={token}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              token={token}
              library={library}
              faStar={faStar}
              faHeart={faHeart}
            />
          }
        />
        <Route path="/comics/:id" element={<Character />} />
        <Route path="/favorite" element={<Favorite token={token} />} />
        <Route
          path="/login"
          element={<LogIn token={token} setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={<SignUp token={token} setUser={setUser} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
