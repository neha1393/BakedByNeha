import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecipeDetail from "./components/RecipeDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:name" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
