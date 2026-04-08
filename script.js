


function player(name, mark) {

  const getName = () => name;
  const getMark = () => mark;
  
  return {getName ,getMark};
}


const gameboard = (() => {
  // Local variables
  const board = new Array(9).fill(null);

  // Public Methods
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
  

  return {isFull, clearBoard, isWiner, makeMove}
})();



function game() {
  
  // Public methods
  const playRound = () => {
    gameboard.clearBoard();

    const player1 = player(prompt("Enter your name: "), prompt("Chose a mark: "));
    const player2 = player(prompt("Enter your name: "), prompt("Chose a mark: "));

    while(!gameboard.isFull()){

      // Player 1 tern
      if (playTurn(player1, 1) === "game over") return;

      // Player 2 tern
      if (playTurn(player2, 2) === "game over") return;

    }
    console.log("Tie");
    return;
  }

  // Helpers
  const playTurn = (player, playerNumber) => {
    let cell = Number(prompt(`Plyer ${playerNumber}: Chose a cell1`));
      let state = gameboard.makeMove(cell, player.getMark());
      while(state !== "valid"){
        if (state === "out_of_range") cell = Number(prompt("Out of range! Choose 1-9:"));
        else if (state === "occupied") cell = Number(prompt("cell1 occupied! Choose another:"));
        else if (state === "invalid") cell = Number(prompt("Invalid input! Enter a number:"));
        state = gameboard.makeMove(cell, player.getMark());
      }
      if (gameboard.isWiner(player.getMark())){
        console.log(`${player.getName()} Win`);
        return "game over";
      }
  }
  return {playRound}
  
}

const game1 = game();
game1.playRound();