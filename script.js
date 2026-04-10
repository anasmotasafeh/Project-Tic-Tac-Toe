
// DOM
const playersElement = document.querySelector(".players");
const playersMarksEl = document.querySelector(".playersMarks")
const formElement = document.querySelector("form");
const boardElement = document.querySelector(".board");
const resultElement = document.querySelector(".winner");
const restartButtonEl = document.querySelector(".restart-button");

for (let i = 0; i < 9; i++) {
  const  cellElement = document.createElement("div");
  cellElement.dataset.id = i + 1;
  boardElement.appendChild(cellElement);
}

function player(mark) {

  const getMark = () => mark;
  
  return {getMark};
}

const gameBoard = (() => {
  // Local variables
  const board = new Array(9).fill(null);

  // Public Methods
  const getBoard = () => {
    let boardCopy = [...board];
    return boardCopy;
  }
  const isFull = () => {
    return !board.includes(null);
  }
  const clearBoard = () => {
    board.fill(null); 
  };
  const isWiner = (mark) => {
    return searchForWine(mark);
  };

  const makeMove = (cell1, mark) => {
    const state = validcell1(cell1);
    if (state === "valid"){
      choseCell(cell1, mark);
    } 
    return state;
  }


  // Helpers
  const validcell1 = (cell1) => {
    if (Number.isNaN(cell1)) return "invalid";
    if (cell1 < 1 || cell1 > board.length) return "out_of_range";
    if (board[cell1 - 1] !== null) return "occupied";
    return "valid";
  };
  const choseCell = (cell1, mark) => {
    board[cell1 - 1] = mark;
  };

  function searchForWine(mark) {
    return searchRows(mark) || searchColumns(mark) || searchDiagonals(mark);
  }
  function searchRows(mark){
    const rows = [0, 3, 6];
    for (let row of rows){
      if (board[row] === mark) {
        if (board[row + 1] === mark && board[row + 2] === mark) return true;

      }
    }
    return false;
  }
  function searchColumns(mark){
    const columns = [0, 1, 2];
    for (let column of columns){
      if (board[column] === mark) {
        if (board[column + 3] === mark && board[column + 6] === mark) return true;

      }
    }
    return false;
  }
  function searchDiagonals(mark){
    return (
      (board[0] === mark && board[4] === mark && board[8] === mark) ||
      (board[2] === mark && board[4] === mark && board[6] === mark)
    );
  } 
  

  return {getBoard, isFull, clearBoard, isWiner, makeMove}
})();

const renderGame = (() => {

  // Public Methods
  const renderPlayers = (p1, p2) => {
    const player1 = document.createElement("div");
    player1.textContent = `Player 1: ${p1.getMark()}`;
    const player2 = document.createElement("div");
    player2.textContent = `Player 2: ${p2.getMark()}`;
    playersMarksEl.appendChild(player1);
    playersMarksEl.appendChild(player2);
  }

  // const renderBoard = () => {
  //   boardElement.querySelectorAll("div").innerHTML = "";
  //   for (let i = 0; i < gameBoard.getBoard().length; i++){
  //     let cell = document.createElement("div");
  //     if (gameBoard.getBoard()[i] !== null) {
  //       cell.textContent = gameBoard.getBoard()[i];
  //     }
  //     boardElement.appendChild(cell);
  //   }
  // }

  const renderCell = (id, mark) => {
    const cell = document.querySelector(`[data-id="${id}"]`);
    cell.textContent = mark;
  }
  
  return{renderPlayers, renderCell}
})();



const game = (() => {
  // Privet prop
  const players = [];
  let currentPlayer = 0;
  let isGameOver = false;
  const switchPlayer = () => {
    currentPlayer = 1 - currentPlayer;
  }

  // Listeners
  formElement.addEventListener("submit", (e) => {
    e.preventDefault(); 
    if (players.length === 0){
      
      players.length = 0;
      const playersMarks = new FormData(formElement);
      const player1Mark = playersMarks.get("player1");
      const player2Mark = playersMarks.get("player2");

      const player1 = player(player1Mark, player1Mark);
      const player2 = player(player2Mark, player2Mark);
    
      players.push(player1);
      players.push(player2);
      
      renderGame.renderPlayers(player1, player2);
    }


    // renderGame();

  });

  boardElement.addEventListener("click", (e) => {
    const cell = Number(e.target.dataset.id);

    if (!isGameOver){
      if(gameBoard.makeMove(cell, players[currentPlayer].getMark()) === "valid") {
        
        renderGame.renderCell(cell, players[currentPlayer].getMark());

        if (gameBoard.isWiner(players[currentPlayer].getMark())) {
          resultElement.textContent = `الفائز هو: ${players[currentPlayer].getMark()}`;
          isGameOver = true;
        }
        else if (gameBoard.isFull()){
          resultElement.textContent = `تعادل`;
          isGameOver = true;
        }
        switchPlayer();
      }
      
    };
  })

  restartButtonEl.addEventListener("click", (e) => {
    gameBoard.clearBoard();
    players.length = 0;

    resultElement.textContent = "";
    playersMarksEl.textContent = "";
    document.querySelectorAll("[data-id]").forEach(cell => {
      cell.textContent = "";
    });
    formElement.reset();
    currentPlayer = 0;
    isGameOver = false;

    // renderGame.renderBoard();
  });
  
})();

