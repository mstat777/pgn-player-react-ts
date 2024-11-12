import { Color } from "../configs/types";
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

    // create pieces. Iterate 2 times (white & black)
    for (let i = 0; i < 2; i++) {
        majPiecesRow = side === "black" ? 1 : 8;
        pawnsRow = side === "black" ? 2 : 7;
        // create all major pieces
        pieces[side][0] = new ChessPiece(side, "rook", parseInt(`1${majPiecesRow}`));
        pieces[side][1] = new ChessPiece(side, "knight", parseInt(`2${majPiecesRow}`));
        pieces[side][2] = new ChessPiece(side, "bishop", parseInt(`3${majPiecesRow}`));
        pieces[side][3] = new ChessPiece(side, "queen", parseInt(`4${majPiecesRow}`));
        pieces[side][4] = new ChessPiece(side, "king", parseInt(`5${majPiecesRow}`));
        pieces[side][5] = new ChessPiece(side, "bishop", parseInt(`6${majPiecesRow}`));
        pieces[side][6] = new ChessPiece(side, "knight", parseInt(`7${majPiecesRow}`));
        pieces[side][7] = new ChessPiece(side, "rook", parseInt(`8${majPiecesRow}`));

        // create all pawns:
        for (let i = 0; i < 8; i++){
            pieces[side][i+8] = new ChessPiece(side, "pawn", parseInt(`${i+1}${pawnsRow}`));
        }
        side = "black";
    }/*
    for (let i = 0; i < 16; i++) {
        console.log(pieces[side][i]);
    }*/

    return pieces;
}