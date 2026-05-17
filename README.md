# 🎀 BakesByNeha

A full-stack recipe web app built with **React** frontend and **Python FastAPI** backend. Browse beautiful baking recipes, click to view ingredients and instructions!

---

## ✨ Features

- 🌸 Beautiful pastel pink UI
- 🍰 5 handpicked baking recipes
- 📖 Click any recipe card to see full details
- 🔗 REST API backend with FastAPI
- 💾 SQLite database with SQLAlchemy ORM
- ⚛️ React with client-side routing (React Router)

---

## 🛠️ Tech Stack

| Layer    | Technology            |
| -------- | --------------------- |
| Frontend | React + Vite          |
| Backend  | Python + FastAPI      |
| Database | SQLite + SQLAlchemy   |
| Routing  | React Router DOM      |
| Styling  | CSS (inline + global) |

---

## 📁 Project Structure

```
BakesByNeha/
├── backend/
│   ├── main.py          # FastAPI routes
│   ├── database.py      # DB connection setup
│   ├── models.py        # Recipe table model
│   └── recipes.db       # SQLite database (auto-created)
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Home.jsx          # Recipe cards grid
│       │   └── RecipeDetail.jsx  # Single recipe page
│       ├── App.jsx        # Routes setup
│       ├── App.css        # Navbar styles
│       └── index.css      # Global styles
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/BakesByNeha.git
cd BakesByNeha
```

### 2. Start the Backend

```bash
cd backend
pip install fastapi uvicorn sqlalchemy
uvicorn main:app --reload
```

Backend runs at → **http://localhost:8000**

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → **http://localhost:5173**

---

## 🔗 API Endpoints

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | `/`               | Welcome message   |
| GET    | `/recipes`        | Get all 5 recipes |
| GET    | `/recipes/{name}` | Get one recipe    |

**Example:**

```
GET http://localhost:8000/recipes/chocolate_cake
```

---

## 🍰 Recipes Included

- Chocolate Cake
- Cookies
- Brownie
- Vanilla Cake
- Cheesecake

---

## 💡 React Concepts Used

| Concept       | Where Used                     |
| ------------- | ------------------------------ |
| `useState`    | Storing fetched recipe data    |
| `useEffect`   | Fetching API on page load      |
| `useParams`   | Reading recipe name from URL   |
| `useNavigate` | Navigating between pages       |
| React Router  | Home page ↔ Recipe detail page |
| Components    | `Home`,`RecipeDetail`          |
| Props         | Passing data into components   |

---

## 🗄️ Database

Uses **SQLite** via **SQLAlchemy ORM** . The database is automatically created and seeded with 5 recipes on first run — no manual setup needed!

---

## 👩‍💻 Author

Made with 🌸 by **Neha**
