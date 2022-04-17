const BOARD_LENGTH = 8;
let currentPaintedCell;
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
  boardContainer.addEventListener("click", (e) => {
    placeMark(e);
  });
}

function placeMark(e){
  const clickedCell = e.target;
  if(!clickedCell.classList.contains("piece")) return;
  // We know for sure it's a piece
  if(currentPaintedCell === undefined){
    currentPaintedCell = clickedCell;
    currentPaintedCell.classList.add("selectedCell");
    // let [posRow, posCol] = [currentPaintedCell.parentElement.rowIndex, currentPaintedCell.cellIndex];
    // if((posRow + posCol) % 2 === 0) currentPaintedCell.classList.remove("selected");
  }else{
    currentPaintedCell.classList.remove("selectedCell");
    currentPaintedCell = clickedCell;
    currentPaintedCell.classList.add("selectedCell");
  }
}


function piecePlacer(row, column, node) {
  if (row === 0) {
    switch (column) {
      case 0:
        node.style.backgroundImage = "url('pieces/bRook.png')";
        node.classList.add("piece");
        break;
      case 1:
        node.style.backgroundImage = "url('pieces/bKnight.png')";
        node.classList.add("piece");
        break;
      case 2:
        node.style.backgroundImage = "url('pieces/bBishop.png')";
        node.classList.add("piece");
        break;
      case 3:
        node.style.backgroundImage = "url('pieces/bQueen.png')";
        node.classList.add("piece");
        break;
      case 4:
        node.style.backgroundImage = "url('pieces/bKing.png')";
        node.classList.add("piece");
        break;
      case 5:
        node.style.backgroundImage = "url('pieces/bBishop.png')";
        node.classList.add("piece");
        break;
      case 6:
        node.style.backgroundImage = "url('pieces/bKnight.png')";
        node.classList.add("piece");
        break;
      case 7:
        node.style.backgroundImage = "url('pieces/bRook.png')";
        node.classList.add("piece");
        break;
      default:
        break;
    }
  } else if (row === 1) {
    node.style.backgroundImage = "url('pieces/bPawn.png')";
    node.classList.add("piece");
  } else if (row === 6) {
    node.style.backgroundImage = "url('pieces/wPawn.png')";
    node.classList.add("piece");
  } else if (row === 7) {
    switch (column) {
      case 0:
        node.style.backgroundImage = "url('pieces/wRook.png')";
        node.classList.add("piece");
        break;
      case 1:
        node.style.backgroundImage = "url('pieces/wKnight.png')";
        node.classList.add("piece");
        break;
      case 2:
        node.style.backgroundImage = "url('pieces/wBishop.png')";
        node.classList.add("piece");

        break;
      case 3:
        node.style.backgroundImage = "url('pieces/wQueen.png')";
        node.classList.add("piece");

        break;
      case 4:
        node.style.backgroundImage = "url('pieces/wKing.png')";
        node.classList.add("piece");

        break;
      case 5:
        node.style.backgroundImage = "url('pieces/wBishop.png')";
        node.classList.add("piece");

        break;
      case 6:
        node.style.backgroundImage = "url('pieces/wKnight.png')";
        node.classList.add("piece");

        break;
      case 7:
        node.style.backgroundImage = "url('pieces/wRook.png')";
        node.classList.add("piece");
        break;
      default:
        break;
    }
  }
  if(node.classList.contains("piece")) node.style.cursor = "pointer";
  node.style.backgroundRepeat = "no-repeat";
  node.style.backgroundPosition = "center";
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
