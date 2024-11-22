import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { Color, SquareType, PieceType } from "../../configs/types";
import { Square, MoveNbWithLocation, IChessPiece, ChessPiece } from "../../configs/interfaces";
import { ChessSet } from "../../configs/interfaces";

type PieceModif = {
    side: Color;
    id: number;
    location: MoveNbWithLocation[];
    active: boolean;
}

const initialState: ChessSet = {
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
                    location: location.toString()
                });
            }

            state.squares = [...tempArray];
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
                majPiecesRow = side === "white" ? 1 : 8;
                pawnsRow = side === "white" ? 2 : 7;
                
                // create all major pieces:
                majPiecesSet.forEach((majPiece, i) => {
                    const initPieceLocation: MoveNbWithLocation = {0: ''};
                    initPieceLocation[0] = `${i+1}${majPiecesRow}`;
                    //console.log([initPieceLocation]);
                    tempPieces[side][i] = new ChessPiece(side, majPiece, [initPieceLocation], true);
                });

                // create all pawns:
                for (let i = 0; i < 8; i++){
                    const initPieceLocation: MoveNbWithLocation = {0: ''};
                    initPieceLocation[0] = `${i+1}${pawnsRow}`;
                    tempPieces[side][i+8] = new ChessPiece(side, "pawn", [initPieceLocation], true);
                }

                state.pieces[side] = [...tempPieces[side]];

                side = "black";
            }
        },
        setPieceData: (state, action: PayloadAction<PieceModif>) => {
            console.log(action.payload);
            return {
                ...state,
                pieces: {
                    ...state.pieces,
                    [`${action.payload.side}`]: state.pieces[`${action.payload.side}`].map((piece, i) => {
                        if (i === action.payload.id) {
                            const chessPiece = new ChessPiece(piece.color, piece.type, [...piece.location, ...action.payload.location as MoveNbWithLocation[]], action.payload.active);
                            return chessPiece;
                        };
                        return piece;
                    })
                }
            }
        }
    }
});

export const {
    initializeSquares,
    initializePieces,
    setPieceData
} = chessSetSlice.actions;

export default chessSetSlice.reducer;