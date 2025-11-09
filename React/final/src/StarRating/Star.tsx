import { useState } from "react"

export default function Star(){
    const [indexNumber, setIndexNumber]= useState(0);
    const [rating, setRating] = useState(0);

    function handleEnter(index:number){
        setIndexNumber(index+1);
    }
    
    function handleClick(index:number){
        setRating(index+1);
    }

    function handleKeyDown(event: React.KeyboardEvent, index: number) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick(index);
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault();
            const nextElement = document.querySelector(`[data-star="${Math.min(index + 1, 4)}"]`) as HTMLElement;
            nextElement?.focus();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault();
            const prevElement = document.querySelector(`[data-star="${Math.max(index - 1, 0)}"]`) as HTMLElement;
            prevElement?.focus();
        }
    }
    
    return <div>
        <h1 id="star-rating-title">Star Rating</h1>
        <p id="current-rating" aria-live="polite">Current Rating: {rating} out of 5 stars</p>
        <div 
            role="radiogroup" 
            aria-labelledby="star-rating-title"
            aria-describedby="current-rating"
        >
            {[...Array(5)].map((_,index)=>(
                <span
                    key={index}
                    role="radio"
                    tabIndex={rating === index + 1 ? 0 : -1}
                    data-star={index}
                    aria-checked={rating === index + 1}
                    aria-setsize={5}
                    aria-posinset={index + 1}
                    aria-label={`${index + 1} star${index + 1 > 1 ? 's' : ''}`}
                    style={{
                        fontSize:"50px",
                        color: index < (indexNumber || rating) ? "gold" : "#ccc",
                        cursor: "pointer",
                        outline: "2px solid transparent",
                        borderRadius: "4px"
                    }}
                    onMouseEnter={()=>handleEnter(index)}
                    onMouseLeave={()=>setIndexNumber(0)}
                    onClick={()=>handleClick(index)}
                    onKeyDown={(e)=>handleKeyDown(e, index)}
                    onFocus={()=>handleEnter(index)}
                    onBlur={()=>setIndexNumber(0)}
                >★</span>
            ))}
            <button 
                onClick={()=>setRating(0)}
                aria-label="Reset star rating to zero"
                style={{
                    marginLeft: "20px",
                    padding: "8px 16px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Reset
            </button>
        </div>
    </div>
}