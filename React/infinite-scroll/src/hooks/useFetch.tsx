import { useEffect, useState } from "react"

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T = any>(url: string): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Skip if no URL provided
    if (!url) return;

    // Create AbortController for cleanup
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null); // Reset error state
        
        const res = await fetch(url, {
          signal: abortController.signal // Add abort signal
        });

        // Check if response is ok
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        
        // Only update state if component is still mounted
        if (!abortController.signal.aborted) {
          setData(result);
        }
      } catch (err) {
        // Only update error if not aborted (component unmounted)
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        // Only update loading if not aborted
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function - abort fetch if component unmounts or URL changes
    return () => {
      abortController.abort();
    };
  }, [url])

  return { data, loading, error }
}

export default useFetch