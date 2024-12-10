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

export interface SetPiece {
   color: Color;
   type?: PieceType;
   location: MoveNbWithLocation[];
   deactivated?: number;
   id: number;
}

export interface IChessPiece {
   color: Color;
   type: PieceType;
   location: MoveNbWithLocation[];
   deactivated: number;
   promotion?: number;
}

export class ChessPiece {
   color;
   type;
   location;
   deactivated;
   promotion;

   constructor(
      color: Color, 
      type: PieceType, 
      location: MoveNbWithLocation[],
      deactivated?: number,
      promotion?: number
   ) {
      this.color = color;
      this.type = type;
      this.location = location || []; // location ID links the pieces and the chessboard squares, ex. 24, 47, 88
      // if a piece is active, it has the default value '1000'
      // otherwise if it's captured (deactivated), the value represents the round in which the piece has been captured
      // value different from '1000' means that the piece has been captured
      this.deactivated = deactivated ? deactivated : 1000;
      if (promotion){
         this.promotion = promotion;
      }
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