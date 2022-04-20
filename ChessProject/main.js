
const BOARD_LENGTH = 8;
const WHITE_PLAYER = "w";
const BLACK_PLAYER = "b";
const objBoard = new BoardData();
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
  markPossibleOptions(e);
  // if (!isSecondClick)
  // else
  // movePiece(e);

}


function markPossibleOptions(e) {
  isSecondClick = true;
  const clickedCell = e.target;
  const row = e.target.parentElement.rowIndex, column = e.target.cellIndex;
  const piece = objBoard.getPiece(row, column);
  if(piece === null){
    // Deselect the piece.
    return;
  }
  // We know for sure it's a piece
  if (currentPaintedCell !== undefined)
    currentPaintedCell.classList.remove("selectedCell");

  currentPaintedCell = clickedCell;
  currentPaintedCell.classList.add("selectedCell");
  const [possibleMoves, possibleEats] = piece.showPossibleMoves(objBoard.getBoard());
  const board = document.getElementsByTagName("table")[0];
  for (const move of possibleMoves) {
    const [row, col] = move; // Using destructuring
    const movableCell = board.rows[row].cells[col];
    movableCell.classList.add("possibleMove");
  }
  for(const eatMove of possibleEats){
    const [row, col] = eatMove;
    const eatablePiece = board.row[row].cell[col];
    eatablePiece.classList.add("possibleEat");
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
function piecePlacer(row, column, node, board) {
  // Applying style to all tds.
  node.style.backgroundRepeat = "no-repeat";
  node.style.backgroundPosition = "center";
  node.style.backgroundImage = board[row][column].getImage();
  node.style.cursor = "pointer";
}

function buildBoard() {
  const board = document.createElement("table");
  const boardBody = document.createElement("tbody");
  const boardPieces = objBoard.getBoard(); 
  let boardRow;
  let boardCell;
  
  board.setAttribute("id", "board");
  for (let i = 0; i < BOARD_LENGTH; i++) {
    boardRow = boardBody.insertRow();
    for (let j = 0; j < BOARD_LENGTH; j++) {
      boardCell = boardRow.insertCell();
      if ((i + j) % 2 === 0) boardCell.className = "white";
      else boardCell.className = "black";
      piecePlacer(i, j, boardCell, boardPieces);
    }
  }

  board.appendChild(boardBody);
  board.addEventListener("click", (e) => {
    cellInteraction(e);
  });
  return board;
}
