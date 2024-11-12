import { createSlice } from "@reduxjs/toolkit/react";
import { Color } from "../../configs/types";

interface GameState {
    isGameOver: boolean;
    nbPieces: number;
    currentMove: number;
    currentRound: number;
    playerToGo: Color;
    isValidMove: boolean;
    errors: string[];
}

const initialState: GameState = {
    isGameOver: false,
    nbPieces: 32, // all available pieces of both players
    currentMove: 0,
    currentRound: 0,
    playerToGo: "white",
    isValidMove: true,
    errors: []
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {

    }
});

export default gameSlice.reducer;