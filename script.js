


function player(name, mark) {

  // Variables
  // let score = 0;

  // Public Methods
  const getName = () => name;
  const getMark = () => mark;
  // const getScore = () => score;
  // const scoreUp = () => score++;
  // const play = (cell1) => {
  //   while (true) {
  //     const status = gameboard.makeMove(cell1, mark);

  //     if (status === "valid") break;

  //     if (status === "out_of_range") {
  //       cell1 = Number(prompt("Choose a cell1 between 1 and 9"));
  //       continue;
  //     }

  //     if (status === "occupied") {
  //       cell1 = Number(prompt("cell1 is taken, choose another one"));
  //       continue;
  //     }

  //     if (status === "invalid") {
  //       cell1 = Number(prompt("Enter a valid number"));
  //       continue;
  //     }
  //   }

    // gameboard.makeMove(cell1, mark);
  // };

// , play, scoreUp, getScore
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
      chosecell1(cell1, mark);
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
  const chosecell1 = (cell1, mark) => {
    board[cell1 - 1] = mark;
  };

  function searchForWine(mark) {
    return searchRows(mark) || searchColumns(mark);
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

  return {isFull, clearBoard, isWiner, makeMove}
})();



function game() {
  

  const playRound = () => {
    gameboard.clearBoard();

    const player1 = player(prompt("Enter your name: "), prompt("Chose a mark: "));
    const player2 = player(prompt("Enter your name: "), prompt("Chose a mark: "));

    while(!gameboard.isFull()){

      // Player 1 tern
      let cell1 = Number(prompt("Plyer 1: Chose a cell1"));
      let state1 = gameboard.makeMove(cell1, player1.getMark());
      while(state1 !== "valid"){
        if (state1 === "out_of_range") cell1 = Number(prompt("Out of range! Choose 1-9:"));
        else if (state1 === "occupied") cell1 = Number(prompt("cell1 occupied! Choose another:"));
        else if (state1 === "invalid") cell1 = Number(prompt("Invalid input! Enter a number:"));
        state1 = gameboard.makeMove(cell1, player1.getMark());
        
      }
      
      if (gameboard.isWiner(player1.getMark())){
        console.log(`${player1.getName()} Win`);
        return;
      }

      // Player 2 tern
      let cell2 = Number(prompt("Plyer 2: Chose a cell1"));
      let state2 = gameboard.makeMove(cell2, player2.getMark());
      while(state2 !== "valid"){
        if (state2 === "out_of_range") cell2 = Number(prompt("Out of range! Choose 1-9:"));
        else if (state2 === "occupied") cell2 = Number(prompt("cell1 occupied! Choose another:"));
        else if (state2 === "invalid") cell2 = Number(prompt("Invalid input! Enter a number:"));
        state2 = gameboard.makeMove(cell2, player2.getMark());
      }
      
      if (gameboard.isWiner(player2.getMark())){
        console.log(`${player2.getName()} Win`);
        return;
      }

    }
    console.log("Tie");
  }
  return {playRound}
  
}

const game1 = game();
game1.playRound();