import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:id" element={<Character />} />
      </Routes>
    </Router>
  );
}

export default App;
