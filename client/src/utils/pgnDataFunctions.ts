import { setPgnData } from "../store/slices/pgnData";
import { PGNData } from "../configs/interfaces";
import { store } from "../store/store";

// format raw PGN data from user input(textarea)
export const formatPgnData = (pgnData: string): PGNData => {
    const data = pgnData.trim();

    let newData = []; // store the moves
    let element = "";
    let previousIsSpace = false; // empty space separator

    const moveNb: string[] = [];
    const whiteMoves: string[] = [];
    const blackMoves: string[] = [];
    const errors: string[] = [];

    // split string into a data array using empty spaces
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
        switch (i % 3) {
            case 0: moveNb.push(el); break;
            case 1: whiteMoves.push(el); break;
            case 2: blackMoves.push(el); break;
            default: errors.push("An error occured while formatting the PGN data.");
        } 
    });

    return {moveNb, whiteMoves, blackMoves, errors}
}

// verify formatted PGN data
export const validatePgnData = (formattedData: PGNData): void => {
    //console.log(formattedData);
    formattedData.moveNb.forEach((moveNbTxt, i) => {
        const moveNb: number = parseInt(moveNbTxt);

        if (moveNb !== i + 1) {
            const moveChar0Nb = parseInt(moveNbTxt.charAt(0));
            if (!(moveChar0Nb >= 0 && moveChar0Nb <= 9)) {
                formattedData.errors.push("One or more of the move mumbers is not a number.");
            } else {
                formattedData.errors.push("An error was found with the moves order.");
            }
        }
        if (moveNbTxt.slice(-1) !== '.') {
            formattedData.errors.push("A dot is missing in the moves numbering.");
        }
    });
    if (!formattedData.errors.length) {
        formattedData.status = "OK. No errors found in the PNG data.";
    } else {
        formattedData.status = "Errors found in the PNG data.";
        console.log(formattedData.errors);
    }

    store.dispatch(setPgnData(formattedData));
}