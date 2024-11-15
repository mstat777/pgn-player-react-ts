import { Color, PieceType, SquareType } from "./types";

export interface Square {
    color: SquareType
    location: number;
}

export interface IChessPiece {
    color: Color;
    type: PieceType;
    location: number;
    active?: boolean;
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

export interface PGNData {
    moveNb: string[];
    whiteMoves: string[];
    blackMoves: string[];
    errors: string[];
    status?: string;
}

export interface Game {
    isGameOver: boolean;
    piecesLeft: number;
    currentMove: number;
    currentRound: number;
    playerTurn: Color;
    isValidMove: boolean;
    errors: string[];
}

export interface ChessSet {
    board: [];
    squares: Square[];
    pieces: {
        white: IChessPiece[],
        black: IChessPiece[]
    };
}