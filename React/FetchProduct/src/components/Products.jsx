import { useEffect, useState } from "react";
import "./product.css";
import SearchBar from "./SearchBar";
export default function Products() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchPro, setSearchPro] = useState("")

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const totalPages =Math.ceil(data.length / itemsPerPage);
  function goToSpecificPage(idx){
    setCurrentPage(idx);

  }


  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${searchPro}`)
      .then((res) => res.json())
      .then((data) => setData(data.products))
      .catch((err) => console.error("Fetch error:", err));

      console.log(data);
  }, [searchPro]);

  return (
    <div>
      <div>
        <div>
          <h1 className="heading">Products section</h1>
        </div>
        <SearchBar value={searchPro} setValue={setSearchPro}/>
        <div >
          <div className="continer-products">
            {currentItems.map((item) => (
              <div className="product-container">
              <img className="product-img" src={item.thumbnail} alt={item.title} />
              <div>{item.title}</div>
              </div>

            ))}
          </div>

          <div className="num-page">
            <button 
            disabled={currentPage === 1}
            className="" onClick={()=>setCurrentPage(prev=> prev-1)}>Prev</button>
            {
                    Array.from({ length: totalPages },
                        (_, i) => (
                            <button key={i}
                                onClick={
                                    () => goToSpecificPage(i + 1)
                                }>
                                {i + 1}
                            </button>
                        ))
                }
            <button 
            disabled={currentPage === totalPages}
            className="" onClick={()=>setCurrentPage(prev=> prev+1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

