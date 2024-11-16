import { Color } from "../configs/types";
import { store } from "../store/store";

type ReturnType = {
    idPiece: number | undefined;
    newLocation: string;
    capture: boolean;
    castlingLong: boolean;
    castlingShort: boolean;
}

export const movePiece = (
    move: string,
    playerTurn: Color
): ReturnType => {
    //console.clear();
    const state = store.getState();
    const { pieces } = state.chessSet;

    let castlingLong = false;
    let castlingShort = false;
    let capture = false; 
    let check = false;
    let checkmate = false;
    let draw = false;
    let oneOfAPairMove = false;

    // special notation characters
    if (move.includes("x")) {
        capture = true;
        //removeImgIfCapture = true;
        move = move.replace("x", "");
        console.log("capture = ",capture);
    } 
    if (move.slice(-1) === "+") {
        check = true; 
        move = move.slice(0, -1);
    } 
    if (move.length === 4) {
        oneOfAPairMove = true;
    } else if (move === "O-O") {
        castlingShort = true;
    } else if (move === "O-O-O") {
        castlingLong = true;
    } 
    
    // store the move square location ID (ex. 'a4', 'd5')
    const squareLoc = move.slice(-2);
    // the square that a piece should be moved TO
    let newLocation: string = (squareLoc.charCodeAt(0) - 96) + squareLoc.charAt(1);
    // the id of the piece that should be moved
    let idPiece: number | undefined = undefined; // from 0 to 15

    // --------------- a simple pawn move -----------------
    if (move.length === 2) {
        idPiece = parseInt(newLocation.charAt(0)) + 7;
    }
    // -- a simple piece move (except pawn)/check with pawn ---
    if (move.length === 3) {
        switch (move.charAt(0)) {
            case "K": idPiece = 4; break; // KING move
            case "Q": idPiece = 3; break; // QUEEN move
            // ROOK move
            case "R": {
                const firstOfPairLoc = pieces[playerTurn][0].location; // pair's first element location
                console.log(pieces[playerTurn][0]);
                console.log(pieces[playerTurn][7]);
                if (pieces[playerTurn][0].active && (newLocation.charAt(0) === firstOfPairLoc?.charAt(0) || newLocation.charAt(1) === firstOfPairLoc?.charAt(1))) {
                    idPiece = 0;
                } else { 
                    idPiece = 7;
                }
            } break;
            // BISHOP move
            case "B": {
                const firstOfPairLoc = pieces[playerTurn][2].location; 
                if (firstOfPairLoc && Math.abs((parseInt(firstOfPairLoc.charAt(0)) - parseInt(firstOfPairLoc.charAt(1))) % 2) === Math.abs((parseInt(newLocation.charAt(0)) - parseInt(newLocation.charAt(1))) % 2)) {
                    //console.log("equal");
                    idPiece = 2;
                } else { 
                    //console.log("NOT equal");
                    idPiece = 5;
                }
            } break;  
            // KNIGHT move
            case "N": {
                const firstOfPairLoc = pieces[playerTurn][1].location; // pair's first element location
                console.log(pieces[playerTurn][1]);

                if (pieces[playerTurn][1].active && firstOfPairLoc &&
                    Math.abs(parseInt(newLocation.charAt(0)) - parseInt(firstOfPairLoc.charAt(0))) >= 1 && 
                Math.abs(parseInt(newLocation.charAt(0)) - parseInt(firstOfPairLoc.charAt(0))) <= 2 &&
                Math.abs(parseInt(newLocation.charAt(1)) - parseInt(firstOfPairLoc.charAt(1))) >= 1 && 
                Math.abs(parseInt(newLocation.charAt(1)) - parseInt(firstOfPairLoc.charAt(1))) <= 2) {
                    idPiece = 1;
                } else { 
                    idPiece = 6;
                }
            } break;
            // CASTLE 'O-O'
            case "O": idPiece = 4; break; 
            // pawns: a, ..., h
            case "a": idPiece = 8;break; 
            case "b": idPiece = 9; break; 
            case "c": idPiece = 10; break; 
            case "d": idPiece = 11; break; 
            case "e": idPiece = 12; break; 
            case "f": idPiece = 13; break; 
            case "g": idPiece = 14; break; 
            case "h": idPiece = 15; break; 
            // Any other letter in notation means 'Error!'
            default: console.log("Erreur!");
        }
    }
    // ------ a capture / one of a pair move / a check ------
    if (move.length === 4) {
        // ------------ one of a pair move -------------
        // 'hint' will help to distinguish which piece to move
        let hint = move.charAt(1);
        // if the 2nd character is a letter (hintType = 0) else number (hintType = 1):
        let hintType = (hint.charCodeAt(0) >= 97 && hint.charCodeAt(0) <= 104) ? 0 : 1;
        // 'hintType' is defined. So we can convert 'hint' to numeric value :
        //console.log(hint.charCodeAt(0));
        hintType === 0 && (hint = String(hint.charCodeAt(0) - 96));
        //console.log(hintType === 0 ? "letter hintType" : "number hintType");
        switch (move.charAt(0)) {
            // ROOK move
            case "R": {

                const firstOfPairLoc = pieces[playerTurn][0].location; // pair's first element location
                idPiece = (firstOfPairLoc?.charAt(hintType) === hint) ? 0 : 7;
            } break;
            // KNIGHT move
            case "N": {
                const firstOfPairLoc = pieces[playerTurn][1].location; // pair's first element location
                //console.log(firstOfPairLoc);
                //console.log("hintType = "+hintType);
                //console.log(firstOfPairLoc.charAt(hintType));
                //console.log(hint);
                idPiece = (firstOfPairLoc?.charAt(hintType) === hint) ? 1 : 6;
            } break;
        }
    }
    
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