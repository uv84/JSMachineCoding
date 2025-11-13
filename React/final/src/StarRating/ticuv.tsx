import { useEffect, useState } from "react";
type Player = 'X' | 'O' | null;
const combinations = [
    [0,1,2], [3,4,5],[6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]


function Ticuv() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [move, setMove] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState('');
  function handleCellClick(index: number){


    if(board[index] || winner ) return

    const newBoard = [...board];
    newBoard[index] = move;
    setBoard(newBoard);

    if(move==='X') setMove('O');
    else{setMove('X');}



     

  }
  function resetGame(){
    setBoard(Array(9).fill(null));
    setMove('X');
    setWinner('');
  }

  useEffect(()=>{
    for(let combination of combinations){
        const [a,b,c] = combination;
        if(board[a]&& board[a]===board[b] && board[a]===board[c]){
            setWinner(board[a])
        }
    }
     
  }, [board])
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div
      style={{
        display: "grid", 
        gridTemplateColumns: 'repeat(3, 80px)',
        gridGap: '5px',
      }}    
      >
        {board && board.map((_,index) => (
          <button
          key={index}
            onClick={() => handleCellClick(index)}
            style={{
          width: '80px',
          height: '80px',
          fontSize: '24px',
          fontWeight: 'bold',
          border: '2px solid #333',
          backgroundColor: board[index] ? '#f0f0f0' : '#fff',
        //   cursor: gameOver || board[index] ? 'not-allowed' : 'pointer',
          color: board[index] === 'X' ? '#ff6b6b' : '#4ecdc4'}}
          >{board[index]}</button>
        ))}
      </div>
      <p>Winner is 
        {winner} </p>
        <div><button onClick={resetGame}>Reset the game</button></div>
    </div>
  );
}

export default Ticuv;
