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
}

class Pawn extends Piece {
    constructor(row, column, name, pieceImage, color, additionalStyles) {
        super(row, column, name, pieceImage, color, additionalStyles);
        this.isFirstMove = true;
        this.direction = this.color === "w" ? -1 : 1; // Controls which direction the pawn should move.
    }
    showPossibleMoves(board) {
        const possibleMoves = [];
        const possibleEats = [];
        // TODO: Add bounderies check
        if (this.isFirstMove) // Is it the first move?
            if (board[this.row + 2 * this.direction][this.column].getName() === "Empty")
                possibleMoves.push([this.row + 2 * this.direction, this.column]);

        this.addNearMovableCell(board, possibleMoves);
        if (this.row - 1 > -1 && this.row + 1 < BOARD_LENGTH) {
            if (this.column + 1 > -1 && board[this.row + 1 * this.direction][this.column - 1].getColor() === this.enemyColor)
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
    }
    showPossibleMoves(board) {
        const possibleMoves = [];
        const possibleEats = [];
        for (let i = this.row + 1; i < BOARD_LENGTH; i++) {
            if (board[i][this.column].getColor() !== this.enemyColor && board[i][this.column].getColor() !== "None")
                break;
            if (board[i][this.column].getColor() === this.enemyColor) {
                possibleEats.push([i, this.column]);
                break;
            } else if (board[i][this.column].getName() === "Empty")
                possibleMoves.push([i, this.column]);
        }
        for (let i = this.row - 1; i > -1; i--) {
            if (board[i][this.column].getColor() !== this.enemyColor && board[i][this.column].getColor() !== "None")
                break;
            if (board[i][this.column].getColor() === this.enemyColor) {
                possibleEats.push([i, this.column]);
                break;
            } else if (board[i][this.column].getName() === "Empty")
                possibleMoves.push([i, this.column]);
        }
        for (let i = this.column + 1; i < BOARD_LENGTH; i++) {
            if (board[this.row][i].getColor() !== this.enemyColor && board[this.row][i].getColor() !== "None")
                break;
            if (board[this.row][i].getColor() === this.enemyColor) {
                possibleEats.push([this.row, i]);
                break;
            } else if (board[this.row][i].getName() === "Empty")
                possibleMoves.push([this.row, i]);
        }
        for (let i = this.column - 1; i > -1; i--) {
            if (board[this.row][i].getColor() !== this.enemyColor && board[this.row][i].getColor() !== "None")
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
        const possibleMoves = [];
        const possibleEats = [];
        this.possibleDiagonalsMoves(board, possibleMoves, possibleEats);
        this.possibleStraightMoves(board, possibleMoves, possibleEats);
        return [possibleMoves, possibleEats];
    }
    // Inspired from the bishop logic
    possibleDiagonalsMoves(board, possibleMoves, possibleEats) {
        let i = this.row - 1, j = this.column - 1;
        while (i > -1 && j > -1) { // Top left
            if (board[i][j].getColor() !== this.enemyColor && board[i][j].getColor() !== "None")
                break;
            if (board[i][j].getColor() === this.enemyColor) {
                possibleEats.push([i, j]);
                break;
            } else if (board[i][j].getName() === "Empty")
                possibleMoves.push([i, j]);
            i--;
            j--;
        }
        i = this.row - 1;
        j = this.column + 1;
        while (i > -1 && j < BOARD_LENGTH) { // Top right
            if (board[i][j].getColor() !== this.enemyColor && board[i][j].getColor() !== "None")
                break;
            if (board[i][j].getColor() === this.enemyColor) {
                possibleEats.push([i, j]);
                break;
            } else if (board[i][j].getName() === "Empty")
                possibleMoves.push([i, j]);
            i--;
            j++;
        }
        i = this.row + 1;
        j = this.column + 1;
        while (i < BOARD_LENGTH && j < BOARD_LENGTH) { // Bottom right
            if (board[i][j].getColor() !== this.enemyColor && board[i][j].getColor() !== "None")
                break;
            if (board[i][j].getColor() === this.enemyColor) {
                possibleEats.push([i, j]);
                break;
            } else if (board[i][j].getName() === "Empty")
                possibleMoves.push([i, j]);
            i++;
            j++;
        }
        i = this.row + 1;
        j = this.column - 1;
        while (i < BOARD_LENGTH && j > -1) { // Bottom left
            if (board[i][j].getColor() !== this.enemyColor && board[i][j].getColor() !== "None")
                break;
            if (board[i][j].getColor() === this.enemyColor) {
                possibleEats.push([i, j]);
                break;
            } else if (board[i][j].getName() === "Empty")
                possibleMoves.push([i, j]);
            i++;
            j--;
        }
    }
    // Inspired from the rook logic
    possibleStraightMoves(board, possibleMoves, possibleEats) {
        for (let i = this.row + 1; i < BOARD_LENGTH; i++) {
            if (board[i][this.column].getColor() !== this.enemyColor && board[i][this.column].getColor() !== "None")
                break;
            if (board[i][this.column].getColor() === this.enemyColor) {
                possibleEats.push([i, this.column]);
                break;
            } else if (board[i][this.column].getName() === "Empty")
                possibleMoves.push([i, this.column]);
        }
        for (let i = this.row - 1; i > -1; i--) {
            if (board[i][this.column].getColor() !== this.enemyColor && board[i][this.column].getColor() !== "None")
                break;
            if (board[i][this.column].getColor() === this.enemyColor) {
                possibleEats.push([i, this.column]);
                break;
            } else if (board[i][this.column].getName() === "Empty")
                possibleMoves.push([i, this.column]);
        }
        for (let i = this.column + 1; i < BOARD_LENGTH; i++) {
            if (board[this.row][i].getColor() !== this.enemyColor && board[this.row][i].getColor() !== "None")
                break;
            if (board[this.row][i].getColor() === this.enemyColor) {
                possibleEats.push([this.row, i]);
                break;
            } else if (board[this.row][i].getName() === "Empty")
                possibleMoves.push([this.row, i]);
        }
        for (let i = this.column - 1; i > -1; i--) {
            if (board[this.row][i].getColor() !== this.enemyColor && board[this.row][i].getColor() !== "None")
                break;
            if (board[this.row][i].getColor() === this.enemyColor) {
                possibleEats.push([this.row, i]);
                break;
            } else if (board[this.row][i].getName() === "Empty")
                possibleMoves.push([this.row, i]);
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

    showPossibleMoves(board) {
        const possibleEats = [];
        const possibleMoves = [];
        for (const pos of this.possibleDirections) {
            for (const side of pos.sides) {
                if (this.row + pos["row"] < BOARD_LENGTH && this.row + pos["row"] > -1) {
                    if (this.column + side < BOARD_LENGTH && this.column + side > -1) {
                        if (board[this.row + pos["row"]][this.column + side].getColor() === this.enemyColor)
                            possibleEats.push([this.row + pos["row"], this.column + side]);
                        else if (board[this.row + pos["row"]][this.column + side].getName() === "Empty")
                            possibleMoves.push([this.row + pos["row"], this.column + side]);
                    }
                }
            }
        }
        return [possibleMoves, possibleEats];
    }
    //     showPossibleMoves(board) {
    //         const possibleMoves = [];
    //         const possibleEats = [];
    //         if (this.row + 2 < BOARD_LENGTH) {
    //             if (this.column + 1 < BOARD_LENGTH) {
    //                 if (board[this.row + 2][this.column + 1].getColor() === this.enemyColor)
    //                     possibleEats.push([this.row + 2, this.column + 1]);
    //                 else if (board[this.row + 2][this.column + 1].getName() === "Empty")
    //                     possibleMoves.push([this.row + 2, this.column + 1]);
    //             }
    //             if (this.column - 1 > -1) {
    //                 if (board[this.row + 2][this.column - 1].getColor() === this.enemyColor)
    //                     possibleEats.push([this.row + 2, this.column - 1]);
    //                 else if (board[this.row + 2][this.column - 1].getName() === "Empty")
    //                     possibleMoves.push([this.row + 2, this.column - 1]);
    //             }
    //         }
    //         if (this.row - 2 > -1) {
    //             if (this.column + 1 < BOARD_LENGTH) {
    //                 if (board[this.row - 2][this.column + 1].getColor() === this.enemyColor)
    //                     possibleEats.push([this.row - 2, this.column + 1]);
    //                 else if (board[this.row - 2][this.column + 1].getName() === "Empty")
    //                     possibleMoves.push([this.row - 2, this.column + 1]);
    //             }
    //             if (this.column - 1 > -1) {
    //                 if (board[this.row - 2][this.column - 1].getColor() === this.enemyColor)
    //                     possibleEats.push([this.row - 2, this.column - 1]);
    //                 else if (board[this.row - 2][this.column - 1].getName() === "Empty")
    //                     possibleMoves.push([this.row - 2, this.column - 1]);
    //             }
    //         }
    //         if (this.column + 2 < BOARD_LENGTH) {
    //             if (this.row + 1 < BOARD_LENGTH) {
    //                 if (board[this.row + 1][this.column + 2].getColor() === this.enemyColor)
    //                     possibleEats.push([this.row + 1, this.column + 2]);
    //                 else if (board[this.row + 1][this.column + 2].getName() === "Empty")
    //                     possibleMoves.push([this.row + 1, this.column + 2]);
    //             }
    //             if (this.row - 1 > -1) {
    //                 if (board[this.row - 1][this.column + 2].getColor() === this.enemyColor)
    //                     possibleEats.push([this.row - 1, this.column + 2]);
    //                 else if (board[this.row - 1][this.column + 2].getName() === "Empty")
    //                     possibleMoves.push([this.row - 1, this.column + 2]);
    //             }
    //         }
    //         if (this.column - 2 > -1) {
    //             if (this.row + 1 < BOARD_LENGTH) {
    //                 if (board[this.row + 1][this.column - 2].getColor() === this.enemyColor)
    //                     possibleEats.push([this.row + 1, this.column - 2]);
    //                 else if (board[this.row + 1][this.column - 2].getName() === "Empty")
    //                     possibleMoves.push([this.row + 1, this.column - 2]);
    //             }
    //             if (this.row - 1 > -1) {
    //                 if (board[this.row - 1][this.column - 2].getColor() === this.enemyColor)
    //                     possibleEats.push([this.row - 1, this.column - 2]);
    //                 else if (board[this.row - 1][this.column - 2].getName() === "Empty")
    //                     possibleMoves.push([this.row - 1, this.column - 2]);
    //             }
    //         }
    //         return [possibleMoves, possibleEats];
    //     }
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
        let i = this.row - 1, j = this.column - 1;
        while (i > -1 && j > -1) { // Top left
            if (board[i][j].getColor() !== this.enemyColor && board[i][j].getColor() !== "None")
                break;
            if (board[i][j].getColor() === this.enemyColor) {
                possibleEats.push([i, j]);
                break;
            } else if (board[i][j].getName() === "Empty")
                possibleMoves.push([i, j]);
            i--;
            j--;
        }
        i = this.row - 1;
        j = this.column + 1;
        while (i > -1 && j < BOARD_LENGTH) { // Top right
            if (board[i][j].getColor() !== this.enemyColor && board[i][j].getColor() !== "None")
                break;
            if (board[i][j].getColor() === this.enemyColor) {
                possibleEats.push([i, j]);
                break;
            } else if (board[i][j].getName() === "Empty")
                possibleMoves.push([i, j]);
            i--;
            j++;
        }
        i = this.row + 1;
        j = this.column + 1;
        while (i < BOARD_LENGTH && j < BOARD_LENGTH) { // Bottom right
            if (board[i][j].getColor() !== this.enemyColor && board[i][j].getColor() !== "None")
                break;
            if (board[i][j].getColor() === this.enemyColor) {
                possibleEats.push([i, j]);
                break;
            } else if (board[i][j].getName() === "Empty")
                possibleMoves.push([i, j]);
            i++;
            j++;
        }
        i = this.row + 1;
        j = this.column - 1;
        while (i < BOARD_LENGTH && j > -1) { // Bottom left
            if (board[i][j].getColor() !== this.enemyColor && board[i][j].getColor() !== "None")
                break;
            if (board[i][j].getColor() === this.enemyColor) {
                possibleEats.push([i, j]);
                break;
            } else if (board[i][j].getName() === "Empty")
                possibleMoves.push([i, j]);
            i++;
            j--;
        }
        return [possibleMoves, possibleEats];
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
    getImage() {
        return "none";
    }
}