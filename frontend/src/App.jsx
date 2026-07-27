import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shorten from "./pages/Shorten";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shorten" element={<Shorten />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;