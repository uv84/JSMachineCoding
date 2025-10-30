import { useState, useEffect } from "react";
import "./uberSelect.css";
const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

function UberSelect() {
  const BoxData = BOX_DATA.flat();
  const MAX_STACK_SIZE = BoxData.length-2;
  const [stack, setStack] = useState<number[]>([]);

 function handleSelect(i: number) {
  setStack(prev => {
    if (prev.includes(i)) {
      return prev.filter(idx => idx !== i);
    }
    if (prev.length >= MAX_STACK_SIZE) {
      // Do not add new item if stack is full
      return prev;
    }
    return [...prev, i];
  });
}

  // Auto-pop oldest if stack is full, after 1 second
useEffect(() => {
  if (stack.length === MAX_STACK_SIZE) {
    while (stack.length >= 0) {
      const timer = setTimeout(() => {
        setStack(prev => prev.slice(1));
      }, 1000);
    }
    return () => { clearTimeout(timer);
  }
}, [stack, MAX_STACK_SIZE]); 

  return (
    <div>
      <div>
        <h1>Uber Select</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "5px",
            width: "120px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {BoxData.map((value, i) => (
            <div
              key={i}
              style={{
                opacity: value === 0 ? "0" : "1",
                pointerEvents: value === 0 ? "none" : "auto",
                height: "30px",
                width: "30px",
                backgroundColor: stack.includes(i) ? "green" : "lightyellow",
                border: "1px solid #999",
                boxSizing: "border-box",
              }}
              onClick={() => handleSelect(i)}
            ></div>
          ))}
        </div>
        <div>
          <strong>Stack:</strong> [{stack.join(", ")}]
        </div>
      </div>
    </div>
  );
}

export default UberSelect;
