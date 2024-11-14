import { Color, PieceType } from "../configs/types";
import { IChessPiece, ChessPiece } from "../configs/interfaces";

type Pieces = {
    white: IChessPiece[];
    black: IChessPiece[];
}

export function initializePieces(): Pieces {
    const pieces = {
        white: new Array(16),
        black: new Array(16)
    }
    let side: Color = "white";
    let majPiecesRow: number;
    let pawnsRow: number;

    const majPiecesSet: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

    // create pieces. Iterate 2 times (white & black)
    for (let i = 0; i < 2; i++) {
        majPiecesRow = side === "black" ? 1 : 8;
        pawnsRow = side === "black" ? 2 : 7;

        // create all major pieces:
        majPiecesSet.forEach((majPiece, i) => 
            pieces[side][i] = new ChessPiece(side, majPiece, parseInt(`${i+1}${majPiecesRow}`))
        );

        // create all pawns:
        for (let i = 0; i < 8; i++){
            pieces[side][i+8] = new ChessPiece(side, "pawn", parseInt(`${i+1}${pawnsRow}`));
        }
        side = "black";
    }

    return pieces;
}