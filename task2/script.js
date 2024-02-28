const squares = document.querySelectorAll('.square');
const message = document.getElementById('message');
const playerSelect = document.getElementById('player-select');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let isAgainstAI = true; // By default, play against AI
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Add event listener to player select dropdown
playerSelect.addEventListener('change', () => {
  isAgainstAI = playerSelect.value === 'ai';
  resetGame();
});

// Add event listener to reset button
resetButton.addEventListener('click', resetGame);

function handleClick(index) {
  if (gameActive && board[index] === '') {
    board[index] = currentPlayer;
    squares[index].textContent = currentPlayer;
    if (checkForWin()) {
      message.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (checkForDraw()) {
      message.textContent = `It's a draw!`;
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `It's ${currentPlayer}'s turn`;
      if (isAgainstAI && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500); // Delay AI move
      }
    }
  }
}

function makeAIMove() {
  let availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      availableMoves.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  const move = availableMoves[randomIndex];
  board[move] = currentPlayer;
  squares[move].textContent = currentPlayer;
  if (checkForWin()) {
    message.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (checkForDraw()) {
    message.textContent = `It's a draw!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `It's ${currentPlayer}'s turn`;
  }
}

function checkForWin() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winningCombos.some(combo => {
    return combo.every(index => board[index] === currentPlayer);
  });
}

function checkForDraw() {
  return board.every(square => square !== '') && !checkForWin();
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = `It's ${currentPlayer}'s turn`;
  squares.forEach(square => {
    square.textContent = '';
  });
  if (isAgainstAI && currentPlayer === 'O') {
    setTimeout(makeAIMove, 500); // Delay AI move
  }
}

// Add click event listeners to squares
squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    handleClick(index);
  });
});
