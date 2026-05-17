import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [recipes, setRecipes] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading recipes... 🍰
      </h2>
    );

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1>🎀 BakesByNeha</h1>
      </div>

      {/* Subtitle */}
      <p
        style={{
          textAlign: "center",
          margin: "20px",
          fontSize: "1.1rem",
          color: "#c47a95",
        }}
      >
        Click on a recipe to see the full details! 🌸
      </p>

      {/* Recipe Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          padding: "24px 48px",
        }}
      >
        {Object.entries(recipes).map(([key, recipe]) => (
          <div
            key={key}
            onClick={() => navigate(`/recipe/${key}`)}
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(244, 143, 177, 0.3)",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "16px" }}>
              <h2 style={{ color: "#d47a9a", marginBottom: "8px" }}>
                {recipe.name}
              </h2>
              <p style={{ color: "#a0687a" }}>
                🍽️ Serves {recipe.servings} people
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
