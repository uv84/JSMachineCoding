import { useEffect, useState } from "react";

export default function useFetch(url: string) {
    const [data, setData]= useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        async function fetchUrl(url:string){
            try {
                setLoading(true);
                setError(null); // Clear any previous errors
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.log("Error occured: ",error)
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            }
            finally{
                setLoading(false)
            }
        }
        fetchUrl(url);
    }, [url])

    return {data, loading, error};
}