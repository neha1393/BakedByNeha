// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import InventoryCalculator from "./pages/InventoryCalculator";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-rose-100 to-orange-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:name" element={<RecipeDetail />} />
        <Route path="/calculator" element={<InventoryCalculator />} />
      </Routes>
    </div>
  );
}

export default App;
