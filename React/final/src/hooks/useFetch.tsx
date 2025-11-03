import { useState, useEffect } from "react";

export default function useFetch(url: string) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("")

  useEffect(() => {
    async function fetchData(url: string) {
      try {
        setLoading(true);
        console.log("Fetching from URL:", url);
        const response = await fetch(url);
        const result = await response.json();
        console.log("Fetch result:", result);
        
        // Handle both direct products array and search response with products property
        if (result.products) {
          setData(result.products);
        } else {
          setData(result);
        }
      } catch (error) {
        console.error("Error has occurred:", error);
        // setError(error)
      } finally {
        setLoading(false);
      }
    }
    
    fetchData(url);
  }, [url]); // Add url to dependencies so it refetches when URL changes

  return { data, loading };
}
