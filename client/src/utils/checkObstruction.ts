import { store } from "../store/store";
import { getLastPieceLocation } from "./commonFunctions";

// check if the piece's path is obstructed by another piece
// for queens, rooks or bishops
export const checkObstruction = (startLocation: string, endLocation: string): boolean => {
    const state = store.getState();
    const { pieces } = state.chessSet;

    let moveType: 'H' | 'V' | 'D'; // horizontal, vertical or diagonal
    const start: number = parseInt(startLocation);
    const end: number = parseInt(endLocation);
    let pathLength: number = Math.abs(end - start);
    console.log("pathLength = ",pathLength);
    const squareArray: string[] = [];

    if (!pathLength) {
        throw new Error("Notation error: no moving piece found.");
    } else if (pathLength < 10) {
        moveType = 'V';  
        squareArray
    } else if (pathLength % 10 === 0) {
        moveType = 'H';
        pathLength /= 10; 
    } else if (pathLength % 10 === Math.floor(pathLength / 10)) {
        moveType = 'D';
        pathLength /= 10; 
    } else {
        throw new Error("Error: the move is neither horizontal, vertical, nor diagonal.");
    }

    console.log("pathLength = ",pathLength);

    // get the in-between square ids
    for (let i = 1; i <= pathLength; i++) {
        let direction = start < end ? 1 : -1;
        switch(moveType){
            case 'V': squareArray.push((start+i*direction).toString()); break;
            case 'H': squareArray.push((start+i*10*direction).toString()); break;
            case 'D': squareArray.push((start+i*11*direction).toString()); break;
        }
    }

    console.log(squareArray);

    // check if there is a piece located on one of the in-between squares or on the target ('endLocation') square
    squareArray.map(square => {
        pieces.white.map(piece => {
            if (piece.active && (square === getLastPieceLocation(piece.location))) {
                return true;
            }
        });
        pieces.black.map(piece => {
            if (piece.active && (square === getLastPieceLocation(piece.location))) {
                return true;
            }
        });
    });

    // if there are no obstructing pieces
    return false;
}