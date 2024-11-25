import { Color } from "../configs/types";

type CastlingReturn = {
    kingLocation: string;
    rookLocation: string;
    castlingShort: boolean;
    castlingLong: boolean;
}

export const castling = (
    castlingShort: boolean, 
    castlingLong: boolean, 
    playerTurn: Color,
    isPlayingForward: boolean
): CastlingReturn => {

    let kingLocation: string;
    let rookLocation: string;
   
    if (isPlayingForward) {
        if (castlingShort) {
            castlingShort = false; // initialize the variable
            kingLocation = playerTurn === "white" ? "71" : "78";
            rookLocation = playerTurn === "white" ? "61" : "68";
        } else {
            castlingLong = false; // initialize the variable
            kingLocation = playerTurn === "white" ? "31" : "38";
            rookLocation = playerTurn === "white" ? "41" : "48";
        }
    } else {
        // when rewind (moving backward)
        kingLocation = playerTurn === "white" ? "51" : "58";
        if (castlingShort) {
            castlingShort = false; // initialize the variable 
            rookLocation = playerTurn === "white" ? "81" : "88";
        } else {
            castlingLong = false; // initialize the variable
            rookLocation = playerTurn === "white" ? "11" : "18";
        }
    }

    return { 
        kingLocation, 
        rookLocation,
        castlingShort,
        castlingLong
    }
}