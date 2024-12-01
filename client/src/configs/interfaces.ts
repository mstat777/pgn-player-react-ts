import { Color, PieceType, SquareType } from "./types";

export interface Square {
   color: SquareType
   location: string;
}

// for storing when & which square a piece has moved to
// 'key' is the move number, 'value' is the move location
export type MoveNbWithLocation = {
   [key: number]: string;
}

export interface IChessPiece {
   color: Color;
   type: PieceType;
   location: MoveNbWithLocation[];
   active: boolean;
}

export class ChessPiece {
   color;
   type;
   location;
   active;

   constructor(
      color: Color, 
      type: PieceType, 
      location: MoveNbWithLocation[],
      active: boolean
   ) {
      this.color = color;
      this.type = type;
      this.location = location || []; // location ID links the pieces and the chessboard squares, ex. 24, 47, 88
      this.active = active;
   }
}

export interface PGNData {
   tags?: TagType;
   moveNb: string[];
   whiteMoves: string[];
   blackMoves: string[];
   comments?: string[];
   errors: string[];
   status?: string;
   resultMsg?: string;
   pgnTxt?: string;
}

export type TagType = {
   [key: string]: string;
}

export interface Game {
   isGameOver: boolean;
   piecesLeft: number;
   currentMove: number;
   //currentRound: number;
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

export interface HTMLInputEvent extends Event {
   target: HTMLInputElement & EventTarget;
}