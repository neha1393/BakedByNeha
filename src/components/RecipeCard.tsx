import { useNavigate } from "react-router-dom";
import { type Recipe } from "../types/recipe";
import { FaLongArrowAltRight } from "react-icons/fa";

interface Props {
  recipeKey: string;
  recipe: Recipe;
}

function RecipeCard({ recipeKey, recipe }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipe/${recipeKey}`)}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden rounded-[28px] bg-white shadow-lg shadow-pink-100 transition-all duration-500 active:scale-[0.98] hover:-translate-y-2 hover:shadow-2xl">
        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-56 sm:h-64 md:h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="rounded-full bg-white/90 backdrop-blur-lg px-3 py-2 text-xs sm:text-sm font-semibold text-pink-600 shadow">
              🍽️ {recipe.servings} Servings
            </span>

            <span className="rounded-full bg-pink-500/90 px-3 py-2 text-xs font-bold text-white shadow-lg">
              Popular
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 line-clamp-1">
            {recipe.name}
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-6 text-gray-500">
            Soft, delicious and bakery-style dessert perfect for celebrations
            and sweet cravings.
          </p>

          <button className="mt-5 w-full rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:opacity-90 flex items-center gap-2 justify-center">
            <span>View Recipe</span>
            <span>
              <FaLongArrowAltRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
