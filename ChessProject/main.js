const BOARD_LENGTH = 8;
const WHITE_PLAYER = "w";
const BLACK_PLAYER = "b";
const objBoard = new BoardData();


let turn = WHITE_PLAYER; 
let currentPaintedCell;
let isSecondClick = false; // Controls between a select and a move click.

window.addEventListener("load", setupGui);

/**
 * Builds the HTML and building the board.
 */
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

  // Appends the winner box into the board container
  boardContainer.appendChild(createWinnerBox());
  elementVar = document.createElement("div");
  elementVar.className = "player-name";
  elementVar.innerText = "Player 1";
  boardContainer.appendChild(elementVar);
}

/**
 * Creates a winner box and returns it for use.
 * @returns {HTMLDivElement}
 */
function createWinnerBox(){
  const winnerBox = document.createElement("div");
  let elementVar;
  elementVar = document.createElement("p");
  elementVar.innerText = "{winner} won!";
  elementVar.classList.add("winner-text");
  winnerBox.classList.add("winner-box");
  winnerBox.appendChild(elementVar);
  return winnerBox;
}

/**
 * Handles all board interactions.
 * @param {MouseEvent} e An object to the cell that got clicked
 */
function cellInteraction(e) {
  const cell = e.target.tagName === "TD" ? e.target : e.target.parentElement; // Should handle a weird bug with selecting td's
  if (!isSecondClick)
    markPossibleOptions(cell);
  else
    movePiece(cell);
}

/**
 * Performs the moving within the DOM and inside the pieces array.
 * @param {EventTarget} clickedCell The cell that was clicked
 */
function movePiece(clickedCell) {
  const row = clickedCell.parentElement.rowIndex, column = clickedCell.cellIndex;
  const board = document.getElementsByTagName("table")[0];
  const targetCell = board.rows[row].cells[column];
  if (targetCell.classList.contains("possibleEat") || targetCell.classList.contains("possibleMove")) {
    if (targetCell.classList.contains("possibleEat"))
      targetCell.firstChild.remove();

    targetCell.appendChild(currentPaintedCell.firstChild);
    objBoard.movePiece([currentPaintedCell.parentElement.rowIndex, currentPaintedCell.cellIndex], [row, column], true);
    if (objBoard.isKingThreaten(objBoard.getPiece(row, column).getEnemyColor())) {
      if (objBoard.isKingMated(objBoard.getPiece(row, column).getEnemyColor())) {
        let winnerBox = document.getElementsByClassName("winner-box")[0];
        if (objBoard.getPiece(row, column).getColor() === "w")
          winnerBox.firstChild.innerText = winnerBox.firstChild.innerText.replace("{winner}", "White");
        else
          winnerBox.firstChild.innerText = winnerBox.firstChild.innerText.replace("{winner}", "Black");
        winnerBox.style.display = "block";
      }
      else
        alert("You are in check");
    }
    turn = objBoard.getPiece(row, column).getEnemyColor(); // Switching turn.
  }
  currentPaintedCell.classList.remove("selectedCell");
  currentPaintedCell.style.cursor = "default";
  deSelectPiece();

  currentPaintedCell = undefined;
  isSecondClick = false;
}

/**
 * Deselect all selections.
 */
function deSelectPiece() {
  const board = document.getElementsByTagName("table")[0];
  for (let i = 0; i < BOARD_LENGTH; i++) {
    for (let j = 0; j < BOARD_LENGTH; j++) {
      board.rows[i].cells[j].classList.remove("possibleEat");
      board.rows[i].cells[j].classList.remove("possibleMove");
    }
  }

}

/**
 * 
 * @param {EventTarget} clickedCell 
 * @returns 
 */
function markPossibleOptions(clickedCell) {
  const row = clickedCell.parentElement.rowIndex, column = clickedCell.cellIndex;
  const piece = objBoard.getPiece(row, column);
  if (piece === null && currentPaintedCell === undefined) return; // There is nothing to deselect or select.

  if ((piece === null || piece !== currentPaintedCell) && currentPaintedCell !== undefined) {
    deSelectPiece();
    currentPaintedCell.classList.remove("selectedCell");
    currentPaintedCell = undefined;
    return;
  }

  if (turn !== piece.getColor()) return;
  isSecondClick = true;

  // We know for sure it's a piece
  if (currentPaintedCell !== undefined)
    currentPaintedCell.classList.remove("selectedCell");

  currentPaintedCell = clickedCell;
  currentPaintedCell.classList.add("selectedCell");
  const [possibleMoves, possibleEats] = piece.showPossibleMoves(objBoard);
  const board = document.getElementsByTagName("table")[0];
  for (const move of possibleMoves) {
    if (objBoard.isPiecePinned(piece, move)) {
      continue;
    }
    const [row, col] = move; // Using destructuring
    const movableCell = board.rows[row].cells[col];
    movableCell.classList.add("possibleMove");
  }
  for (const eatMove of possibleEats) {
    if (objBoard.isPiecePinned(piece, eatMove)) {
      continue;
    }
    const [row, col] = eatMove; // Using destructuring
    const eatablePiece = board.rows[row].cells[col];
    eatablePiece.classList.add("possibleEat");
  }
  // TODO: For castling
  // if (piece instanceof King) {
  //   if(!piece.hasMoved())
  //     const possibleCastles = piece.getPossibleCastles(objBoard);
  // }
}

/**
 * This function creates a piece object and insert it into the correlated cell in an array.
 * The function also styles each cell with it's piece.
 * @param {Number} row Which row the piece needs to be placed
 * @param {Number} column Which column the piece needs to be placed
 * @param {HTMLTableCellElement} node The HTML to apply the styles and image
 * @param {Array.<Array.<Piece>>} board A reference to the pieces array
 * @returns 
 */
function piecePlacer(row, column, node, board) {
  // Applying style to all tds.
  const piecePicture = document.createElement("img");
  piecePicture.diplay = "block";
  piecePicture.draggable = false;
  if (board[row][column].getImage() !== "none") {
    piecePicture.src = board[row][column].getImage();
    piecePicture.style.backgroundRepeat = "no-repeat";
    piecePicture.style.backgroundPosition = "center";
    piecePicture.style.cursor = "pointer";
    node.appendChild(piecePicture);
  }
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
