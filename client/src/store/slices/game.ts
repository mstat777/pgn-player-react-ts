import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { Color } from "../../configs/types";

type gameType = {
   statusTxt: string;
   currentMove: number;
   currentRound: number;
   playerTurn: Color;
   playerToWait: Color;
}

const initialState: gameType = {
   statusTxt: '',
   currentMove: -1,
   currentRound: 0,
   playerTurn: 'white',
   playerToWait: 'black'
}

export const gameSlice = createSlice({
   name: "game",
   initialState,
   reducers: {
      setStatusTxt: (state, action: PayloadAction<string>) => {
         state.statusTxt = action.payload;
      },
      setCurrentMove: (state, action: PayloadAction<number>) => {
         state.currentMove = action.payload;
         state.currentRound = Math.floor(action.payload/2);
      },
      setPlayerTurn: (state, action: PayloadAction<Color>) => {
         state.playerTurn = action.payload;
      },
      setPlayerToWait: (state, action: PayloadAction<Color>) => {
         state.playerToWait = action.payload;
      }
   }
});

export const {
   setStatusTxt,
   setCurrentMove,
   setPlayerTurn,
   setPlayerToWait
} = gameSlice.actions;

export default gameSlice.reducer;