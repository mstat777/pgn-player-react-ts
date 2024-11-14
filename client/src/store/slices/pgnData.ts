import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";

interface PGNDataState {
    text: string;
    moveNb: string[];
    whiteMoves: string[];
    blackMoves: string[];
    errors: string[];
    status: string;
}

const initialState: PGNDataState = {
    text: "",
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
        formatData: (state, action: PayloadAction<string>) => {
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

            //split the moves according to player
            newData.forEach((el, i) => {
                //console.log(el);
                switch (i % 3) {
                    case 0: state.moveNb.push(el); break;
                    case 1: state.whiteMoves.push(el); break;
                    case 2: state.blackMoves.push(el); break;
                    default: state.errors.push("An error occured while formatting the PGN data.");
                } 
            });
        },
        validateData: (state) => {
            state.moveNb.forEach((moveNbTxt, i) => {
                const moveNb: number = parseInt(moveNbTxt);
                //console.log("move = "+move+" "+ i);
                if (moveNb !== i + 1) {
                    const moveChar0Nb = parseInt(moveNbTxt.charAt(0));
                    if (!(moveChar0Nb >= 0 && moveChar0Nb <= 9)) {
                        state.errors = [ ...state.errors, "One or more of the move mumbers is not a number."];
                    } else {
                        state.errors = [ ...state.errors, "An error was found with the moves order."];
                    }
                }
                if (moveNbTxt.slice(-1) !== '.') {
                    state.errors = [ ...state.errors, "A dot is missing in the moves numbering."];
                }
            });
            if (!state.errors.length) {
                state.status = "OK. No errors found in the PNG data.";
            } else {
                state.status = "Errors found in the PNG data.";
            }
        },
        resetData: (state) => {
            return initialState;
        }
    }
});

export const { 
    formatData,
    validateData
} = pgnDataSlice.actions;

export default pgnDataSlice.reducer;