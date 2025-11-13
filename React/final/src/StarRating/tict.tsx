import { useState } from 'react';

type Player = 'X' | 'O' | null;

function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [gameOver, setGameOver] = useState(false);

  // Winning combinations
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Check if there's a winner
  const checkWinner = (board: Player[]): Player => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Check if board is full (tie)
  const isBoardFull = (board: Player[]): boolean => {
    return board.every(cell => cell !== null);
  };

  // Handle cell click
  const handleCellClick = (index: number) => {
    // Don't allow move if game is over or cell is already filled
    if (gameOver || board[index]) {
      return;
    }

    // Make a copy of the board and update it
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check for winner
    const winnerResult = checkWinner(newBoard);
    if (winnerResult) {
      setWinner(winnerResult);
      setGameOver(true);
      return;
    }

    // Check for tie
    if (isBoardFull(newBoard)) {
      setGameOver(true);
      return;
    }

    // Switch player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
  };

  // Render a single cell
  const renderCell = (index: number) => {
    return (
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
          cursor: gameOver || board[index] ? 'not-allowed' : 'pointer',
          color: board[index] === 'X' ? '#ff6b6b' : '#4ecdc4'
        }}
      >
        {board[index]}
      </button>
    );
  };

  // Game status message
  const getGameStatus = () => {
    if (winner) {
      return `🎉 Player ${winner} Wins!`;
    }
    if (gameOver) {
      return `🤝 It's a Tie!`;
    }
    return `Current Player: ${currentPlayer}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Tic Tac Toe</h1>
      
      <div style={{ margin: '20px 0', fontSize: '18px', fontWeight: 'bold' }}>
        {getGameStatus()}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 80px)',
          gridGap: '5px',
          justifyContent: 'center',
          margin: '20px auto'
        }}
      >
        {board.map((_, index) => renderCell(index))}
      </div>

      <button
        onClick={resetGame}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Reset Game
      </button>

      <div style={{ marginTop: '30px', textAlign: 'left', maxWidth: '400px', margin: '30px auto' }}>
        <h3>How to Play:</h3>
        <ul>
          <li>Click on any empty cell to make your move</li>
          <li>X always goes first</li>
          <li>Get 3 in a row (horizontal, vertical, or diagonal) to win</li>
          <li>If all cells are filled without a winner, it's a tie</li>
        </ul>
      </div>
    </div>
  );
}

export default TicTacToe;
