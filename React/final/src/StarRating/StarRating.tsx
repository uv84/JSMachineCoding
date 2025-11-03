import { useState } from "react";

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  function handleRating(index: number) {
    setRating(index + 1);
  }

  function handleMouseEnter(index: number) {
    setHoverRating(index + 1);
  }

  function handleMouseLeave() {
    setHoverRating(0);
  }

  const getStarColor = (index: number) => {
    const currentRating = hoverRating || rating;
    return index < currentRating ? "#ffd700" : "#e0e0e0";
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Star Rating Component</h2>
      
      <div style={{ margin: "20px 0" }}>
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleRating(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{
              background: "none",
              border: "none",
              fontSize: "2rem",
              cursor: "pointer",
              color: getStarColor(index),
              padding: "5px",
              transition: "color 0.2s ease"
            }}
            aria-label={`Rate ${index + 1} star${index + 1 > 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <p style={{ fontSize: "18px", color: "#333" }}>
          {rating > 0 ? `You rated: ${rating} out of 5 stars` : "Click a star to rate"}
        </p>
        
        {hoverRating > 0 && rating !== hoverRating && (
          <p style={{ fontSize: "14px", color: "#888", fontStyle: "italic" }}>
            Hovering: {hoverRating} star{hoverRating > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <button
        onClick={() => setRating(0)}
        style={{
          marginTop: "15px",
          padding: "8px 16px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        Reset Rating
      </button>
    </div>
  );
}

export default StarRating;