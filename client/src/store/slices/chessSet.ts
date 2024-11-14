import { createSlice } from "@reduxjs/toolkit/react";
import { Square, IChessPiece } from "../../configs/interfaces";
import { initializePieces } from "../../utils/initializePieces";
import { initializeSquares } from "../../utils/initializeSquares";

interface ChessSetState {
    board: [];
    squares: Square[];
    pieces: {
        white: IChessPiece[],
        black: IChessPiece[]
    };
}

const initialState: ChessSetState = {
    board: [

    ],
    squares: initializeSquares(),
    pieces: initializePieces()
}

export const chessSetSlice = createSlice({
    name: "chessSet",
    initialState,
    reducers: {

    }
});

export default chessSetSlice.reducer;