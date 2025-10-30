import { useEffect, useState } from "react";
import "./main.css";

const data = [
    {
      id: 1,
      img: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/633da2402567b910.jpeg?q=100",
      alt: "img1",
    },
    {
      id: 2,
      img: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/77ea732cb8deaa95.jpeg?q=00",
      alt: "img2",
    },
    {
      id: 3,
      img: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/45348602ad4b2259.jpg?q=90",
      alt: "img3",
    },
  ];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrev(){
    if(currentIndex<=0) return;
    setCurrentIndex(prev=> prev-1);

  }

  function handleNext(){
    if(currentIndex>= data.length) return;
    setCurrentIndex(prev=> prev+1);
  }

  useEffect(()=>{

    function autoSlide(){
      if(currentIndex===data.length-1)setCurrentIndex(0);
      setCurrentIndex(prev=> prev+1);
    }

    const timer = setTimeout(autoSlide, 2000);

    return () => clearTimeout(timer);

  }, [currentIndex]);
  
  return (
    <div>
      <div className="img-container ">
        <img className="carousel-image" src={data[currentIndex].img} alt={data[currentIndex].alt}  />
        <button className="btn btn-left" onClick={handlePrev} disabled={currentIndex===0}>{"<"}</button>
        <button className="btn btn-right" onClick={handleNext} disabled={currentIndex===data.length-1}>{">"}</button>
      </div>
    </div>
  );
}

export default Carousel;
