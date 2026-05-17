from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ This allows React (running on port 5173) to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

recipes = {
    "chocolate_cake": {
        "id": 1,
        "name": "Chocolate Cake",
        "servings": 8,
        "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
        "ingredients": {
            "flour": "2 cups",
            "sugar": "1.5 cups",
            "cocoa powder": "0.5 cups",
            "butter": "0.5 cups",
            "eggs": "3",
            "milk": "1 cup",
            "baking powder": "1.5 tsp"
        },
        "instructions": "Mix dry ingredients. Add butter, eggs and milk. Pour into pan. Bake at 180°C for 30 mins."
    },
    "cookies": {
        "id": 2,
        "name": "Cookies",
        "servings": 24,
        "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500",
        "ingredients": {
            "flour": "2.25 cups",
            "sugar": "0.75 cups",
            "butter": "1 cup",
            "eggs": "2",
            "chocolate chips": "2 cups",
            "vanilla extract": "1 tsp",
            "baking soda": "1 tsp"
        },
        "instructions": "Cream butter and sugar. Add eggs and vanilla. Mix in flour and chocolate chips. Bake at 190°C for 10 mins."
    },
    "brownie": {
        "id": 3,
        "name": "Brownie",
        "servings": 16,
        "image": "https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=500",
        "ingredients": {
            "butter": "0.5 cups",
            "sugar": "1 cup",
            "cocoa powder": "0.33 cups",
            "eggs": "2",
            "flour": "0.5 cups",
            "vanilla extract": "1 tsp",
            "salt": "0.25 tsp"
        },
        "instructions": "Melt butter, mix in sugar and cocoa. Add eggs and vanilla. Fold in flour. Bake at 175°C for 25 mins."
    },
    "vanilla_cake": {
        "id": 4,
        "name": "Vanilla Cake",
        "servings": 10,
        "image": "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500",
        "ingredients": {
            "flour": "2.5 cups",
            "sugar": "1.5 cups",
            "butter": "0.75 cups",
            "eggs": "4",
            "milk": "1 cup",
            "vanilla extract": "2 tsp",
            "baking powder": "2.5 tsp"
        },
        "instructions": "Beat butter and sugar. Add eggs and vanilla. Alternate adding flour and milk. Bake at 180°C for 35 mins."
    },
    "cheesecake": {
        "id": 5,
        "name": "Cheesecake",
        "servings": 12,
        "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500",
        "ingredients": {
            "cream cheese": "500g",
            "sugar": "0.75 cups",
            "eggs": "3",
            "vanilla extract": "1 tsp",
            "graham crackers": "1.5 cups",
            "butter": "0.25 cups",
            "sour cream": "0.5 cups"
        },
        "instructions": "Make crust with crackers and butter. Beat cream cheese, sugar, eggs. Pour over crust. Bake at 160°C for 55 mins."
    }
}

@app.get("/")
def home():
    return {"message": "Welcome to BakesByNeha API 🧁"}

@app.get("/recipes")
def get_all_recipes():
    return recipes

@app.get("/recipes/{recipe_name}")
def get_recipe(recipe_name: str):
    if recipe_name in recipes:
        return recipes[recipe_name]
    return {"error": f"Recipe '{recipe_name}' not found!"}
