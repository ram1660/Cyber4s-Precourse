class Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        this.name = name;
        this.row = row;
        this.column = column;
        this.pieceImage = pieceImage;
        this.additionalStyles = additionalStyles || [];
        this.color = color;
        this.enemyColor = this.color === "w" ? "b" : "w"; // This will tell us who is the enemy.
    }
    getImage() {
        return this.pieceImage;
    }
    getPieceColor() {
        return this.color;
    }
    getPostion() {
        return [this.row, this.column];
    }
    getName() {
        return this.name;
    }
    getColor() {
        return this.color;
    }
    setPosition(row, column) {
        this.row = row;
        this.column = column;
    }
    getEnemyColor() {
        return this.enemyColor;
    }
}

class Pawn extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
        this.isFirstMove = true;
        this.direction = this.color === "w" ? -1 : 1; // Controls which direction the pawn should move.
    }
    showPossibleMoves(objBoard) {
        const board = objBoard.getBoard();
        const possibleMoves = [];
        const possibleEats = [];
        // TODO: Add bounderies check
        if (this.isFirstMove) // Is it the first move?
            if (board[this.row + 2 * this.direction][this.column].getName() === "Empty")
                possibleMoves.push([this.row + 2 * this.direction, this.column]);

        this.addNearMovableCell(board, possibleMoves);
        if (this.row - 1 > -1 && this.row + 1 < BOARD_LENGTH) {
            if (this.column - 1 > -1 && board[this.row + 1 * this.direction][this.column - 1].getColor() === this.enemyColor)
                possibleEats.push([this.row + 1 * this.direction, this.column - 1]);
            if (this.column + 1 < BOARD_LENGTH && board[this.row + 1 * this.direction][this.column + 1].getColor() === this.enemyColor)
                possibleEats.push([this.row + 1 * this.direction, this.column + 1]);
        }
        return [possibleMoves, possibleEats];
    }
    /**
     * Adds the one square move if possible.
     * @param {Piece[][]} board The current board
     * @param {Array} possibleMoves A reference to the possible moves array
     */
    addNearMovableCell(board, possibleMoves) {
        if (board[this.row + 1 * this.direction][this.column].getName() === "Empty")
            possibleMoves.push([this.row + 1 * this.direction, this.column]);
    }
    setPosition(row, column) {
        this.row = row;
        this.column = column;
        this.isFirstMove = false;
    }
}

class Rook extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
        this.possibleDirections = [1, -1];
    }
    getRelativeMoves(direction) {

    }
    showPossibleMoves(objBoard) {
        const board = objBoard.getBoard();
        const possibleMoves = [];
        const possibleEats = [];
        for (const direction of this.possibleDirections) {
            let row = this.row + direction;
            let column = this.column + direction;
            while (row < BOARD_LENGTH && row > -1) {
                if (board[row][this.column].getColor() === this.color)
                    break;
                if (board[row][this.column].getColor() === this.enemyColor) {
                    possibleEats.push([row, this.column]);
                    break;
                } else if (board[row][this.column].getName() === "Empty")
                    possibleMoves.push([row, this.column]);
                row += direction;
            }
            while (column > -1 && column < BOARD_LENGTH) {
                if (board[this.row][column].getColor() === this.color)
                    break;
                if (board[this.row][column].getColor() === this.enemyColor) {
                    possibleEats.push([this.row, column]);
                    break;
                } else if (board[this.row][column].getName() === "Empty")
                    possibleMoves.push([this.row, column]);
                column += direction;
            }
        }
        return [possibleMoves, possibleEats];
    }
}
class Queen extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
        this.possibleStraightDirections = [1, -1];
        this.possibleDiagonalsDirections = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    }
    showPossibleMoves(objBoard) {
        const possibleMoves = [];
        const possibleEats = [];
        this.possibleDiagonalsMoves(objBoard, possibleMoves, possibleEats);
        this.possibleStraightMoves(objBoard, possibleMoves, possibleEats);
        return [possibleMoves, possibleEats];
    }
    // Inspired from the bishop logic
    possibleDiagonalsMoves(objBoard, possibleMoves, possibleEats) {
        const board = objBoard.getBoard();
        for (const direction of this.possibleDiagonalsDirections) {
            let row = this.row + direction[0], column = this.column + direction[1];
            while (row > -1 && row < BOARD_LENGTH && column > -1 && column < BOARD_LENGTH) {
                if (board[row][column].getColor() === this.color)
                    break;
                if (board[row][column].getColor() === this.enemyColor) {
                    possibleEats.push([row, column]);
                    break;
                } else if (board[row][column].getName() === "Empty")
                    possibleMoves.push([row, column]);
                row += direction[0];
                column += direction[1];
            }
        }
    }
    // Inspired from the rook logic
    possibleStraightMoves(objBoard, possibleMoves, possibleEats) {
        const board = objBoard.getBoard();
        for (const direction of this.possibleStraightDirections) {
            let row = this.row + direction;
            let column = this.column + direction;
            while (row < BOARD_LENGTH && row > -1) {
                if (board[row][this.column].getColor() === this.color)
                    break;
                if (board[row][this.column].getColor() === this.enemyColor) {
                    possibleEats.push([row, this.column]);
                    break;
                } else if (board[row][this.column].getName() === "Empty")
                    possibleMoves.push([row, this.column]);
                row += direction;
            }
            while (column > -1 && column < BOARD_LENGTH) {
                if (board[this.row][column].getColor() === this.color)
                    break;
                if (board[this.row][column].getColor() === this.enemyColor) {
                    possibleEats.push([this.row, column]);
                    break;
                } else if (board[this.row][column].getName() === "Empty")
                    possibleMoves.push([this.row, column]);
                column += direction;
            }
        }
    }
}

class Knight extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
        this.possibleDirections = [
            { row: -2, sides: [1, -1] },
            { row: 2, sides: [1, -1] },
            { row: 1, sides: [2, -2] },
            { row: -1, sides: [2, -2] }
        ]
    }

    showPossibleMoves(objBoard) {
        const board = objBoard.getBoard();
        const possibleEats = [];
        const possibleMoves = [];
        for (const pos of this.possibleDirections) {
            let currentRowPosition = pos["row"];
            if (this.row + currentRowPosition < BOARD_LENGTH && this.row + currentRowPosition > -1) {
                for (const side of pos.sides) {
                    if (this.column + side < BOARD_LENGTH && this.column + side > -1) {
                        if (board[this.row + currentRowPosition][this.column + side].getColor() === this.enemyColor)
                            possibleEats.push([this.row + currentRowPosition, this.column + side]);
                        else if (board[this.row + currentRowPosition][this.column + side].getName() === "Empty")
                            possibleMoves.push([this.row + currentRowPosition, this.column + side]);
                    }
                }
            }
        }
        return [possibleMoves, possibleEats];
    }
}
class King extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
        this.possibleDirections = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    }

    /**
     * 
     * @param {BoardData} objBoard 
     * @param {Array} kingPossibleMoves 
     * @param {Array} kingPossibleEats 
     */
    checkControlledSquares(objBoard, kingPossibleMoves, kingPossibleEats) {
        const enemyPieces = objBoard.getPieces(this.enemyColor);
        let i = kingPossibleMoves.length;
        while (i--) {
            let move = kingPossibleMoves[i];
            let tempObjBoard = new BoardData(objBoard.getBoard());
            let tempBoard = tempObjBoard.getBoard();
            let row = move[0], column = move[1];
            tempBoard[row][column] = tempBoard[this.row][this.column];
            tempBoard[this.row][this.column] = new Empty(this.row, this.column);
            tempObjBoard.setBoard(tempBoard);
            for (const enemyPiece of enemyPieces) {
                const [possibleMoves, possibleEats] = enemyPiece.showPossibleMoves(tempObjBoard);
                for (const eatPostion of possibleEats) {
                    if (tempBoard[eatPostion[0]][eatPostion[1]] === tempBoard[row][column]) {
                        let remove = kingPossibleMoves.findIndex(element => element[0] === row && element[1] === column);
                        if (remove !== -1)
                            kingPossibleMoves.splice(remove, 1);
                    }
                }
            }
            tempBoard[this.row][this.column] = tempBoard[row][column];
            tempBoard[row][column] = new Empty(row, column);
        }
    }
    showPossibleMoves(objBoard) {
        const board = objBoard.getBoard();
        const possibleEats = [];
        const possibleMoves = [];
        for (const direction of this.possibleDirections) {
            let row = this.row + direction[0];
            let column = this.column + direction[1];
            if (row < BOARD_LENGTH && row > -1) {
                if (column < BOARD_LENGTH && column > -1) {
                    if (board[row][column].getColor() === this.enemyColor)
                        possibleEats.push([row, column]);
                    else if (board[row][column].getName() === "Empty")
                        possibleMoves.push([row, column]);
                }
            }
        }
        this.checkControlledSquares(objBoard, possibleMoves, possibleEats);
        return [possibleMoves, possibleEats];
    }
}

class Bishop extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
        this.possibleDirections = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    }
    showPossibleMoves(objBoard) {
        const board = objBoard.getBoard();
        const possibleEats = [];
        const possibleMoves = [];
        for (const direction of this.possibleDirections) {
            let row = this.row + direction[0], column = this.column + direction[1];
            while (row > -1 && row < BOARD_LENGTH && column > -1 && column < BOARD_LENGTH) {
                if (board[row][column].getColor() === this.color)
                    break;
                if (board[row][column].getColor() === this.enemyColor) {
                    possibleEats.push([row, column]);
                    break;
                } else if (board[row][column].getName() === "Empty")
                    possibleMoves.push([row, column]);
                row += direction[0];
                column += direction[1];
            }
        }
        return [possibleMoves, possibleEats];
    }
}

class Empty {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.name = "Empty";
    }
    getName() {
        return this.name;
    }
    getColor() {
        return "None";
    }
    getImage() {
        return "none";
    }
}