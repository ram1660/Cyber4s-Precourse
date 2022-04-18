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
        let possibleMoves = [];
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
        return possibleMoves;
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
        let possibleMoves = [];
        let possibleEats = [];
        // Possible duplicated code
        if (this.color === "w") {
            for (let i = this.row; i < board.length; i++) {
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
            for (let i = this.column; i < board.length; i++) {
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
        }else{
            for (let i = this.row; i < board.length; i++) {
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
            for (let i = this.column; i < board.length; i++) {
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
    possibleDiagonalsMoves(board){

    }
    possibleStraightMoves(board){

    }
}

class Knight extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
    }
    showPossibleMoves(board) {
        let possibleMoves = [];
        let possibleEats = [];
        try {
            if(board[this.row + 2][this.column + 1].getName() === "b")
                possibleMoves.push([this.row + 2, this.column + 1]);
            // if()
        } catch (outOfBounderies) {
            
        }
    }
}

class King extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
    }
    showPossibleMoves(board) {

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
}