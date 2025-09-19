import { useEffect, useState, useRef } from "react";
import data from "../../data/data.json";
import "./carousel.css";
const DATA_LENGTH = data.length;

function Carousel() {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  console.log(ref);
  //   console.log(index + " on render");
  const handleNext = () => {
    // console.log(index + "inside cb");
    setIndex((prevIndex) => {
      //   console.log(prevIndex + " updated");
      if (prevIndex == DATA_LENGTH - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
    // if (index == DATA_LENGTH - 1) {
    //   setIndex(0);
    // } else {
    //   setIndex(index + 1);
    // }
  };

  const handlePrev = () => {
    if (index == 0) {
      setIndex(DATA_LENGTH - 1);
    } else {
      setIndex(index - 1);
    }
  };
  useEffect(() => {
    ref.current = setInterval(handleNext, 3000);
    return () => {
      clearInterval(ref.current);
    };
  }, []);

  return (
    <div>
      <div
        onMouseEnter={() => clearInterval(ref.current)}
        onMouseLeave={() => {
          ref.current = setInterval(handleNext, 1000);
        }}
        className="container1"
      >
        <div className="backbtn" onClick={handlePrev}>
          {"<"}
        </div>
        <img src={data[index].download_url} alt="cc" className="imgc" />
        <div className="frontbtn" onClick={handleNext}>
          {">"}
        </div>
      </div>
    </div>
  );
}
export default Carousel;
