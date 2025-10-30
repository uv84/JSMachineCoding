// import React, { useState } from "react";

// function Pooling() {
//   const [message, setMessage] = useState("");

//   const handleAsyncClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     // Store the value we need before the async operation
//     const buttonText = event.currentTarget.innerText;

//     setTimeout(() => {
//       // Use the stored value instead of accessing event directly
//       setMessage(
//         `Button clicked! Target value: ${buttonText}`
//       );
//     }, 100);
//   };

//   const handleSyncClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setMessage(
//       `Button clicked synchronously! Target value: ${event.currentTarget.innerText}`
//     );
//   };

//   return (
//     <div>
//       <h1>React Event Pooling Example</h1>
//       <button onClick={handleAsyncClick}>Click Me (Async)</button>
//       <button onClick={handleSyncClick}>Click Me (Sync)</button>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default Pooling;

function Pooling() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // To access the actual clicked element (span or strong)
    const clickedElement = event.target as HTMLElement;
    console.log('Clicked element:', clickedElement.tagName);      // "SPAN" or "STRONG"
    console.log('Clicked element text:', clickedElement.innerText); // Text of the clicked element

    // To access the button (the element with the event listener)
    console.log('Button element:', event.currentTarget.tagName); // Always "BUTTON"
    console.log('Button full text:', event.currentTarget.innerText); // "Click Me!"

    // Example: Different actions based on what was clicked
    if (clickedElement.tagName === 'SPAN') {
      console.log('You clicked the SPAN:', clickedElement.innerText);
    } else if (clickedElement.tagName === 'STRONG') {
      console.log('You clicked the STRONG:', clickedElement.innerText);
    } else {
      console.log('You clicked the button directly');
    }
  };

  return (
    <button onClick={handleClick}>
      <span>Click</span> <strong>Me!</strong>
    </button>
  );
}

export default Pooling;
