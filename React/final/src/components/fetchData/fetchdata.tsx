import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

interface Product {
  id: number;
  title: string;
}

interface ApiResponse {
  products?: Product[];
}

const baseUrl = "https://dummyjson.com/products";

function FetchData() {
  const [inputValue, setInputValue] = useState(""); // controlled input
  const [url, setUrl] = useState(baseUrl); // triggers fetch

  const { data, loading } = useFetch(url);

  useEffect(() => {
    console.log("useEffect running with inputValue:", inputValue);

    if (inputValue.trim() === "") {
      console.log("Input is empty, setting base URL");
      setUrl(baseUrl);
      return;
    }

    const searchUrl = `${baseUrl}/search?q=${inputValue}`;
    console.log("Setting search URL:", searchUrl);
    setUrl(searchUrl);
  }, [inputValue]);

  // Handle both search results (with products array) and direct product list
  const products = (data as ApiResponse)?.products || (data as Product[]) || [];

  return (
    <>
      <label htmlFor="inputId">Search</label>
      <input
        id="inputId"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search products..."
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map((item: Product) => <p key={item.id}>{item.title}</p>)
      )}
    </>
  );
}

export default FetchData;


