import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { PGNData } from "../../configs/interfaces";

const initialState: PGNData = {
   tags: {},
   moveNb: [],
   whiteMoves: [],
   blackMoves: [],
   errors: [],
   status: "",
   pgnTxt: ""
}

export const pgnDataSlice = createSlice({
   name: "pgnData",
   initialState,
   reducers: {
      setPgnData: (_state, action: PayloadAction<PGNData>) => {
         return action.payload;
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