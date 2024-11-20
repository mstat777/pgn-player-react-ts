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
export const getLastPieceLocation = (locationArray: MoveNbWithLocation[]): string => {
    return Object.values(locationArray.slice(-1)[0])[0];
}