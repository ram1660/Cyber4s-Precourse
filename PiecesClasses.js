class Pawn extends Piece {
    constructor(row, column, pieceImage, color, styles) {
        super(row, column, pieceImage, color, styles);


    }
}

class Piece {
    constructor(row, column, pieceImage, color, styles) {
        this.row = row;
        this.column = column;
        this.pieceImage = pieceImage;
        this.styles = styles;
        this.color = color;
    }
}

class Rook extends Piece {
    constructor(row, column, pieceImage, color, styles) {
        super(row, column, pieceImage, color, styles);

    }
}
class Queen extends Piece {
    constructor(row, column, pieceImage, color, styles) {
        super(row, column, pieceImage, color, styles);


    }
}

class Knight extends Piece {
    constructor(row, column, pieceImage, color, styles) {
        super(row, column, pieceImage, color, styles);


    }
}

class King extends Piece {
    constructor(row, column, pieceImage, color, styles) {
        super(row, column, pieceImage, color, styles);


    }
}