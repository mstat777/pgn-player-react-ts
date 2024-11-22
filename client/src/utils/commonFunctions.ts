import { Color } from "../configs/types";
import { MoveNbWithLocation } from "../configs/interfaces";

export const capitalize = (str: string) => {
    let result = str.charAt(0).toUpperCase() + str.slice(1);
    return result;
}

export const changePlayer = (turn: Color): Color => {
    let result: Color = turn === 'white' ?  'black' : 'white';
    return result;
}

// calculate piece coordinates from piece's location data:
export const getX = (pieceLocation: string) => {
    const location: number = parseInt(pieceLocation);
    return (Math.floor(location / 10) - 1) *100 / 8;
}

export const getY = (pieceLocation: string) => {
    const location: number = parseInt(pieceLocation);
    return ((location % 10) - 1) *100 / 8;
}

// convert chess board square notation to numeric value
// replaces letters (a, b, c...) by numbers (1, 2, 3...) in 'a3', 'b6', etc...
// will be used for the square locations
export const chessNotationToNumeric = (chessNotation: string): string => {
    return (chessNotation.charCodeAt(0) - 96) + chessNotation.charAt(1);
}

// find the last location from all locations of a piece
export const getPieceLastLocation = (locationArray: MoveNbWithLocation[]): string => {
    return Object.values(locationArray.slice(-1)[0])[0];
}

// find the last location from all locations of a piece
export const getPieceBeforeLastLocation = (locationArray: MoveNbWithLocation[]): string => {
    return Object.values(locationArray.slice(-2,-1)[0])[0];
}

// find the last location from a specific move number 
export const getPieceLocationByMoveNb = (locationArray: MoveNbWithLocation[], roundNb: number) => {
    let resultIndex: number | undefined;
    const rounds: number[] = [];
    locationArray.map(loc => {
        //console.log(parseInt(Object.keys(loc)[0]));
        rounds.push(parseInt(Object.keys(loc)[0]));
    });
    //console.log(rounds);
    for (let i=rounds.length-1; i >= 0; i--){
        //console.log("rounds[i] = ",rounds[i]);
        //console.log("roundNb = ",roundNb);
        if (rounds[i] <= roundNb) {
            resultIndex = i;
            break;
        }
    }
    console.log("resultIndex = ", resultIndex);
    if (resultIndex === undefined) {
        throw new Error("Error: getPieceLocationByMoveNb!")
    }
    return (Object.values(locationArray[resultIndex])[0]);
}

// find the round number of the piece's last location
export const getPieceLastLocationRoundNb = (locationArray: MoveNbWithLocation[]): number => {
    return parseInt(Object.keys(locationArray.slice(-1)[0])[0]);
}