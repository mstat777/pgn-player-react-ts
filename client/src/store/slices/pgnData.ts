import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { PGNData } from "../../configs/interfaces";

const initialState: PGNData = {
   tags: {},
   nbTotalMoves: 0, // the total of half-moves ( white + black ), PlyCount
   moveNb: [], // current move number
   whiteMoves: [],
   blackMoves: [],
   comments: [],
   errors: [],
   status: "", // linked to errors
   pgnTxt: "" // when loading a png from DB
}

export const pgnDataSlice = createSlice({
   name: "pgnData",
   initialState,
   reducers: {
      setPgnData: (state, action: PayloadAction<PGNData>) => {
         return { ...state, ...action.payload };
      },
      setPgnTxt: (state, action: PayloadAction<string>) => {
         state.pgnTxt = action.payload;
      }
   }
});

export const { 
   setPgnData,
   setPgnTxt
} = pgnDataSlice.actions;

export default pgnDataSlice.reducer;