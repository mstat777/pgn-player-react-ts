import { createSlice } from "@reduxjs/toolkit/react";
import { Square, IChessPiece } from "../../configs/interfaces";
import { initializePieces } from "../../utils/initializePieces";
import { initializeSquares } from "../../utils/initializeSquares";

interface ChessboardState {
    board: [];
    squares: Square[];
    pieces: {
        white: IChessPiece[],
        black: IChessPiece[]
    };
}

const initialState: ChessboardState = {
    board: [

    ],
    squares: initializeSquares(),
    pieces: initializePieces()
}

export const chessboardSlice = createSlice({
    name: "chessboard",
    initialState,
    reducers: {

    }
});

export default chessboardSlice.reducer;