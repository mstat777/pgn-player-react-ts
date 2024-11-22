import { Color } from "../configs/types";
import { store } from "../store/store";
import { chessNotationToNumeric, 
        getLastPieceLocation,
        getBeforeLastPieceLocation } from "./commonFunctions";

type ReturnType = {
    idPiece: number;
    newLocation: string;
    capture: boolean;
    castlingLong: boolean;
    castlingShort: boolean;
}

export const getDataBackwardMove = (
    move: string,
    playerTurn: Color
): ReturnType => {
    //console.clear();
    const state = store.getState();
    const { pieces } = state.chessSet;
    console.log(pieces);
    console.log("move = ", move);

    let castlingLong = false;
    let castlingShort = false;
    let capture = false; 

    // special notation characters
    if (move.includes("x")) {
        capture = true;
        //removeImgIfCapture = true;
        move = move.replace("x", "");
        console.log("capture = ",capture);
    } 
    if (move.slice(-1) === "+") {
        //check = true; 
        move = move.slice(0, -1);
    } 
    if (move.length === 4) {
        //oneOfAPairMove = true;
    } else if (move === "O-O") {
        castlingShort = true;
    } else if (move === "O-O-O") {
        castlingLong = true;
    } 

    // store the move square location ID (ex. 'a4', 'd5')
    const squareLoc = move.slice(-2);
    // the square that a piece should be moved TO 
    // saved in numeric format (for ex.: '52' for 'e2')
    let newLocation: string = '00'; // '00' for undefined
    // the square the piece is currently located
    let currentLocation = chessNotationToNumeric(squareLoc);

    // the id of the piece that should be moved
    let idPiece: number = -1; // from 0 to 15, -1 for undefined

    // the piece moving backward is found on the current location
    for (let i=0; i < pieces[playerTurn].length; i++){
        if (getLastPieceLocation(pieces[playerTurn][i].location) === currentLocation) {
            idPiece = i;
            break;
        }
    }

    // get the previous location (before the current one) of the moving piece
    newLocation = getBeforeLastPieceLocation(pieces[playerTurn][idPiece].location);

    console.log("castlingLong = ",castlingLong);
    console.log("idPiece = ",idPiece);
    console.log("newLocation = ",newLocation);
    console.log("capture = ",capture);
    return { 
        idPiece, 
        newLocation, 
        capture, 
        castlingLong, 
        castlingShort
    }
}