import { Color, PieceType, SquareType } from "./types";

export interface Square {
    color: SquareType
    location: number;
}

export interface IChessPiece {
    color: Color;
    type: PieceType;
    location: number;
    active: boolean;
}

export class ChessPiece implements IChessPiece {
    color;
    type;
    location;
    active;

    constructor(
        color: Color, 
        type: PieceType, 
        location: number
    ) {
        this.color = color;
        this.type = type;
        this.location = location; // location ID links the pieces and the chessboard squares, ex. 24, 47, 88
        this.active = true;
    }
}