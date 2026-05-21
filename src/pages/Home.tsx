// src/pages/Home.tsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import type { Recipe } from "../types/recipe";

function Home() {
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

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-300 blur-3xl opacity-30" />
        <div className="absolute top-32 right-0 h-80 w-80 rounded-full bg-orange-300 blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            <span className="bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
              Sweet Recipes
            </span>
            <br />
            <span className="text-gray-800">Made With Love 🍰</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover beautiful bakery recipes with dreamy flavors, soft textures
            and elegant desserts for every celebration.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.entries(recipes) as [string, Recipe][]).map(
            ([key, recipe]) => (
              <RecipeCard key={recipe.id} recipeKey={key} recipe={recipe} />
            ),
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
