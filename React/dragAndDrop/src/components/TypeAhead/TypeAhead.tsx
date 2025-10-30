import React, { useEffect, useState } from "react";
import "./typeAhead.css";
type Product = {
  id: number;
  title: string;
};

function TypeAhead() {
  const [value, setValue] = useState<string>("");
  const [isInput, setInput] = useState(false);
  const [result, setResult] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(true);
    setValue(e.target.value);
  }

  useEffect(() => {
    if (isInput) {
      const fetchData = async () => {
        setIsLoading(true);
        const data = await fetch(
          `https://dummyjson.com/products/search?q=${value}&limit=10`
        );
        const res = await data.json();
        setResult(res.products);
        setIsLoading(false);
        setInput(false);
      };

      const timerId = setTimeout(fetchData, 1000);
      return () => clearTimeout(timerId);
    }
  }, [isInput, value]);

  // Optionally clear results if input is empty
  useEffect(() => {
    if (value === "") setResult([]);
  }, [value]);

  return (
    <div>
      <div>
        <input
          type="text"
          className="input-bar"
          onChange={handleValue}
          value={value}
          aria-label="Search products"
        />
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {result.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TypeAhead;