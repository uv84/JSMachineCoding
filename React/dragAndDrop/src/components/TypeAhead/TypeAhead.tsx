import React, { useEffect, useState } from "react";
import "./typeAhead.css";
type Product = {
  id: number;
  title: string;
  // add other properties if needed
};

function TypeAhead() {
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<Product[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
        setIsLoading(true);
      const data = await fetch(
        `https://dummyjson.com/products/search?q=${value}&limit=10`
      );
      const res = await data.json();
      setResult(res.products);
      setIsLoading(false);
    }
    fetchData();

    const timetId= setTimeout(fetchData, 1000);
    return () => {
      clearTimeout(timetId);
      
    };


  }, [value]);

  return (
    <div>
      <div>
        <input
          type="text"
          className="input-bar"
          onChange={(e) => setValue(e.target.value)}
        />
        <div>
          {isloading ? <div>Loading... </div> : result.map((value) => (
            <li key={value.id}>{value.title}</li>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TypeAhead;
