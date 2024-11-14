import { createSlice } from "@reduxjs/toolkit/react";
import { Color, SquareType, PieceType } from "../../configs/types";
import { Square, IChessPiece, ChessPiece } from "../../configs/interfaces";

interface ChessSetState {
    board: [];
    squares: Square[];
    pieces: {
        white: IChessPiece[],
        black: IChessPiece[]
    };
}

const initialState: ChessSetState = {
    board: [],
    squares: [],
    pieces: {
        white: [],
        black: []
    }
}

export const chessSetSlice = createSlice({
    name: "chessSet",
    initialState,
    reducers: {
        initializeSquares: (state) => {
            const tempArray: Square[] = [];

            for (let i = 0; i < 64; i++) {
                const location = (Math.floor((63 - i) / 8) + 1)*10 + i % 8 + 1;
                let color: SquareType;
        
                if (Math.floor(i / 8) % 2 === 0) { 
                    // even row
                    color = i % 2 === 0 ? 'light' : 'dark';
                } else {
                    // odd row
                    color = i % 2 === 0 ? 'dark' : 'light';
                }
        
                tempArray.push({
                    color: color, 
                    location: location
                });
            }

            state.squares = [...tempArray]
        },
        initializePieces: (state) => {
            let side: Color = "white";
            let majPiecesRow: number;
            let pawnsRow: number;
            const tempPieces: {
                white: IChessPiece[],
                black: IChessPiece[]
            } = {
                white: [],
                black: []
            }

            const majPiecesSet: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

            // create pieces. Iterate 2 times (white & black)
            for (let i = 0; i < 2; i++) {
                majPiecesRow = side === "black" ? 1 : 8;
                pawnsRow = side === "black" ? 2 : 7;
                let location: number;

                // create all major pieces:
                majPiecesSet.forEach((majPiece, i) => {
                    location = parseInt(`${i+1}${majPiecesRow}`);
                    tempPieces[side][i] = new ChessPiece(side, majPiece, location);
                });

                // create all pawns:
                for (let i = 0; i < 8; i++){
                    location = parseInt(`${i+1}${pawnsRow}`);
                    tempPieces[side][i+8] = new ChessPiece(side, "pawn", location);
                }

                state.pieces[side] = [...tempPieces[side]];

                side = "black";
            }
        }
    }
});

export const {
    initializeSquares,
    initializePieces
} = chessSetSlice.actions;

export default chessSetSlice.reducer;