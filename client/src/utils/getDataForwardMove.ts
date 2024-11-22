import { Color } from "../configs/types";
import { store } from "../store/store";
import { chessNotationToNumeric, getPieceLastLocation, getPieceLocationByMoveNb } from "./commonFunctions";
import { checkObstruction } from "./checkObstruction";

type ReturnType = {
    idPiece: number;
    newLocation: string;
    capture: boolean;
    castlingLong: boolean;
    castlingShort: boolean;
}

export const getDataForwardMove = (
    move: string,
    playerTurn: Color,
    roundNb: number
): ReturnType => {
    //console.clear();
    const state = store.getState();
    const { pieces } = state.chessSet;

    console.log(pieces);
    console.log("move = ", move);

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
    // saved in numeric format (for ex.: '52' for 'e2')
    let newLocation = chessNotationToNumeric(squareLoc);
    // the id of the piece that should be moved
    let idPiece: number = -1; // from 0 to 15, -1 for undefined

    //console.log("move.length = ",move.length);
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
                const firstOfPairLoc = getPieceLastLocation(pieces[playerTurn][0].location); // pair's first rook location
                const secondOfPairLoc = getPieceLastLocation(pieces[playerTurn][7].location);
                console.log(newLocation.charAt(0) === firstOfPairLoc.charAt(0));
                console.log(newLocation.charAt(1) === firstOfPairLoc.charAt(1));
                console.log(newLocation.charAt(0) === secondOfPairLoc.charAt(0));
                console.log(newLocation.charAt(1) === secondOfPairLoc.charAt(1));

                if (
                    pieces[playerTurn][0].active && (newLocation.charAt(0) === firstOfPairLoc.charAt(0) || newLocation.charAt(1) === firstOfPairLoc.charAt(1)) &&
                    (newLocation.charAt(0) !== secondOfPairLoc.charAt(0) && newLocation.charAt(1) !== secondOfPairLoc.charAt(1))
                ) {
                    // the first Rook row or column corresponds to the target location, but the second one don't
                    idPiece = 0;
                } else if (
                    pieces[playerTurn][7].active && (newLocation.charAt(0) === secondOfPairLoc.charAt(0) || newLocation.charAt(1) === secondOfPairLoc.charAt(1)) &&
                    (newLocation.charAt(0) !== firstOfPairLoc.charAt(0) && newLocation.charAt(1) !== firstOfPairLoc.charAt(1))
                ) {
                    // the second Rook row or column corresponds to the target location, but the first one don't
                    idPiece = 7;
                } else if (
                    pieces[playerTurn][0].active && 
                    pieces[playerTurn][7].active && (newLocation.charAt(0) === secondOfPairLoc.charAt(0) || newLocation.charAt(1) === secondOfPairLoc.charAt(1)) &&
                    (newLocation.charAt(0) !== firstOfPairLoc.charAt(0) || newLocation.charAt(1) !== firstOfPairLoc.charAt(1))
                ) {
                    // both rooks have a row or a column that corresponds to the target location, but it's not indicated which one, because one of the pair is obstructed
                    // check if the 1st of the pair is obstructed
                    idPiece = checkObstruction(firstOfPairLoc,newLocation, capture) ? 7 : 0;
                    console.log("obstruction Check");
                    console.log(checkObstruction(firstOfPairLoc,newLocation, capture) );
                    console.log("idPiece = ",idPiece);
                } else {
                    console.log(`Rook notation error on ${playerTurn}'s move ${move}!`);
                }

            } break;
            // BISHOP move
            case "B": {
                const firstOfPairLoc = getPieceLastLocation(pieces[playerTurn][2].location); 
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
                const firstOfPairLoc = getPieceLocationByMoveNb(pieces[playerTurn][1].location, roundNb); // pair's first element location
                console.log(pieces[playerTurn][1]);

                console.log(Math.abs(parseInt(newLocation.charAt(0))));
                console.log(Math.abs(parseInt(newLocation.charAt(1))));
                console.log(parseInt(firstOfPairLoc.charAt(0)));
                console.log(parseInt(firstOfPairLoc.charAt(1)));

                console.log(pieces[playerTurn][1].active &&
                    Math.abs(parseInt(newLocation.charAt(0)) - parseInt(firstOfPairLoc.charAt(0))) >= 1 && 
                    Math.abs(parseInt(newLocation.charAt(0)) - parseInt(firstOfPairLoc.charAt(0))) <= 2 &&
                    Math.abs(parseInt(newLocation.charAt(1)) - parseInt(firstOfPairLoc.charAt(1))) >= 1 && 
                    Math.abs(parseInt(newLocation.charAt(1)) - parseInt(firstOfPairLoc.charAt(1))) <= 2);

                if (pieces[playerTurn][1].active &&
                    Math.abs(parseInt(newLocation.charAt(0)) - parseInt(firstOfPairLoc.charAt(0))) >= 1 && 
                    Math.abs(parseInt(newLocation.charAt(0)) - parseInt(firstOfPairLoc.charAt(0))) <= 2 &&
                    Math.abs(parseInt(newLocation.charAt(1)) - parseInt(firstOfPairLoc.charAt(1))) >= 1 && 
                    Math.abs(parseInt(newLocation.charAt(1)) - parseInt(firstOfPairLoc.charAt(1))) <= 2
                ) {
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
                const firstOfPairLoc = getPieceLastLocation(pieces[playerTurn][0].location); // pair's first element location
                idPiece = (firstOfPairLoc?.charAt(hintType) === hint) ? 0 : 7;
            } break;
            // KNIGHT move
            case "N": {
                const firstOfPairLoc = getPieceLastLocation(pieces[playerTurn][1].location); // pair's first element location
                //console.log(firstOfPairLoc);
                //console.log("hintType = "+hintType);
                //console.log(firstOfPairLoc.charAt(hintType));
                //console.log(hint);
                idPiece = (firstOfPairLoc?.charAt(hintType) === hint) ? 1 : 6;
            } break;
        }
    }
    // Longside castling
    if (move.length === 5) {
        idPiece = 4; 
    }
    
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