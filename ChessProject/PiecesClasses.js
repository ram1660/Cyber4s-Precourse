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
    getPosition() {
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
    showPossibleMoves(objBoard) {
        throw new Error("Can't show move for an unknown piece");
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
    setPosition(row, column, isReal) {
        this.row = row;
        this.column = column;
        if (isReal)
            this.isFirstMove = false;
    }
    setFirstPosition(row, column) {
        this.row = row;
        this.column = column;

    }
}

class Rook extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
        this.possibleDirections = [1, -1];
        this.hasMoved = false;
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
    setPosition(row, column, isReal) {
        this.row = row;
        this.column = column;
        if (isReal)
            this.hasMoved = true;
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
    hasMoved() {
        return this.hasMoved;
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
        this.possibleDirections = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        this.isThreaten = false;
        this.hasMoved = false;
    }

    /**
     * This positions reduces the positions the king can go for a specific position array.
     * @param {BoardData} objBoard The current picture of the board.
     * @param {Array.<Number>} positions An array of possible moves or eats.
     */
    checkControlledSquares(objBoard, positions) {
        const enemyPieces = objBoard.getPieces(this.enemyColor);
        let i = positions.length, row, column;
        let tempObjBoard, tempBoard, tempPiece;;
        while (i--) {
            let move = positions[i];
            tempObjBoard = new BoardData(objBoard.getBoard());
            tempBoard = tempObjBoard.getBoard();
            row = move[0];
            column = move[1];
            tempPiece = tempBoard[row][column];
            tempBoard[row][column] = tempBoard[this.row][this.column];
            tempBoard[this.row][this.column] = new Empty(this.row, this.column);
            tempObjBoard.setBoard(tempBoard);
            for (const enemyPiece of enemyPieces) {
                if (this.isKingCanBeEaten(tempObjBoard, enemyPiece, move) === true) {
                    let remove = positions.findIndex(element => element[0] === row && element[1] === column);
                    if (remove !== -1)
                        positions.splice(remove, 1);
                }
            }
            tempBoard[this.row][this.column] = tempBoard[row][column];
            tempBoard[row][column] = tempPiece;
        }
    }

    isKingCanBeEaten(objBoard, enemyPiece, kingCurrentPossition) {
        const [possibleMoves, possibleEats] = enemyPiece.showPossibleMoves(objBoard);
        for (const eatPostion of possibleEats) {
            if (objBoard.getBoard()[eatPostion[0]][eatPostion[1]] === objBoard.getBoard()[kingCurrentPossition[0]][kingCurrentPossition[1]]) {
                return true;
            }
        }
        return false;
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
        this.checkControlledSquares(objBoard, possibleMoves);
        this.checkControlledSquares(objBoard, possibleEats);
        return [possibleMoves, possibleEats];
    }
    /**
     * 
     * @param {BoardData} board 
     */
    getPossibleCastles(board) {
        const alyRooks = board.getSpecificPieces("Rook", this.color);
        for (const rook of alyRooks) {
            if (!rook.hasMoved()) continue;
            // for (let column)
        }
    }

    hasMoved() {
        return this.hasMoved;
    }

    setPosition(row, column, isReal) {
        this.row = row;
        this.column = column;
        if (isReal)
            this.hasMoved = true;
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