/***
 * 
 */
class BoardData {
    /**
     * Construct a BoardData object and setup the board pieces
     * @param {Array.<Array.<Piece>>} preMadeBoard  A premade of 2D pieces array
     */
    constructor(preMadeBoard) {
        /**
         * Holds the current board array of pieces.
         * @type {Array.<Array.<Piece>>}
         */
        this.board = preMadeBoard === undefined ? [] : preMadeBoard;
        this.currentSelectedPiece = null;
        if (this.board.length === 0)
            this.setupBoardPieces();
    }

    /**
     * Setup the 2D array of pieces in the right order.
     */
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
     * Returns a piece object.
     * If the position has no piece it will return null.
     * @param {Number} row The row of the piece
     * @param {Number} column The column of the piece
     * @returns {Piece} A piece object or null if there is no piece.
     */
    getPiece(row, column) {
        if (this.board[row][column] instanceof Empty) return null;
        return this.board[row][column];
    }

    /**
     * 
     * @param {String} name The name of the piece type
     * @param {String} color The shorthand color name.
     * @returns {Boolean} An array of all the matching piece of the selected color.
     */
    getSpecificPieces(name, color) {
        let pieces = [];
        if (color !== "w" && color !== "b") return null;
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j].getName() === name && this.board[i][j].getColor() === color)
                    pieces.push(this.board[i][j]);
            }
        }
        return pieces;
    }

    /**
     * Checks if the piece can move without making the king be eaten.
     * @param {Piece} selectedPiece A piece object we perform the test.
     * @param {Array.<Number>} moveToMark The position the piece wants to move.
     * @returns Returns whether the piece is pinned or not
     */
    isPiecePinned(selectedPiece, moveToMark) {
        const tempObjBoard = this;
        const tempBoard = tempObjBoard.getBoard();
        const tempPieceHolder = this.getPiece(moveToMark[0], moveToMark[1]) === null ? new Empty(moveToMark[0], moveToMark[1]) : this.getPiece(moveToMark[0], moveToMark[1]);
        tempBoard[moveToMark[0]][moveToMark[1]] = selectedPiece;
        tempBoard[selectedPiece.getPosition()[0]][selectedPiece.getPosition()[1]] = new Empty(selectedPiece.getPosition()[0], selectedPiece.getPosition()[1]);
        tempObjBoard.setBoard(tempBoard);
        const kingPos = this.getSpecificPieces("King", selectedPiece.getColor())[0].getPosition();
        const enemyPieces = this.getPieces(selectedPiece.getEnemyColor());
        for (const piece of enemyPieces) {
            const [possibleMoves, possibleEats] = piece.showPossibleMoves(tempObjBoard);
            for (const possibleEat of possibleEats) {
                if (possibleEat[0] === kingPos[0] && possibleEat[1] === kingPos[1]) {
                    tempObjBoard.getBoard()[moveToMark[0]][moveToMark[1]] = tempPieceHolder;
                    tempObjBoard.getBoard()[selectedPiece.getPosition()[0]][selectedPiece.getPosition()[1]] = selectedPiece;
                    return true;
                }
            }
        }
        tempObjBoard.getBoard()[moveToMark[0]][moveToMark[1]] = tempPieceHolder;
        tempObjBoard.getBoard()[selectedPiece.getPosition()[0]][selectedPiece.getPosition()[1]] = selectedPiece;
        return false;
    }

    /**
     * Checks if the king is mated.
     * @param {String} color The shorthand color name.
     * @returns {Boolean} A piece object or null if there is no piece.
     */
    isKingMated(color) {
        const king = this.getSpecificPieces("King", color)[0];
        const defendingPieces = this.getPieces(king.getColor());
        let tempPiece;
        let prevPiecePos;
        for (const piece of defendingPieces) {// Looping through all the aly pieces
            prevPiecePos = piece.getPosition();
            const [possibleMoves, possibleEats] = piece.showPossibleMoves(this);
            for (const possibleMove of possibleMoves) { // Looping all the possible moves for that aly piece
                this.movePiece(piece.getPosition(), possibleMove, false);
                if (!this.isKingThreaten(color)) {
                    this.movePiece(possibleMove, prevPiecePos, false);
                    return false;
                }
                this.movePiece(possibleMove, prevPiecePos, false);
            }
            for (const possibleEat of possibleEats) {
                tempPiece = this.getPiece(possibleEat[0], possibleEat[1]);
                this.movePiece(piece.getPosition(), possibleEat, false);
                if (!this.isKingThreaten(color)) {
                    this.movePiece(possibleEat, prevPiecePos, false);
                    this.board[possibleEat[0]][possibleEat[1]] = tempPiece;
                    return false;
                }
                this.movePiece(possibleEat, prevPiecePos, false);
                this.board[possibleEat[0]][possibleEat[1]] = tempPiece;
            }
        }
        const [kingPossibleMoves, kingPossibleEats] = king.showPossibleMoves(this);
        prevPiecePos = king.getPosition();
        for (const kingPossibleMove of kingPossibleMoves) {
            this.movePiece(king.getPosition(), kingPossibleMove, false);
            if (!this.isKingThreaten(color)) {
                this.movePiece(kingPossibleMove, prevPiecePos, false);
                return false;
            }
            this.movePiece(kingPossibleMove, prevPiecePos, false);
        }
        for (const kingPossibleEat of kingPossibleEats) {
            tempPiece = this.getPiece(kingPossibleEat[0], kingPossibleEat[1]);
            this.movePiece(king.getPosition(), kingPossibleEat, false);
            if (!this.isKingThreaten(color)) {
                this.movePiece(kingPossibleEat, prevPiecePos, false);
                this.board[kingPossibleEat[0]][kingPossibleEat[1]] = tempPiece;
                return false;
            }
            this.movePiece(kingPossibleEat, prevPiecePos, false);
            this.board[kingPossibleEat[0]][kingPossibleEat[1]] = tempPiece;
        }
        return true;
    }

    /**
     * Checks if there is an enemy piece that can eat the king.
     * @param {String} color The shorthand color name.
     * @returns {Boolean} Whether or not the king can be eaten.
     */
    isKingThreaten(color) {
        const king = this.getSpecificPieces("King", color)[0];
        const threateningPieces = this.getPieces(king.getEnemyColor());
        for (const piece of threateningPieces) {
            const [possibleMoves, possibleEats] = piece.showPossibleMoves(this);
            for (const possibleEat of possibleEats) {
                if (king.getPosition()[0] === possibleEat[0] && king.getPosition()[1] === possibleEat[1])
                    return true;
            }
        }
        return false;
    }

    /**
     * Gets the pieces array
     * @returns {Array.<Array.<Piece>>} Returns the pieces array.
     */
    getBoard() {
        return this.board;
    }

    /**
     * Set a new pieces board.
     * @param {Array.<Array.<Piece>>} board A pieces 2D we want to set to.
     */
    setBoard(board) {
        this.board = board;
    }

    /**
     * Gets all the pieces of a selected color.
     * @param {String} color Player color.
     * @returns {Array<Piece>} Array of corresponding color pieces.
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

    /**
     * Moves a piece inside the pieces board array.
     * @param {Array.<Number>} src An array with two cells of the current piece position
     * @param {Array.<Number>} target An array with two cells of the target position to move to.
     */
    movePiece(src, target, isReal) {
        if (src.length > 2 || target.length > 2) {
            console.log("something went wrong");
            return;
        }
        const [srcRow, srcColumn] = src;
        const [targetRow, targetColumn] = target;
        this.board[srcRow][srcColumn].setPosition(targetRow, targetColumn, isReal);
        this.board[targetRow][targetColumn] = this.board[srcRow][srcColumn];
        this.board[srcRow][srcColumn] = new Empty(srcRow, srcColumn);
    }

}