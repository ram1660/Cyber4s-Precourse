const BOARD_LENGTH = 8;
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
    console.log(e.target);
  });
}

function piecePlacer(row, column, node) {
  if (row === 0) {
    node.style.cursor = "pointer";
    switch (column) {
      case 0:
        node.style.backgroundImage = "url('pieces/bRook.png')";
        break;
      case 1:
        node.style.backgroundImage = "url('pieces/bKnight.png')";
        break;
      case 2:
        node.style.backgroundImage = "url('pieces/bBishop.png')";
        break;
      case 3:
        node.style.backgroundImage = "url('pieces/bQueen.png')";
        break;
      case 4:
        node.style.backgroundImage = "url('pieces/bKing.png')";
        break;
      case 5:
        node.style.backgroundImage = "url('pieces/bBishop.png')";
        break;
      case 6:
        node.style.backgroundImage = "url('pieces/bKnight.png')";
        break;
      case 7:
        node.style.backgroundImage = "url('pieces/bRook.png')";
        break;
      default:
        break;
    }
  } else if (row === 1) {
    node.style.backgroundImage = "url('pieces/bPawn.png')";
  } else if (row === 6) {
    node.style.backgroundImage = "url('pieces/wPawn.png')";
  } else if (row === 7) {
    switch (column) {
      case 0:
        node.style.backgroundImage = "url('pieces/wRook.png')";
        break;
      case 1:
        node.style.backgroundImage = "url('pieces/wKnight.png')";

        break;
      case 2:
        node.style.backgroundImage = "url('pieces/wBishop.png')";

        break;
      case 3:
        node.style.backgroundImage = "url('pieces/wQueen.png')";

        break;
      case 4:
        node.style.backgroundImage = "url('pieces/wKing.png')";

        break;
      case 5:
        node.style.backgroundImage = "url('pieces/wBishop.png')";

        break;
      case 6:
        node.style.backgroundImage = "url('pieces/wKnight.png')";

        break;
      case 7:
        node.style.backgroundImage = "url('pieces/wRook.png')";
        break;
      default:
        break;
    }
  }
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
