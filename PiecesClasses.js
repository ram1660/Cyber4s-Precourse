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
}

class Pawn extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
        this.isFirstMove = true;
    }
    showPossibleMoves(board) {
        const possibleMoves = [];
        const possibleEats = [];
        // TODO: Add bounderies check
        if (this.isFirstMove) { // Is it the first move?
            if (this.color === "w") {
                this.addNearMovableCell(board);
                if (board[this.row - 2][this.column].getName() !== "Empty") return possibleMoves;
                possibleMoves.push([this.row - 2, this.column]);
            } else {
                this.addNearMovableCell(board);
                if (board[this.row + 2][this.column].getName() !== "Empty") return possibleMoves;
                possibleMoves.push([this.row + 2, this.column]);
            }
        } else { // Is it the second move?
            if (this.color === "w")
                this.addNearMovableCell(board);
            else
                this.addNearMovableCell(board);
        }
        if (this.color === "w") {
            if (this.row - 1) { // White eat
                if (this.column - 1 > -1 && board[this.row - 1][this.column - 1] === this.enemyColor)
                    possibleEats.push([this.row - 1, this.column - 1]);
                if (this.column + 1 < BOARD_LENGTH && board[this.row - 1][this.column + 1] === this.enemyColor)
                    possibleEats.push([this.row - 1, this.column + 1]);
            }
        }else{
            if (this.row + 1) { // Black eat
                if (this.column - 1 > -1 && board[this.row - 1][this.column - 1] === this.enemyColor)
                    possibleEats.push([this.row - 1, this.column - 1]);
                if (this.column + 1 < BOARD_LENGTH && board[this.row - 1][this.column + 1] === this.enemyColor)
                    possibleEats.push([this.row - 1, this.column + 1]);
            }
        }
        return [possibleMoves, possibleEats];
    }
    addNearMovableCell(board) {
        if (this.color === "w") {
            if (board[this.row - 1][this.column].getName() !== "Empty") return possibleMoves;
            possibleMoves.push([this.row - 1, this.column]);
        } else {
            if (board[this.row + 1][this.column].getName() !== "Empty") return possibleMoves;
            possibleMoves.push([this.row + 1, this.column]);
        }
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
        for (let i = this.row + 1; i < BOARD_LENGTH; i++) {
            if (board[i][this.column].getColor() !== this.enemyColor)
                break;
            if (board[i][this.column].getColor() === this.enemyColor) {
                possibleEats.push([i, this.column]);
                break;
            } else if (board[i][this.column].getName() === "Empty")
                possibleMoves.push([i, this.column]);
        }
        for (let i = this.row - 1; i > -1; i--) {
            if (board[i][this.column].getColor() !== this.enemyColor)
                break;
            if (board[i][this.column].getColor() === this.enemyColor) {
                possibleEats.push([i, this.column]);
                break;
            } else if (board[i][this.column].getName() === "Empty")
                possibleMoves.push([i, this.column]);
        }
        for (let i = this.column + 1; i < BOARD_LENGTH; i++) {
            if (board[this.row][i].getColor() !== this.enemyColor)
                break;
            if (board[this.row][i].getColor() === this.enemyColor) {
                possibleEats.push([this.row, i]);
                break;
            } else if (board[this.row][i].getName() === "Empty")
                possibleMoves.push([this.row, i]);
        }
        for (let i = this.column - 1; i > -1; i--) {
            if (board[this.row][i].getColor() !== this.enemyColor)
                break;
            if (board[this.row][i].getColor() === this.enemyColor) {
                possibleEats.push([this.row, i]);
                break;
            } else if (board[this.row][i].getName() === "Empty")
                possibleMoves.push([this.row, i]);
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
        if (this.row + 2 < BOARD_LENGTH) {
            if (this.column + 1 < BOARD_LENGTH) {
                if (board[this.row + 2][this.column + 1].getColor() === this.enemyColor)
                    possibleEats.push([this.row + 2, this.column + 1]);
                else if (board[this.row + 2][this.column + 1].getName() === "Empty")
                    possibleMoves.push([this.row + 2, this.column + 1]);
            }
            if (this.column - 1 > -1) {
                if (board[this.row + 2][this.column - 1].getColor() === this.enemyColor)
                    possibleEats.push([this.row + 2, this.column - 1]);
                else if (board[this.row + 2][this.column - 1].getName() === "Empty")
                    possibleMoves.push([this.row + 2, this.column - 1]);
            }
        }
        if (this.row - 2 > -1) {
            if (this.column + 1 < BOARD_LENGTH) {
                if (board[this.row - 2][this.column + 1].getColor() === this.enemyColor)
                    possibleEats.push([this.row - 2, this.column + 1]);
                else if (board[this.row - 2][this.column + 1].getName() === "Empty")
                    possibleMoves.push([this.row - 2, this.column + 1]);
            }
            if (this.column - 1 > -1) {
                if (board[this.row - 2][this.column - 1].getColor() === this.enemyColor)
                    possibleEats.push([this.row - 2, this.column - 1]);
                else if (board[this.row - 2][this.column - 1].getName() === "Empty")
                    possibleMoves.push([this.row - 2, this.column - 1]);
            }
        }
        if (this.column + 2 < BOARD_LENGTH) {
            if (this.row + 1 < BOARD_LENGTH) {
                if (board[this.row + 1][this.column + 2].getColor() === this.enemyColor)
                    possibleEats.push([this.row + 1, this.column + 2]);
                else if (board[this.row + 1][this.column + 2].getName() === "Empty")
                    possibleMoves.push([this.row + 1, this.column + 2]);
            }
            if (this.row - 1 > -1) {
                if (board[this.row - 1][this.column + 2].getColor() === this.enemyColor)
                    possibleEats.push([this.row - 1, this.column + 2]);
                else if (board[this.row - 1][this.column + 2].getName() === "Empty")
                    possibleMoves.push([this.row - 1, this.column + 2]);
            }
        }
        if (this.column - 2 > -1) {
            if (this.row + 1 < BOARD_LENGTH) {
                if (board[this.row + 1][this.column - 2].getColor() === this.enemyColor)
                    possibleEats.push([this.row + 1, this.column - 2]);
                else if (board[this.row + 1][this.column - 2].getName() === "Empty")
                    possibleMoves.push([this.row + 1, this.column - 2]);
            }
            if (this.row - 1 > -1) {
                if (board[this.row - 1][this.column - 2].getColor() === this.enemyColor)
                    possibleEats.push([this.row - 1, this.column - 2]);
                else if (board[this.row - 1][this.column - 2].getName() === "Empty")
                    possibleMoves.push([this.row - 1, this.column - 2]);
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
        const possibleEats = [];
        const possibleMoves = [];
        // Can be spreaded with functions for each side.
        if (this.row - 1 > -1) { // Checks the upper row. 
            if (this.column - 1 > -1) {
                if (board[this.row - 1][this.column - 1].getColor() === this.enemyColor)
                    possibleEats.push([this.row - 1, this.column - 1]);
                else if (board[this.row - 1][this.column - 1].getName() === "Empty")
                    possibleMoves.push([this.row - 1, this.column - 1]);
            }
            if (this.column + 1 < BOARD_LENGTH) {
                if (board[this.row - 1][this.column + 1].getColor() === this.enemyColor)
                    possibleEats.push([this.row - 1, this.column + 1]);
                else if (board[this.row - 1][this.column + 1].getName() === "Empty")
                    possibleMoves.push([this.row - 1, this.column + 1]);
            }
            if (board[this.row - 1][this.column].getColor() === this.enemyColor)
                possibleEats.push([this.row - 1, this.column]);
            else if (board[this.row - 1][this.column].getName() === "Empty")
                possibleMoves.push([this.row - 1, this.column]);
        }
        if (this.column - 1 > -1) { // Checks the left side
            if (board[this.row][this.column - 1].getColor() === this.enemyColor)
                possibleEats.push([this.row, this.column - 1]);
            else if (board[this.row][this.column - 1].getName() === "Empty")
                possibleMoves.push([this.row, this.column - 1]);
        }
        if (this.column + 1 < BOARD_LENGTH) { // Checks the right side
            if (board[this.row][this.column + 1].getColor() === this.enemyColor)
                possibleEats.push([this.row, this.column + 1]);
            else if (board[this.row][this.column + 1].getName() === "Empty")
                possibleMoves.push([this.row, this.column + 1]);
        }
        if (this.row + 1 < BOARD_LENGTH) { // Checks the bottom row. 
            if (this.column - 1 > -1) {
                if (board[this.row + 1][this.column - 1].getColor() === this.enemyColor)
                    possibleEats.push([this.row + 1, this.column - 1]);
                else if (board[this.row + 1][this.column - 1].getName() === "Empty")
                    possibleMoves.push([this.row + 1, this.column - 1]);
            }
            if (this.column + 1 < BOARD_LENGTH) {
                if (board[this.row + 1][this.column + 1].getColor() === this.enemyColor)
                    possibleEats.push([this.row - 1, this.column + 1]);
                else if (board[this.row + 1][this.column + 1].getName() === "Empty")
                    possibleMoves.push([this.row + 1, this.column + 1]);
            }
            if (board[this.row + 1][this.column].getColor() === this.enemyColor)
                possibleEats.push([this.row + 1, this.column]);
            else if (board[this.row + 1][this.column].getName() === "Empty")
                possibleMoves.push([this.row + 1, this.column]);
        }
        return [possibleMoves, possibleEats];
    }
}

class Bishop extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
    }
    showPossibleMoves(board) {
        const possibleEats = [];
        const possibleMoves = [];
        for (let i = this.row - 1; i > -1; i--) { // Top left
            for (let j = this.column - 1; i > -1; i--) {
                if (board[i][j].getColor() !== this.enemyColor)
                    break;
                if (board[i][j].getColor() === this.enemyColor) {
                    possibleEats.push([i, j]);
                    break;
                } else if (board[i][j].getName() === "Empty")
                    possibleMoves.push([i, j]);
            }
        }
        for (let i = this.row - 1; i > -1; i--) { // Top right
            for (let j = this.column + 1; i < BOARD_LENGTH; i--) {
                if (board[i][j].getColor() !== this.enemyColor)
                    break;
                if (board[i][this.column].getColor() === this.enemyColor) {
                    possibleEats.push([i, j]);
                    break;
                } else if (board[i][j].getName() === "Empty")
                    possibleMoves.push([i, j]);
            }
        }
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