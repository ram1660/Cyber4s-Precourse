// TODO: The possible move functions have repeated code. Find a way to format the code in a way without any duplicates.

class Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        this.name = name;
        this.row = row;
        this.column = column;
        this.pieceImage = pieceImage;
        this.additionalStyles = additionalStyles || [];
        this.color = color;
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
}

class Pawn extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
        this.isFirstMove = true;
    }
    showPossibleMoves(board) {
        const possibleMoves = [];
        const possibleEats = [];

        if (this.isFirstMove) {
            if (this.color === "w") {
                if (board[this.row - 1][this.column].getName() !== "Empty") return possibleMoves;
                possibleMoves.push([this.row - 1, this.column]);
                if (board[this.row - 2][this.column].getName() !== "Empty") return possibleMoves;
                possibleMoves.push([this.row - 2, this.column]);
            } else {
                if (board[this.row + 1][this.column].getName() !== "Empty") return possibleMoves;
                possibleMoves.push([this.row + 1, this.column]);
                if (board[this.row + 2][this.column].getName() !== "Empty") return possibleMoves;
                possibleMoves.push([this.row + 2, this.column]);
            }
        }
        return [possibleMoves, possibleEats];
    }
    movePiece(board) {
        this.isFirstMove = false;
    }
}

class Rook extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
    }
    showPossibleMoves(board) {
        const possibleMoves = [];
        const possibleEats = [];
        const enemyColor = this.color === "w" ? "b" : "w";
        // Possible duplicated code
        if (this.color === "w") {
            for (let i = this.row; i < BOARD_LENGTH; i++) {
                if (board[i][this.column].getColor() === "w")
                    break;
                if (board[i][this.column].getColor() === "b") {
                    possibleEats.push([i, this.column]);
                    break;
                } else
                    possibleMoves.push([i, this.column]);
            }
            for (let i = this.row; i > -1; i--) {
                if (board[i][this.column].getColor() === "w")
                    break;
                if (board[i][this.column].getColor() === "b") {
                    possibleEats.push([i, this.column]);
                    break;
                } else
                    possibleMoves.push([i, this.column]);
            }
            for (let i = this.column; i < BOARD_LENGTH; i++) {
                if (board[this.row][i].getColor() === "w")
                    break;
                if (board[this.row][i].getColor() === "b") {
                    possibleEats.push([this.row, i]);
                    break;
                } else
                    possibleMoves.push([this.row, i]);
            }
            for (let i = this.column; i > -1; i--) {
                if (board[this.row][i].getColor() === "w")
                    break;
                if (board[this.row][i].getColor() === "b") {
                    possibleEats.push([this.row, i]);
                    break;
                } else
                    possibleMoves.push([this.row, i]);
            }
        } else {
            for (let i = this.row; i < BOARD_LENGTH; i++) {
                if (board[i][this.column].getColor() === "b")
                    break;
                if (board[i][this.column].getColor() === "w") {
                    possibleEats.push([i, this.column]);
                    break;
                } else
                    possibleMoves.push([i, this.column]);
            }
            for (let i = this.row; i > -1; i--) {
                if (board[i][this.column].getColor() === "b")
                    break;
                if (board[i][this.column].getColor() === "w") {
                    possibleEats.push([i, this.column]);
                    break;
                } else
                    possibleMoves.push([i, this.column]);
            }
            for (let i = this.column; i < BOARD_LENGTH; i++) {
                if (board[this.row][i].getColor() === "b")
                    break;
                if (board[this.row][i].getColor() === "w") {
                    possibleEats.push([this.row, i]);
                    break;
                } else
                    possibleMoves.push([this.row, i]);
            }
            for (let i = this.column; i > -1; i--) {
                if (board[this.row][i].getColor() === "b")
                    break;
                if (board[this.row][i].getColor() === "w") {
                    possibleEats.push([this.row, i]);
                    break;
                } else
                    possibleMoves.push([this.row, i]);
            }
        }
        return [possibleMoves, possibleEats];
    }
}
class Queen extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
    }
    showPossibleMoves(board) {

    }
    possibleDiagonalsMoves(board) {

    }
    possibleStraightMoves(board) {

    }
}

class Knight extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
    }
    showPossibleMoves(board) {
        const possibleMoves = [];
        const possibleEats = [];
        if (this.color === "w") {
            if (this.row + 2 < BOARD_LENGTH) {
                if (this.column + 1 < BOARD_LENGTH) {
                    if (board[this.row + 2][this.column + 1].getColor() === "b")
                        possibleEats.push([this.row + 2, this.column + 1]);
                    else if (board[this.row + 2][this.column + 1].getName() === "Empty")
                        possibleMoves.push([this.row + 2, this.column + 1]);
                }
                if (this.column - 1 > -1) {
                    if (board[this.row + 2][this.column - 1].getColor() === "b")
                        possibleEats.push([this.row + 2, this.column - 1]);
                    else if (board[this.row + 2][this.column - 1].getName() === "Empty")
                        possibleMoves.push([this.row + 2, this.column - 1]);
                }
            }
            if (this.row - 2 > -1) {
                if (this.column + 1 < BOARD_LENGTH) {
                    if (board[this.row - 2][this.column + 1].getColor() === "b")
                        possibleEats.push([this.row - 2, this.column + 1]);
                    else if (board[this.row - 2][this.column + 1].getName() === "Empty")
                        possibleMoves.push([this.row - 2, this.column + 1]);
                }
                if (this.column - 1 > -1) {
                    if (board[this.row - 2][this.column - 1].getColor() === "b")
                        possibleEats.push([this.row - 2, this.column - 1]);
                    else if (board[this.row - 2][this.column - 1].getName() === "Empty")
                        possibleMoves.push([this.row - 2, this.column - 1]);
                }
            }
            if (this.column + 2 < BOARD_LENGTH) {
                if (this.row + 1 < BOARD_LENGTH) {
                    if (board[this.row + 1][this.column + 2].getColor() === "b")
                        possibleEats.push([this.row + 1, this.column + 2]);
                    else if (board[this.row + 1][this.column + 2].getName() === "Empty")
                        possibleMoves.push([this.row + 1, this.column + 2]);
                }
                if (this.row - 1 > -1) {
                    if (board[this.row - 1][this.column + 2].getColor() === "b")
                        possibleEats.push([this.row - 1, this.column + 2]);
                    else if (board[this.row - 1][this.column + 2].getName() === "Empty")
                        possibleMoves.push([this.row - 1, this.column + 2]);
                }
            }
            if (this.column - 2 > -1) {
                if (this.row + 1 < BOARD_LENGTH) {
                    if (board[this.row + 1][this.column - 2].getColor() === "b")
                        possibleEats.push([this.row + 1, this.column - 2]);
                    else if (board[this.row + 1][this.column - 2].getName() === "Empty")
                        possibleMoves.push([this.row + 1, this.column - 2]);
                }
                if (this.row - 1 > -1) {
                    if (board[this.row - 1][this.column - 2].getColor() === "b")
                        possibleEats.push([this.row - 1, this.column - 2]);
                    else if (board[this.row - 1][this.column - 2].getName() === "Empty")
                        possibleMoves.push([this.row - 1, this.column - 2]);
                }
            }
        } else {
            if (this.row + 2 < BOARD_LENGTH) {
                if (this.column + 1 < BOARD_LENGTH) {
                    if (board[this.row + 2][this.column + 1].getColor() === "w")
                        possibleEats.push([this.row + 2, this.column + 1]);
                    else if (board[this.row + 2][this.column + 1].getName() === "Empty")
                        possibleMoves.push([this.row + 2, this.column + 1]);
                }
                if (this.column - 1 > -1) {
                    if (board[this.row + 2][this.column - 1].getColor() === "w")
                        possibleEats.push([this.row + 2, this.column - 1]);
                    else if (board[this.row + 2][this.column - 1].getName() === "Empty")
                        possibleMoves.push([this.row + 2, this.column - 1]);
                }
            }
            if (this.row - 2 > -1) {
                if (this.column + 1 < BOARD_LENGTH) {
                    if (board[this.row - 2][this.column + 1].getColor() === "w")
                        possibleEats.push([this.row - 2, this.column + 1]);
                    else if (board[this.row - 2][this.column + 1].getName() === "Empty")
                        possibleMoves.push([this.row - 2, this.column + 1]);
                }
                if (this.column - 1 > -1) {
                    if (board[this.row - 2][this.column - 1].getColor() === "w")
                        possibleEats.push([this.row - 2, this.column - 1]);
                    else if (board[this.row - 2][this.column - 1].getName() === "Empty")
                        possibleMoves.push([this.row - 2, this.column - 1]);
                }
            }
            if (this.column + 2 < BOARD_LENGTH) {
                if (this.row + 1 < BOARD_LENGTH) {
                    if (board[this.row + 1][this.column + 2].getColor() === "w")
                        possibleEats.push([this.row + 1, this.column + 2]);
                    else if (board[this.row + 1][this.column + 2].getName() === "Empty")
                        possibleMoves.push([this.row + 1, this.column + 2]);
                }
                if (this.row - 1 > -1) {
                    if (board[this.row - 1][this.column + 2].getColor() === "w")
                        possibleEats.push([this.row - 1, this.column + 2]);
                    else if (board[this.row - 1][this.column + 2].getName() === "Empty")
                        possibleMoves.push([this.row - 1, this.column + 2]);
                }
            }
            if (this.column - 2 > -1) {
                if (this.row + 1 < BOARD_LENGTH) {
                    if (board[this.row + 1][this.column - 2].getColor() === "w")
                        possibleEats.push([this.row + 1, this.column - 2]);
                    else if (board[this.row + 1][this.column - 2].getName() === "Empty")
                        possibleMoves.push([this.row + 1, this.column - 2]);
                } if (this.row - 1 > -1) {
                    if (board[this.row - 1][this.column - 2].getColor() === "w")
                        possibleEats.push([this.row - 1, this.column - 2]);
                    else if (board[this.row - 1][this.column - 2].getName() === "Empty")
                        possibleMoves.push([this.row - 1, this.column - 2]);
                }
            }

        }
        return [possibleMoves, possibleEats];
    }
}

class King extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
    }
    showPossibleMoves(board) {
        let possibleEats = [];
        let possibleMoves = [];
        // Can be spreaded with functions for each side.
        if (this.row - 1 > -1) { // Checks the upper row. 
            if (this.column - 1 > -1) {
                if (board[this.row - 1][this.column - 1].getColor() === "b")
                    possibleEats.push([this.row - 1, this.column - 1]);
                else if (board[this.row - 1][this.column - 1].getName() === "Empty")
                    possibleMoves.push([this.row - 1, this.column - 1]);
            }
            if (this.column + 1 < BOARD_LENGTH) {
                if (board[this.row - 1][this.column + 1].getColor() === "b")
                    possibleEats.push([this.row - 1, this.column + 1]);
                else if (board[this.row - 1][this.column + 1].getName() === "Empty")
                    possibleMoves.push([this.row - 1, this.column + 1]);
            }
            if (board[this.row - 1][this.column].getColor() === "b")
                possibleEats.push([this.row - 1, this.column]);
            else if (board[this.row - 1][this.column].getName() === "Empty")
                possibleMoves.push([this.row - 1, this.column]);
        }
        if (this.column - 1 > -1) { // Checks the left side
            if (board[this.row][this.column - 1].getColor() === "b")
                possibleEats.push([this.row, this.column - 1]);
            else if (board[this.row][this.column - 1].getName() === "Empty")
                possibleMoves.push([this.row, this.column - 1]);
        }
        if (this.column + 1 < BOARD_LENGTH) { // Checks the right side
            if (board[this.row][this.column + 1].getColor() === "b")
                possibleEats.push([this.row, this.column + 1]);
            else if (board[this.row][this.column + 1].getName() === "Empty")
                possibleMoves.push([this.row, this.column + 1]);
        }
        if (this.row + 1 < BOARD_LENGTH) { // Checks the bottom row. 
            if (this.column - 1 > -1) {
                if (board[this.row + 1][this.column - 1].getColor() === "b")
                    possibleEats.push([this.row + 1, this.column - 1]);
                else if (board[this.row + 1][this.column - 1].getName() === "Empty")
                    possibleMoves.push([this.row + 1, this.column - 1]);
            }
            if (this.column + 1 < BOARD_LENGTH) {
                if (board[this.row + 1][this.column + 1].getColor() === "b")
                    possibleEats.push([this.row - 1, this.column + 1]);
                else if (board[this.row + 1][this.column + 1].getName() === "Empty")
                    possibleMoves.push([this.row + 1, this.column + 1]);
            }
            if (board[this.row + 1][this.column].getColor() === "b")
                possibleEats.push([this.row + 1, this.column]);
            else if (board[this.row + 1][this.column].getName() === "Empty")
                possibleMoves.push([this.row + 1, this.column]);
        }
    }
}

class Bishop extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
    }
    showPossibleMoves(board) {

    }
}

class Empty {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.name = "Empty"
    }
    getName() {
        return this.name;
    }
    getColor() {
        return "None";
    }
}