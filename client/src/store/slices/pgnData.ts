import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { PGNData } from "../../configs/interfaces";

const initialState: PGNData = {
    tags: {},
    moveNb: [],
    whiteMoves: [],
    blackMoves: [],
    errors: [],
    status: ""
}

export const pgnDataSlice = createSlice({
    name: "pgnData",
    initialState,
    reducers: {
        setPgnData: (state, action: PayloadAction<PGNData>) => {
            return action.payload;
        }
    }
});

export const { 
    setPgnData
} = pgnDataSlice.actions;

export default pgnDataSlice.reducer;