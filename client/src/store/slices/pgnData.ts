import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { PGNData } from "../../configs/interfaces";

const initialState: PGNData = {
   tags: {},
   moveNb: [],
   whiteMoves: [],
   blackMoves: [],
   comments: [],
   errors: [],
   status: "",
   pgnTxt: ""
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
      },
   }
});

export const { 
   setPgnData,
   setPgnTxt
} = pgnDataSlice.actions;

export default pgnDataSlice.reducer;