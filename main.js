let elementVar;
const BOARD_LENGTH = 8;
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

function piecePlacer(row, column, node){
    const piece = document.createElement("button");
    piece
    let image = document.createElement("img");
    if(row === 0){
        switch (column) {
            case 0:
                image.setAttribute("src", "pieces/bRook.png");
                piece.appendChild(image);
                break;
            case 1:
                image.setAttribute("src", "pieces/bknight.png");
                piece.appendChild(image);
                break;
            case 2:
                image.setAttribute("src", "pieces/bBishop.png");
                piece.appendChild(image);
                break;
            case 3:
                image.setAttribute("src", "pieces/bQueen.png");
                piece.appendChild(image);
                break;
            case 4:
                image.setAttribute("src", "pieces/bKing.png");
                piece.appendChild(image);
                break;
            case 5:
                image.setAttribute("src", "pieces/bBishop.png");
                piece.appendChild(image);
                break;
            case 6:
                image.setAttribute("src", "pieces/bKnight.png");
                piece.appendChild(image);
                break;
            case 7:
                image.setAttribute("src", "pieces/bRook.png");
                piece.appendChild(image);
                break;
            default:
                break;
        }
    }else if(row === 1){
        image.setAttribute("src", "pieces/bPawn.png");
        piece.appendChild(image);
    }else if(row === 6){
        image.setAttribute("src", "pieces/wPawn.png");
        piece.appendChild(image);
    }else if(row === 7){
        switch (column) {
            case 0:
                image.setAttribute("src", "pieces/wRook.png");
                piece.appendChild(image);
                break;
            case 1:
                image.setAttribute("src", "pieces/wknight.png");
                piece.appendChild(image);
                break;
            case 2:
                image.setAttribute("src", "pieces/wBishop.png");
                piece.appendChild(image);
                break;
            case 3:
                image.setAttribute("src", "pieces/wQueen.png");
                piece.appendChild(image);
                break;
            case 4:
                image.setAttribute("src", "pieces/wKing.png");
                piece.appendChild(image);
                break;
            case 5:
                image.setAttribute("src", "pieces/wBishop.png");
                piece.appendChild(image);
                break;
            case 6:
                image.setAttribute("src", "pieces/wKnight.png");
                piece.appendChild(image);
                break;
            case 7:
                image.setAttribute("src", "pieces/wRook.png");
                piece.appendChild(image);
                break;
            default:
                break;
        }
    }
    node.appendChild(piece);
}

function buildBoard() {
    const board = document.createElement("table");
    const boardBody = document.createElement("tbody");
    let boardRow;
    let boardCell;
    board.setAttribute("id", "board"); 
    for(let i = 0; i < BOARD_LENGTH; i++){
      boardRow = boardBody.insertRow();
        for(let j = 0; j < BOARD_LENGTH; j++){
          boardCell = boardRow.insertCell();
            if((i + j) % 2 === 0)
                boardCell.className = "white";
            else
                boardCell.className = "black";
            piecePlacer(i, j, boardCell); 
        }
    }
    board.appendChild(boardBody);
    return board;
}