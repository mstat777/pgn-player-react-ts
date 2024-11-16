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
    playerTurn: Color
): CastlingReturn => {

    let kingLocation: string;
    let rookLocation: string;
   
    if (castlingShort) {
        castlingShort = false;
        kingLocation = playerTurn === "white" ? "71" : "78";
        rookLocation = playerTurn === "white" ? "61" : "68";

    } else {
        castlingLong = false;
        kingLocation = playerTurn === "white" ? "31" : "38";
        rookLocation = playerTurn === "white" ? "41" : "48";
    }

    return { 
        kingLocation, 
        rookLocation,
        castlingShort,
        castlingLong
    }
}