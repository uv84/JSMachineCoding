import "./select.css";
import { useState } from "react";

function Select({ columns = 10 }) {
const totalCells = 100;
  const [selected, setSelected] = useState<number[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startIndex, setStartIndex] = useState<number | null>(null);

  const handleMouseDown = (i: number) => {
    setIsSelecting(true);
    setStartIndex(i);
    setSelected([i]);
  };

  const handleMouseOver = (i: number) => {
    if (isSelecting && startIndex !== null) {
      const min = Math.min(startIndex, i);
      const max = Math.max(startIndex, i);
      const range = [];
      for (let idx = min; idx <= max; idx++) {
        range.push(idx);
      }
      setSelected(range);
    }
  };
  const handleMouseUp = () => {
    setIsSelecting(false);
    setStartIndex(null);
  };

 return (
    <div className="select-component">
      <h1>Select Rendering</h1>
      <div
        className="container-box"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          width: `${columns * 50 + (columns - 1) * 5}px`, // 50px cell + 5px gap
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={}
      >
        {Array(totalCells)
          .fill("")
          .map((_, i) => (
            <div
              className={`box${selected.includes(i) ? " selected" : ""}`}
              key={i}
              onMouseDown={() => handleMouseDown(i)}
              onMouseOver={() => handleMouseOver(i)}
            >
              {i + 1}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Select;