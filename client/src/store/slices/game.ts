import { createSlice } from "@reduxjs/toolkit/react";
import { Color } from "../../configs/types";

interface GameState {
    isGameOver: boolean;
    nbPieces: number;
    currentMove: number;
    currentRound: number;
    playerTurn: Color;
    isValidMove: boolean;
    errors: string[];
}

const initialState: GameState = {
    isGameOver: false,
    nbPieces: 32, // all available pieces of both players
    currentMove: 0,
    currentRound: 0,
    playerTurn: "white",
    isValidMove: true,
    errors: []
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setPlayerTurn: (state) => {
            state.playerTurn = state.playerTurn === 'white' ?  'black' : 'white';
        }, 
        resetGame: (state) => {
            
        }, 
    }
});

export default gameSlice.reducer;