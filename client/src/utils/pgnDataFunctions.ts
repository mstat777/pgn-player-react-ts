import { setPgnData } from "../store/slices/pgnData";
import { PGNData, ITag, Tag } from "../configs/interfaces";
import { store } from "../store/store";

// format raw PGN data from user input(textarea)
export const formatPgnData = (pgnData: string): PGNData => {
    const data = pgnData.trim();

    let tag = new Tag();
    let movesArray = []; // store all the extracted moves
    let move = "";
    let previousIsSpace = false; // empty space separator
    let isTag = false; // for writing a tag (key & value)
    let isTagValue = false; // for writing a tag's value
    let isWritingMoves = false; // indicate moves part of the data

    const tags: ITag[] = [];
    const moveNb: string[] = [];
    const whiteMoves: string[] = [];
    const blackMoves: string[] = [];
    const errors: string[] = [];

    for (let i = 0; i < data.length; i++) {
        // check if there are tags in the beginning if the PNG
        if (!isWritingMoves) {
            if (data.charAt(i) === "[") {
                isTag = true;
            } else if (data.charAt(i) === "]") {
                if (isTag) {
                    console.log("tagKey = ", tag.key);//tagKey);

                    tags.push(tag);
                    tag = new Tag();
                    isTag = false;
                } else {
                    errors.push("Unexpected character found: ']' (closing square bracket)");
                }
            } else if (data.charAt(i) === "\"") {
                if (isTag) { 
                    if (!isTagValue) {
                        isTagValue = true;
                    } else {
                        isTagValue = false;
                    }
                } else {
                    errors.push("Unexpected character found: \" (quotes)");
                }
            } else if (data.charAt(i) === " ") {
                if (isTag) {
                    if (isTagValue) {
                        tag.setValue(data.charAt(i));
                    }
                }
            } else if ( data.charAt(i) === "1" && !isTag) {
                isWritingMoves = true;
                move += data.charAt(i); // start writing move
            } else { // any other character
                if (isTag) {
                    if (isTagValue) {
                        tag.setValue(data.charAt(i));
                    } else {
                        tag.setKey(data.charAt(i));
                    }
                } else {
                    errors.push("Unexpected character found: data.charAt(i)");
                }
            }
        }
       
        // if there are NO tags, or tags already written,
        // => extract moves data into an array using empty spaces
        else if (isWritingMoves) {
            if (data.charAt(i) !== " ") {
                move += data.charAt(i);
                previousIsSpace && (previousIsSpace = false);
                i === data.length - 1 && movesArray.push(move);
            } else if (data.charAt(i) === " ") {
                if (!previousIsSpace) {
                    movesArray.push(move);
                    move = "";
                    previousIsSpace = true;
                }
            }
        }
    }
    // if TAGS found, pass all tags' keys in lowercase

    console.log(movesArray);
    // if NO errors found while formatting,
    // => split the moves according to player
    if (!errors.length) {
        movesArray.forEach((el, i) => {
            switch (i % 3) {
                case 0: moveNb.push(el); break;
                case 1: whiteMoves.push(el); break;
                case 2: blackMoves.push(el); break;
                default: errors.push("An error occured while formatting the PGN data. (#SplitMovesError)");
            } 
        });
    }

    return {tags, moveNb, whiteMoves, blackMoves, errors}
}

// verify formatted PGN data
export const validatePgnData = (formattedData: PGNData): void => {
    // write moves, only if NO errors found while formatting
    if (!formattedData.errors.length) {
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
    }

    store.dispatch(setPgnData(formattedData));
}