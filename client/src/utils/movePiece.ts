import { Color } from "../configs/types";
import { store } from "../store/store";

export const movePiece = (
    move: string,
    playerTurn: Color
) => {
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
    //let removeImgIfCapture = false; // remove the image of the captured piece. Pass this value to the component

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
    // the square that a piece should be moved FROM
    let oldLocation: string;
    // the array's id of the piece that should be moved
    let pieceId: number = -1;

    // --------------- a simple pawn move -----------------
    if (move.length === 2) {
        pieceId = parseInt(newLocation.charAt(0)) + 7;
    }
    // -- a simple piece move (except pawn)/check with pawn ---
    if (move.length === 3) {
        switch (move.charAt(0)) {
            case "K": pieceId = 4; break; // KING move
            case "Q": pieceId = 3; break; // QUEEN move
            // ROOK move
            case "R": {
                const firstOfPairLoc = pieces[playerTurn][0].location; // pair's first element location
                console.log(pieces[playerTurn][0]);
                console.log(pieces[playerTurn][7]);
                if (pieces[playerTurn][0].active && (newLocation.charAt(0) === firstOfPairLoc.charAt(0) || newLocation.charAt(1) === firstOfPairLoc.charAt(1))) {
                    pieceId = 0;
                } else { 
                    pieceId = 7;
                }
            } break;
            // BISHOP move
            case "B": {
                const firstOfPairLoc = pieces[playerTurn][2].location; 
                if (Math.abs((parseInt(firstOfPairLoc.charAt(0)) - parseInt(firstOfPairLoc.charAt(1))) % 2) === Math.abs((parseInt(newLocation.charAt(0)) - parseInt(newLocation.charAt(1))) % 2)) {
                    //console.log("equal");
                    pieceId = 2;
                } else { 
                    //console.log("NOT equal");
                    pieceId = 5;
                }
            } break;  
            // KNIGHT move
            case "N": {
                const firstOfPairLoc = pieces[playerTurn][1].location; // pair's first element location
                console.log(pieces[playerTurn][1]);
                /*console.log(pieces[playerTurn][1].active && 
                    Math.abs(newLocation.charAt(0) - firstOfPairLoc.charAt(0)) >= 1 && 
                Math.abs(newLocation.charAt(0) - firstOfPairLoc.charAt(0)) <= 2 &&
                Math.abs(newLocation.charAt(1) - firstOfPairLoc.charAt(1)) >= 1 && 
                Math.abs(newLocation.charAt(1) - firstOfPairLoc.charAt(1)) <= 2);*/
                if (pieces[playerTurn][1].active && 
                    Math.abs(parseInt(newLocation.charAt(0)) - parseInt(firstOfPairLoc.charAt(0))) >= 1 && 
                Math.abs(parseInt(newLocation.charAt(0)) - parseInt(firstOfPairLoc.charAt(0))) <= 2 &&
                Math.abs(parseInt(newLocation.charAt(1)) - parseInt(firstOfPairLoc.charAt(1))) >= 1 && 
                Math.abs(parseInt(newLocation.charAt(1)) - parseInt(firstOfPairLoc.charAt(1))) <= 2) {
                    pieceId = 1;
                } else { 
                    pieceId = 6;
                }
            } break;
            // CASTLE 'O-O'
            case "O": pieceId = 4; break; 
            // pawns: a, ..., h
            case "a": pieceId = 8;break; 
            case "b": pieceId = 9; break; 
            case "c": pieceId = 10; break; 
            case "d": pieceId = 11; break; 
            case "e": pieceId = 12; break; 
            case "f": pieceId = 13; break; 
            case "g": pieceId = 14; break; 
            case "h": pieceId = 15; break; 
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
                pieceId = (firstOfPairLoc.charAt(hintType) === hint) ? 0 : 7;
            } break;
            // KNIGHT move
            case "N": {
                const firstOfPairLoc = pieces[playerTurn][1].location; // pair's first element location
                //console.log(firstOfPairLoc);
                //console.log("hintType = "+hintType);
                //console.log(firstOfPairLoc.charAt(hintType));
                //console.log(hint);
                pieceId = (firstOfPairLoc.charAt(hintType) === hint) ? 1 : 6;
                //console.log(pieceId);
            } break;
        }
    }

    // get Move-From (old) and change the piece location
    oldLocation = pieces[playerTurn][pieceId].location;
    castlingShort && (
        newLocation = playerTurn === "white" ? "71" : "78" 
    );
    castlingLong && (
        newLocation = playerTurn === "white" ? "31" : "38"
    );
    pieces[playerTurn][pieceId].location = newLocation;
    
    // if CAPTURE, first remove captured piece :
    if (capture) {
        let captured: Color = playerTurn === "white" ? "black" : "white";
        // inactivate captured (removed) piece :
        for (let i = 0; i < 16; i++) {
            if (pieces[captured][i].location === newLocation) {
                pieces[captured][i].active = false; 
                break;
            } 
        }
        //capture = false;
    }

    // If castling, king's rook will be also moved :
    if (castlingShort || castlingLong) {
        if (castlingShort) {
            oldLocation = playerTurn === "white" ? "81" : "88";
            newLocation = playerTurn === "white" ? "61" : "68";
            castlingShort = false;
            pieces[playerTurn][7].location = newLocation;
        } else if (castlingLong) {
            oldLocation = playerTurn === "white" ? "11" : "18";
            newLocation = playerTurn === "white" ? "41" : "48";
            castlingLong = false;
            pieces[playerTurn][0].location = newLocation;
        }
    }

    if (playerTurn === "black") {
        pieceId += 16;
    }  
    console.log("pieceId = ",pieceId);
    console.log("newLocation = ",newLocation);
    console.log("capture = ",capture);
    return { pieceId, newLocation, capture }
}