import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { Color } from "../../configs/types";

type gameType = {
   statusTxt: string;
   isGameOver: boolean;
   isPlayingForward: boolean;
   areMovesLoaded: boolean;
   currentMove: number;
   currentRound: number;
   playerTurn: Color;
   playerToWait: Color;
}

const initialState: gameType = {
   statusTxt: '',
   isGameOver: false,
   isPlayingForward: true,
   areMovesLoaded: false,
   currentMove: -1,
   currentRound: -1,// 0,
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
      setIsGameOver: (state, action: PayloadAction<boolean>) => {
         state.isGameOver = action.payload;
      },
      setIsPlayingForward: (state, action: PayloadAction<boolean>) => {
         state.isPlayingForward = action.payload;
      },
      setAreMovesLoaded: (state, action: PayloadAction<boolean>) => {
         state.areMovesLoaded = action.payload;
      },
      setCurrentMove: (state, action: PayloadAction<number>) => {
         state.currentMove = action.payload;
         //state.currentRound = action.payload > 0 ? Math.floor(action.payload/2) : 0;
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
   setIsGameOver,
   setIsPlayingForward,
   setAreMovesLoaded,
   setCurrentMove,
   setPlayerTurn,
   setPlayerToWait
} = gameSlice.actions;

export default gameSlice.reducer;