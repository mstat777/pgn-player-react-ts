import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { PGNData } from "../../configs/interfaces";

const initialState: PGNData = {
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
            state.moveNb = action.payload.moveNb;
            state.whiteMoves = action.payload.whiteMoves;
            state.blackMoves = action.payload.blackMoves;
            state.errors = action.payload.errors;
            state.status = action.payload.status;
        }
    }
});

export const { 
    setPgnData
} = pgnDataSlice.actions;

export default pgnDataSlice.reducer;