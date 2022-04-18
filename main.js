const BOARD_LENGTH = 8;
const objBoard = [];
let currentPaintedCell;
let isSecondClick = false; // Controls between a select and a move click.

window.addEventListener("load", setupGui);

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
}

/**
 * Handles all board interactions.
 * @param {MouseEvent} e Object to the cell that got clicked
 * @returns None
 */
function cellInteraction(e) {
  markPossibleMoves(e);
  // if (!isSecondClick)
  // else
  movePiece(e);

}


function markPossibleMoves(e) {
  isSecondClick = true;
  const clickedCell = e.target;
  const row = e.target.parentElement.rowIndex, column = e.target.cellIndex;
  if ((objBoard[row][column] instanceof Piece) === false) return;
  const objPiece = objBoard[row][column];
  // We know for sure it's a piece
  if (currentPaintedCell !== undefined)
    currentPaintedCell.classList.remove("selectedCell");

  currentPaintedCell = clickedCell;
  currentPaintedCell.classList.add("selectedCell");
  const possibleMoves = objPiece.showPossibleMoves(objBoard);
  const board = document.getElementsByTagName("table")[0];
  for (const move of possibleMoves) {
    let [row, col] = move; // Using destructuring
    let movableCell = board.rows[row].cells[col];
    console.dir(movableCell);
    movableCell.classList.add("possibleMove");
  }
}

/**
 * This function creates a piece object and insert it into the correlated cell in an array.
 * The function also styles each cell with it's piece.
 * @param {Number} row Which row the piece needs to be placed
 * @param {Number} column Which column the piece needs to be placed
 * @param {HTMLTableCellElement} node The HTML to apply the styles and image
 * @returns 
 */
function piecePlacer(row, column, node) {
  // Applying style to all tds.
  node.style.backgroundRepeat = "no-repeat";
  node.style.backgroundPosition = "center";
  if (row !== 0 && row !== 1 && row !== 7 && row !== 6) {
    objBoard[row].push(new Empty(row, column));
    return;
  }

  let color;
  if (row === 0 || row === 1) color = "b";
  else if (row === 7 || row === 6) color = "w";

  if (row === 0 || row === 7) {
    if (column === 0 || column === 7)
      objBoard[row].push(new Rook(row, column, "Rook", `url('pieces/${color}Rook.png')`, color));
    else if (column === 1 || column === 6)
      objBoard[row].push(new Knight(row, column, "Knight",`url('pieces/${color}Knight.png')`, color));
    else if (column === 2 || column === 5)
      objBoard[row].push(new Bishop(row, column, "Bishop", `url('pieces/${color}Bishop.png')`, color));
    else if (column === 3)
      objBoard[row].push(new Queen(row, column, "Queen",`url('pieces/${color}Queen.png')`, color));
    else if (column === 4)
      objBoard[row].push(new King(row, column, "King",`url('pieces/${color}King.png')`, color));
  }
  else if (row === 1 || row === 6) {
    objBoard[row].push(new Pawn(row, column, "Pawn", `url('pieces/${color}Pawn.png')`, color));
  }
  node.style.backgroundImage = objBoard[row][column].getImage();
  node.style.cursor = "pointer";
}

function buildBoard() {
  const board = document.createElement("table");
  const boardBody = document.createElement("tbody");
  let boardRow;
  let boardCell;
  board.setAttribute("id", "board");
  for (let i = 0; i < BOARD_LENGTH; i++) {
    boardRow = boardBody.insertRow();
    objBoard.push([]);
    for (let j = 0; j < BOARD_LENGTH; j++) {
      boardCell = boardRow.insertCell();
      if ((i + j) % 2 === 0) boardCell.className = "white";
      else boardCell.className = "black";
      piecePlacer(i, j, boardCell);
    }
  }
  board.appendChild(boardBody);
  board.addEventListener("click", (e) => {
    cellInteraction(e);
  });
  return board;
}
