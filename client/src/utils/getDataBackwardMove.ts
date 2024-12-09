import { Color } from "../configs/types";
import { store } from "../store/store";
import { chessNotationToNumeric,
        getLocationByRoundNb } from "./commonFunctions";

type ReturnType = {
    idPiece: number;
    currentLocation: string;
    newLocation: string;
    capture: boolean;
    castlingLong: boolean;
    castlingShort: boolean;
}

export const getDataBackwardMove = (
    move: string,
    playerTurn: Color,
    roundNb: number
): ReturnType => {
    //console.clear();
    const state = store.getState();
    const { pieces } = state.chessSet;
    console.log(pieces);
    console.log("move = ", move);
    console.log("playerTurn = ", playerTurn);
    console.log("roundNb = ", roundNb);

    // the id of the piece that should be moved
    let idPiece: number = -1; // from 0 to 15, -1 for undefined
    // store the move square location ID (ex. 'a4', 'd5')
    const squareLoc = move.slice(-2);
    // the square the piece is currently located
    let currentLocation = chessNotationToNumeric(squareLoc);
    console.log("currrent Loc = ",currentLocation);
    // the square that a piece should be moved TO 
    // saved in numeric format (for ex.: '52' for 'e2')
    let newLocation: string = '00'; // '00' for undefined

    let capture = false; 
    let castlingLong = false;
    let castlingShort = false;

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
    if (move === "O-O") {
        castlingShort = true;
    }
    if (move === "O-O-O") {
        castlingLong = true;
    } 
    
    if (!castlingShort && !castlingLong){
        // the piece moving backward is found on the current location
        for (let i=0; i < 16; i++){
            console.log("last piece Loc = ", getLocationByRoundNb(pieces[playerTurn][i].location, roundNb+1));
            console.log("currrent Loc = ",currentLocation);
            console.log("roundNb+1 = ",roundNb+1);
            if (getLocationByRoundNb(pieces[playerTurn][i].location, roundNb+1) === currentLocation) {
                idPiece = i;
                console.log("pieceID moving back = ", idPiece);
                break;
            }
        }

        console.log(pieces[playerTurn][idPiece]);
        // get the previous location (before the current one) of the moving piece
        newLocation = getLocationByRoundNb(pieces[playerTurn][idPiece].location, roundNb);

        console.log("castlingLong = ",castlingLong);
        console.log("idPiece = ",idPiece);
        console.log("newLocation = ",newLocation);
        console.log("capture = ",capture);
    }

    return { 
        idPiece, 
        currentLocation,
        newLocation, 
        capture, 
        castlingLong, 
        castlingShort
    }
}