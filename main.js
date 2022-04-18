const BOARD_LENGTH = 8;
const board = [];
let currentPaintedCell;
window.addEventListener("load", setupGui);


function updateBoard(){
  for(let i = 0; i < BOARD_LENGTH; i++){
    for(let j = 0; j < BOARD_LENGTH; j++){

    }
  }
}

function setupGui() {
  let elementVar;
  const boardContainer = document.createElement("div"); // Creating the main div container
  boardContainer.className = "board-container";

  elementVar = document.createElement("div"); // Appends Player 2 name
  elementVar.className = "player-name";
  elementVar.innerText = "Player 2";
  boardContainer.appendChild(elementVar);

  boardContainer.appendChild(buildBoard()); // Builds the board.
  document.body.appendChild(boardContainer);

  elementVar = document.createElement("div");
  elementVar.className = "player-name";
  elementVar.innerText = "Player 1";
  boardContainer.appendChild(elementVar);
  boardContainer.addEventListener("click", (e) => {
    placeMark(e);
  });
}

function placeMark(e) {
  const clickedCell = e.target;
  if (!clickedCell.classList.contains("piece")) return;
  // We know for sure it's a piece
  if (currentPaintedCell === undefined) {
    currentPaintedCell.classList.add("selectedCell");
  } else {
    currentPaintedCell.classList.remove("selectedCell");
    clickedCell.classList.add("selectedCell");
  }
  currentPaintedCell = clickedCell;
}

function piecePlacer(row, column, node) {
  if (row !== 0 && row !== 1 && row !== 7 && row !== 6) return;
  node.classList.add("piece"); // Add the piece class because we know it's a place where a piece will sit on.
  
  let color;
  if (row === 0 || row === 1) color = "b";
  else if (row === 7 || row === 6) color = "w";

  switch (column) {
    case 0:
      board.push(new Rook())
      node.style.backgroundImage = `url('pieces/${color}Rook.png')`;
      break;
    case 1:
      node.style.backgroundImage = `url('pieces/${color}Knight.png')`;
      break;
    case 2:
      node.style.backgroundImage = `url('pieces/${color}Bishop.png')`;
      break;
    case 3:
      node.style.backgroundImage = `url('pieces/${color}Queen.png')`;
      break;
    case 4:
      node.style.backgroundImage = `url('pieces/${color}King.png')`;
      break;
    case 5:
      node.style.backgroundImage = `url('pieces/${color}Bishop.png')`;
      break;
    case 6:
      node.style.backgroundImage = `url('pieces/${color}Knight.png')`;
      break;
    case 7:
      node.style.backgroundImage = `url('pieces/${color}Rook.png')`;
      break;
    default:
      break;
  }
  if (row === 1 || row === 6)
    node.style.backgroundImage = `url('pieces/${color}Pawn.png')`;
  if (node.classList.contains("piece")) node.style.cursor = "pointer";
  node.style.backgroundRepeat = "no-repeat";
  node.style.backgroundPosition = "center";
}

function name(params) {
  
}

function buildBoard() {
  const board = document.createElement("table");
  const boardBody = document.createElement("tbody");
  let boardRow;
  let boardCell;
  board.setAttribute("id", "board");
  for (let i = 0; i < BOARD_LENGTH; i++) {
    boardRow = boardBody.insertRow();
    for (let j = 0; j < BOARD_LENGTH; j++) {
      boardCell = boardRow.insertCell();
      if ((i + j) % 2 === 0) boardCell.className = "white";
      else boardCell.className = "black";
      piecePlacer(i, j, boardCell);
    }
  }
  board.appendChild(boardBody);
  return board;
}
