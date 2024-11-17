import { Color, PieceType, SquareType } from "./types";

export interface Square {
    color: SquareType
    location: string;
}

export interface IChessPiece {
    color: Color;
    type: PieceType;
    location?: string;
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
        location: string | undefined,
        active: boolean | undefined
    ) {
        this.color = color;
        this.type = type;
        this.location = location; // location ID links the pieces and the chessboard squares, ex. 24, 47, 88
        this.active = active;
    }
}

export interface PGNData {
    moveNb: string[];
    whiteMoves: string[];
    blackMoves: string[];
    errors: string[];
    status?: string;
    tags?: {
        event?: string;
        site?: string;
        date?: string;
        round?: string;
        white?: string;
        black?: string;
        result?: string;
        // optional:
        annotator?: string;
        plyCount?: string;
        timeControl?: string;
        time?: string;
        termination?: string;
        mode?: string;
        fen?: string;
        whiteElo?: string;
        blackElo?: string;
    }
}

export interface ITag {
    key: string;
    value: string;
}

export class Tag implements ITag {
    key;
    value;

    constructor (){
        this.key = '';
        this.value = '';
    }

    setKey(value: string) {
        this.key += value;
    }
    setValue(value: string) {
        this.value += value;
    }
    reset() {
        this.key = '';
        this.value = '';
    }
}

export interface Game {
    isGameOver: boolean;
    piecesLeft: number;
    currentMove: number;
    currentRound: number;
    playerTurn: Color;
    playerToWait: Color;
    isValidMove: boolean;
    errors: string[];
}

export interface ChessSet {
    squares: Square[];
    pieces: {
        white: IChessPiece[],
        black: IChessPiece[]
    };
}