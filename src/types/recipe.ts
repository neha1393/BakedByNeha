// src/types/recipe.ts
export interface Recipe {
  id: number;
  name: string;
  servings: number;
  image: string;
  ingredients: {
    [key: string]: string;
  };
  instructions: string[];
  tips: string[];
}

export interface RecipesData {
  [key: string]: Recipe;
}
