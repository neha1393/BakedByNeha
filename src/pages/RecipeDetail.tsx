import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import type { Recipe } from "../types/recipe";

function RecipeDetail() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    // Fetch JSON from public folder
    const loadJson = async () => {
      try {
        const response = await fetch("/data/recipes.json");

        // Validate the response
        if (!response.ok) {
          throw new Error("Failed to load JSON file");
        }

        const result = await response.json();

        // Validate JSON structure if needed
        if (typeof result !== "object") {
          throw new Error("Invalid JSON structure");
        }

        setRecipes(result);
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    };

    loadJson();
  }, []);

  if (!recipes) {
    return <div>Loading JSON...</div>;
  }

  const recipe = name ? (recipes[name] as Recipe) : null;

  if (!recipe) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-pink-500">
          Recipe Not Found 🍰
        </h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 rounded-full bg-linear-to-r from-pink-500 to-rose-500 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-lg flex items-center gap-2"
        >
          <span>
            <FaLongArrowAltLeft />
          </span>{" "}
          <span>Back</span>
        </button>

        {/* MAIN CARD */}
        <div className="overflow-hidden rounded-4xl bg-white shadow-2xl shadow-pink-100">
          {/* IMAGE */}
          <div className="relative h-65 sm:h-95 md:h-125 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-5 right-5 sm:left-10 sm:right-10">
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                {recipe.name}
              </h1>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/20 backdrop-blur-lg px-4 py-2 text-sm font-semibold text-white border border-white/20">
                  🍽️ Serves {recipe.servings}
                </span>

                <span className="rounded-full bg-pink-500/90 px-4 py-2 text-sm font-semibold text-white">
                  ⭐ Bakery Favorite
                </span>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10 p-5 sm:p-8 md:p-12">
            {/* INGREDIENTS */}
            <div className="rounded-3xl bg-linear-to-br from-pink-50 to-rose-100 p-5 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-rose-600 mb-6">
                🧁 Ingredients
              </h2>

              <div className="space-y-4">
                {Object.entries(recipe.ingredients).map(([item, amount]) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-4 shadow-md"
                  >
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        className="md:w-6 md:h-6 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm sm:text-base font-semibold capitalize text-gray-700">
                        {item}
                      </span>
                    </div>

                    <span className="rounded-full bg-pink-100 px-3 py-2 text-xs sm:text-sm font-bold text-pink-600 whitespace-nowrap">
                      {amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div className="rounded-3xl bg-linear-to-br from-orange-50 to-pink-100 p-5 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-rose-600 mb-6">
                👩‍🍳 Instructions
              </h2>

              <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-lg">
                <ul className="space-y-3 text-sm sm:text-lg leading-8 text-gray-700">
                  {recipe.instructions.map((step: string, index: number) => (
                    <li key={index}>
                      {index + 1}. {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* TIPS */}
              <div className="mt-6 rounded-3xl bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 p-5 sm:p-6 text-white shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                  ✨ Baking Tips
                </h3>

                <ul className="space-y-3 text-sm sm:text-base text-white/95">
                  {recipe.tips.map((tip: string, index: number) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeDetail;
