import { createSlice } from "@reduxjs/toolkit/react";

interface PGNDataState {
    text: string;
    moveNb: number[];
    whiteMoves: string[];
    blackMoves: string[];
}

const initialState: PGNDataState = {
    text: "",
    moveNb: [],
    whiteMoves: [],
    blackMoves: []
}

export const pgnDataSlice = createSlice({
    name: "pgnData",
    initialState,
    reducers: {

    }
});

export default pgnDataSlice.reducer;