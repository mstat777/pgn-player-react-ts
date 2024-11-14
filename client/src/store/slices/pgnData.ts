import { createSlice } from "@reduxjs/toolkit/react";

interface PGNDataState {
    text: string;
    moveNb: number[];
    whiteMoves: string[];
    blackMoves: string[];
    errors: string[];
}

const initialState: PGNDataState = {
    text: "",
    moveNb: [],
    whiteMoves: [],
    blackMoves: [],
    errors: []
}

export const pgnDataSlice = createSlice({
    name: "pgnData",
    initialState,
    reducers: {
        formatData: (state, action) => {
            const data = action.payload.trim();

            let newData = []; // store the moves
            let element = "";
            let previousIsSpace = false; // empty space separator

            for (let i = 0; i < data.length; i++) {
                if (data.charAt(i) !== " ") {
                    element += data.charAt(i);
                    previousIsSpace && (previousIsSpace = false);
                    i === data.length - 1 && newData.push(element);
                } else if (data.charAt(i) === " ") {
                    if (!previousIsSpace) {
                        newData.push(element);
                        element = "";
                        previousIsSpace = true;
                    }
                }
            }
            console.log(newData);

            //split the moves according to player
            newData.forEach((el, i) => {
                //console.log(el);
                switch (i % 3) {
                    case 0: state.moveNb.push(parseInt(el)); break;
                    case 1: state.whiteMoves.push(el); break;
                    case 2: state.blackMoves.push(el); break;
                    default: state.errors.push("An error occured while formatting the PGN data.");
                } 
            });
            console.log(state.moveNb);
            console.log(state.whiteMoves);
            console.log(state.blackMoves);
        }
    }
});

export default pgnDataSlice.reducer;