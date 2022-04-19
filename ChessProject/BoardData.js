/***
 * 
 */
class BoardData {
    constructor() {
        this.board = [];
        this.currentSelectedPiece = null;
        this.setupBoardPieces();
    }
    setupBoardPieces() {
        let color;
        for (let row = 0; row < BOARD_LENGTH; row++) {
            this.board.push([]);
            for (let column = 0; column < BOARD_LENGTH; column++) {
                if (row !== 0 && row !== 1 && row !== 7 && row !== 6) {
                    this.board[row].push(new Empty(row, column));
                    continue;
                }
                if (row === 0 || row === 1) color = BLACK_PLAYER;
                else if (row === 7 || row === 6) color = WHITE_PLAYER;
                if (row === 0 || row === 7) {
                    if (column === 0 || column === 7)
                        this.board[row].push(new Rook(row, column, "Rook", `url('pieces/${color}Rook.png')`, color));
                    else if (column === 1 || column === 6)
                        this.board[row].push(new Knight(row, column, "Knight", `url('pieces/${color}Knight.png')`, color));
                    else if (column === 2 || column === 5)
                        this.board[row].push(new Bishop(row, column, "Bishop", `url('pieces/${color}Bishop.png')`, color));
                    else if (column === 3)
                        this.board[row].push(new Queen(row, column, "Queen", `url('pieces/${color}Queen.png')`, color));
                    else if (column === 4)
                        this.board[row].push(new King(row, column, "King", `url('pieces/${color}King.png')`, color));
                }
                else if (row === 1 || row === 6) {
                    this.board[row].push(new Pawn(row, column, "Pawn", `url('pieces/${color}Pawn.png')`, color));
                }
            }
        }
    }

    getPiece(row, column){
        if(this.board[row][column] instanceof Empty) return null;
        return this.board[row][column];
    }

    getBoard() {
        return this.board;
    }
}