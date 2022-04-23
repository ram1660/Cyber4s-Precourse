/***
 * 
 */
class BoardData {
    constructor(preMadeBoard) {
        this.board = preMadeBoard === undefined ? [] : preMadeBoard;
        this.currentSelectedPiece = null;
        if (this.board.length === 0)
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
                        this.board[row].push(new Rook(row, column, "Rook", `pieces/${color}Rook.svg`, color));
                    else if (column === 1 || column === 6)
                        this.board[row].push(new Knight(row, column, "Knight", `pieces/${color}Knight.svg`, color));
                    else if (column === 2 || column === 5)
                        this.board[row].push(new Bishop(row, column, "Bishop", `pieces/${color}Bishop.svg`, color));
                    else if (column === 3)
                        this.board[row].push(new Queen(row, column, "Queen", `pieces/${color}Queen.svg`, color));
                    else if (column === 4)
                        this.board[row].push(new King(row, column, "King", `pieces/${color}King.svg`, color));
                }
                else if (row === 1 || row === 6) {
                    this.board[row].push(new Pawn(row, column, "Pawn", `pieces/${color}Pawn.svg`, color));
                }
            }
        }
    }
    /**
     * 
     * @param {Number} row The row of the piece
     * @param {Number} column The column of the piece
     * @returns {Piece}
     */
    getPiece(row, column) {
        if (this.board[row][column] instanceof Empty) return null;
        return this.board[row][column];
    }

    getBoard() {
        return this.board;
    }
    setBoard(board) {
        this.board = board;
    }
    /**
     * 
     * @param {String} color Player color
     * @returns {Array<Piece>} Array of corresponding color
     */
    getPieces(color) {
        const pieces = [];
        if (color !== "w" && color !== "b") return pieces;
        for (const row of this.board)
            for (const piece of row)
                if (piece.getColor() === color && !(piece instanceof King))
                    pieces.push(piece);
        return pieces;
    }

    movePiece(src, target) {
        if (src.length !== 2 || target.length !== 2) {
            console.log("something went wrong");
            return;
        }
        const [srcRow, srcColumn] = src;
        const [targetRow, targetColumn] = target;
        this.board[srcRow][srcColumn].setPosition(targetRow, targetColumn);
        this.board[targetRow][targetColumn] = this.board[srcRow][srcColumn];
        this.board[srcRow][srcColumn] = new Empty(srcRow, srcColumn);
    }
}