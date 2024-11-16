import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { Game } from "../../configs/interfaces";

const initialState: Game = {
    isGameOver: false,
    piecesLeft: 32, // pieces left of both players
    currentMove: 0,
    currentRound: 0,
    playerTurn: "white",
    playerToWait: "black",
    isValidMove: true,
    errors: []
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setCurrentRound: (state, action: PayloadAction<number>) => {
            state.currentRound = action.payload;
        },
        changePlayer: (state) => {
            state.playerTurn = state.playerTurn === 'white' ?  'black' : 'white';
            state.playerToWait = state.playerToWait === 'white' ?  'black' : 'white';
        }
    }
});

export const {
    setCurrentRound,
    changePlayer
} = gameSlice.actions;

export default gameSlice.reducer;